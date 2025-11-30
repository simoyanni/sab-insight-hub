import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { TargetGroupSwitcher, TargetGroup } from "@/components/dashboard/TargetGroupSwitcher";
import { Sun, Zap, TrendingUp, Target } from "lucide-react";
import {
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const dataByGroup: Record<TargetGroup, {
  kpis: { title: string; value: string; unit?: string; change?: number; changeLabel?: string }[];
  growthData: { year: string; capacity: number; installations: number }[];
  potentialData: { region: string; actual: number; potential: number }[];
  tableData: { region: string; capacity: string; installations: string; potential: string; gap: string; utilization: string }[];
  insights: { type: "success" | "warning" | "info" | "suggestion"; title: string; description: string }[];
}> = {
  individuals: {
    kpis: [
      { title: "Rooftop Capacity", value: "2,800", unit: "MW", change: 28.5, changeLabel: "vs last year" },
      { title: "Household Installations", value: "38,000", change: 12.5, changeLabel: "vs last year" },
      { title: "Avg. System Size", value: "8.5", unit: "kWp" },
      { title: "Self-Consumption", value: "68", unit: "%", change: 5.2, changeLabel: "vs last year" },
    ],
    growthData: [
      { year: "2019", capacity: 900, installations: 22000 },
      { year: "2020", capacity: 1100, installations: 26000 },
      { year: "2021", capacity: 1400, installations: 29000 },
      { year: "2022", capacity: 1900, installations: 32000 },
      { year: "2023", capacity: 2300, installations: 35000 },
      { year: "2024", capacity: 2800, installations: 38000 },
    ],
    potentialData: [
      { region: "Dresden", actual: 82, potential: 100 },
      { region: "Leipzig", actual: 75, potential: 100 },
      { region: "Chemnitz", actual: 68, potential: 100 },
      { region: "Görlitz", actual: 78, potential: 100 },
      { region: "Bautzen", actual: 72, potential: 100 },
      { region: "Meißen", actual: 80, potential: 100 },
    ],
    tableData: [
      { region: "Dresden", capacity: "520 MW", installations: "9,800", potential: "850 MW", gap: "330 MW", utilization: "61%" },
      { region: "Leipzig", capacity: "480 MW", installations: "8,500", potential: "780 MW", gap: "300 MW", utilization: "62%" },
      { region: "Chemnitz", capacity: "320 MW", installations: "5,800", potential: "620 MW", gap: "300 MW", utilization: "52%" },
      { region: "Görlitz", capacity: "280 MW", installations: "4,200", potential: "480 MW", gap: "200 MW", utilization: "58%" },
      { region: "Bautzen", capacity: "240 MW", installations: "3,800", potential: "440 MW", gap: "200 MW", utilization: "55%" },
    ],
    insights: [
      { type: "success", title: "Strong Adoption", description: "Household solar adoption grew 28% YoY, driven by rising electricity costs and federal incentives." },
      { type: "suggestion", title: "Battery Integration", description: "Only 35% of residential systems include storage. Targeted incentives could increase self-consumption significantly." },
    ],
  },
  businesses: {
    kpis: [
      { title: "Commercial Capacity", value: "1,800", unit: "MW", change: 18.2, changeLabel: "vs last year" },
      { title: "Business Installations", value: "6,500", change: 8.5, changeLabel: "vs last year" },
      { title: "Avg. System Size", value: "85", unit: "kWp" },
      { title: "Grid Feed-In", value: "42", unit: "%", change: -3.2, changeLabel: "vs last year" },
    ],
    growthData: [
      { year: "2019", capacity: 700, installations: 4500 },
      { year: "2020", capacity: 850, installations: 4800 },
      { year: "2021", capacity: 1050, installations: 5200 },
      { year: "2022", capacity: 1300, installations: 5600 },
      { year: "2023", capacity: 1550, installations: 6000 },
      { year: "2024", capacity: 1800, installations: 6500 },
    ],
    potentialData: [
      { region: "Dresden", actual: 88, potential: 100 },
      { region: "Leipzig", actual: 82, potential: 100 },
      { region: "Chemnitz", actual: 62, potential: 100 },
      { region: "Görlitz", actual: 58, potential: 100 },
      { region: "Bautzen", actual: 55, potential: 100 },
      { region: "Meißen", actual: 65, potential: 100 },
    ],
    tableData: [
      { region: "Dresden", capacity: "320 MW", installations: "2,200", potential: "520 MW", gap: "200 MW", utilization: "62%" },
      { region: "Leipzig", capacity: "280 MW", installations: "1,800", potential: "480 MW", gap: "200 MW", utilization: "58%" },
      { region: "Chemnitz", capacity: "180 MW", installations: "1,100", potential: "380 MW", gap: "200 MW", utilization: "47%" },
      { region: "Görlitz", capacity: "120 MW", installations: "680", potential: "280 MW", gap: "160 MW", utilization: "43%" },
      { region: "Bautzen", capacity: "100 MW", installations: "520", potential: "260 MW", gap: "160 MW", utilization: "38%" },
    ],
    insights: [
      { type: "info", title: "Commercial Growth", description: "Large rooftop installations on warehouses and factories driving commercial solar growth in urban areas." },
      { type: "warning", title: "Grid Constraints", description: "Some industrial zones face grid connection delays of 6-12 months due to capacity limitations." },
    ],
  },
  authorities: {
    kpis: [
      { title: "Public Building Capacity", value: "500", unit: "MW", change: 15.5, changeLabel: "vs last year" },
      { title: "Municipal Installations", value: "1,500", change: 22, changeLabel: "vs last year" },
      { title: "Avg. System Size", value: "120", unit: "kWp" },
      { title: "Energy Cost Savings", value: "€18", unit: "M/year", change: 12, changeLabel: "vs last year" },
    ],
    growthData: [
      { year: "2019", capacity: 200, installations: 800 },
      { year: "2020", capacity: 250, installations: 950 },
      { year: "2021", capacity: 320, installations: 1100 },
      { year: "2022", capacity: 380, installations: 1250 },
      { year: "2023", capacity: 440, installations: 1380 },
      { year: "2024", capacity: 500, installations: 1500 },
    ],
    potentialData: [
      { region: "Dresden", actual: 75, potential: 100 },
      { region: "Leipzig", actual: 72, potential: 100 },
      { region: "Chemnitz", actual: 58, potential: 100 },
      { region: "Görlitz", actual: 52, potential: 100 },
      { region: "Bautzen", actual: 48, potential: 100 },
      { region: "Meißen", actual: 62, potential: 100 },
    ],
    tableData: [
      { region: "Dresden", capacity: "150 MW", installations: "450", potential: "280 MW", gap: "130 MW", utilization: "54%" },
      { region: "Leipzig", capacity: "130 MW", installations: "380", potential: "260 MW", gap: "130 MW", utilization: "50%" },
      { region: "Chemnitz", capacity: "80 MW", installations: "280", potential: "180 MW", gap: "100 MW", utilization: "44%" },
      { region: "Görlitz", capacity: "50 MW", installations: "180", potential: "140 MW", gap: "90 MW", utilization: "36%" },
      { region: "Bautzen", capacity: "45 MW", installations: "150", potential: "130 MW", gap: "85 MW", utilization: "35%" },
    ],
    insights: [
      { type: "suggestion", title: "Public Buildings", description: "Schools and administrative buildings show 65% untapped solar potential. Accelerated procurement could close the gap." },
      { type: "info", title: "Municipal Leadership", description: "Dresden and Leipzig leading with comprehensive solar programs on public infrastructure." },
    ],
  },
};

const Solar = () => {
  const [targetGroup, setTargetGroup] = useState<TargetGroup>("individuals");
  const data = dataByGroup[targetGroup];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Target Group Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sun className="w-5 h-5 text-chart-amber" />
              <span className="text-sm font-medium text-chart-amber">Energy Category</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Solar Energy</h1>
            <p className="text-muted-foreground">
              Photovoltaic installations and solar energy metrics across Sachsen
            </p>
          </div>
          <TargetGroupSwitcher value={targetGroup} onChange={setTargetGroup} />
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.kpis.map((kpi, index) => (
            <KPICard
              key={kpi.title}
              title={kpi.title}
              value={kpi.value}
              unit={kpi.unit}
              change={kpi.change}
              changeLabel={kpi.changeLabel}
              icon={index === 0 ? <Zap className="w-5 h-5" /> : index === 1 ? <Sun className="w-5 h-5" /> : index === 2 ? <Target className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
              delay={100 + index * 100}
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Solar Growth Trajectory" subtitle="Capacity (MW) and installations over time" delay={500}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="capacity" name="Capacity (MW)" stroke="hsl(var(--chart-amber))" fill="hsl(var(--chart-amber))" fillOpacity={0.3} />
                  <Area yAxisId="right" type="monotone" dataKey="installations" name="Installations" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Potential vs Actual" subtitle="Regional utilization of solar potential" delay={600}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.potentialData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="region" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <PolarRadiusAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Legend />
                  <Radar name="Actual %" dataKey="actual" stroke="hsl(var(--chart-amber))" fill="hsl(var(--chart-amber))" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Map and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard title="Solar Installation Density" subtitle="Installations per km² by district" className="lg:col-span-2" delay={700}>
            <RegionMap data={[]} className="py-4" />
          </ChartCard>

          <div className="space-y-4">
            {data.insights.map((insight, index) => (
              <InsightCard key={index} type={insight.type} title={insight.title} description={insight.description} delay={800 + index * 100} />
            ))}
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          title="Regional Solar Metrics"
          subtitle="Detailed capacity and potential by district"
          columns={[
            { key: "region", header: "Region" },
            { key: "capacity", header: "Installed" },
            { key: "installations", header: "Units" },
            { key: "potential", header: "Potential" },
            { key: "gap", header: "Gap" },
            {
              key: "utilization",
              header: "Utilization",
              render: (value) => {
                const num = parseInt(value as string);
                return (
                  <span className={num >= 60 ? "text-chart-green font-medium" : num >= 50 ? "text-chart-amber font-medium" : "text-muted-foreground"}>
                    {value as string}
                  </span>
                );
              },
            },
          ]}
          data={data.tableData}
          delay={1100}
        />
      </div>
    </DashboardLayout>
  );
};

export default Solar;