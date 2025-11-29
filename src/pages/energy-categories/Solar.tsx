import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { Sun, Zap, TrendingUp, Target, Battery } from "lucide-react";
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

const growthData = [
  { year: "2019", capacity: 1800, installations: 28000 },
  { year: "2020", capacity: 2200, installations: 32000 },
  { year: "2021", capacity: 2800, installations: 36000 },
  { year: "2022", capacity: 3500, installations: 39000 },
  { year: "2023", capacity: 4200, installations: 42000 },
  { year: "2024", capacity: 5100, installations: 46000 },
];

const potentialData = [
  { region: "Dresden", actual: 85, potential: 100 },
  { region: "Leipzig", actual: 78, potential: 100 },
  { region: "Chemnitz", actual: 65, potential: 100 },
  { region: "Görlitz", actual: 72, potential: 100 },
  { region: "Bautzen", actual: 68, potential: 100 },
  { region: "Meißen", actual: 75, potential: 100 },
];

const tableData = [
  { region: "Dresden", capacity: "890 MW", installations: "12,500", potential: "1,450 MW", gap: "560 MW", utilization: "61%" },
  { region: "Leipzig", capacity: "720 MW", installations: "10,800", potential: "1,200 MW", gap: "480 MW", utilization: "60%" },
  { region: "Chemnitz", capacity: "480 MW", installations: "7,200", potential: "920 MW", gap: "440 MW", utilization: "52%" },
  { region: "Görlitz", capacity: "320 MW", installations: "5,100", potential: "680 MW", gap: "360 MW", utilization: "47%" },
  { region: "Bautzen", capacity: "280 MW", installations: "4,500", potential: "620 MW", gap: "340 MW", utilization: "45%" },
];

const Solar = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <Sun className="w-5 h-5 text-chart-amber" />
            <span className="text-sm font-medium text-chart-amber">Energy Category</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Solar Energy</h1>
          <p className="text-muted-foreground">
            Photovoltaic installations and solar energy metrics across Sachsen
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Installed Capacity"
            value="5,100"
            unit="MW"
            change={21.4}
            changeLabel="vs last year"
            icon={<Zap className="w-5 h-5" />}
            delay={100}
          />
          <KPICard
            title="Total Installations"
            value="46,000"
            change={9.5}
            changeLabel="vs last year"
            icon={<Sun className="w-5 h-5" />}
            delay={200}
          />
          <KPICard
            title="Remaining Potential"
            value="4,200"
            unit="MW"
            icon={<Target className="w-5 h-5" />}
            delay={300}
          />
          <KPICard
            title="Utilization Rate"
            value="55"
            unit="%"
            change={8.2}
            changeLabel="vs last year"
            icon={<TrendingUp className="w-5 h-5" />}
            delay={400}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Solar Growth Trajectory"
            subtitle="Capacity (MW) and installations over time"
            delay={500}
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="capacity"
                    name="Capacity (MW)"
                    stroke="hsl(var(--chart-amber))"
                    fill="hsl(var(--chart-amber))"
                    fillOpacity={0.3}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="installations"
                    name="Installations"
                    stroke="hsl(var(--accent))"
                    fill="hsl(var(--accent))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Potential vs Actual"
            subtitle="Regional utilization of solar potential"
            delay={600}
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={potentialData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="region" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <PolarRadiusAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Radar name="Actual %" dataKey="actual" stroke="hsl(var(--chart-amber))" fill="hsl(var(--chart-amber))" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Map and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard
            title="Solar Installation Density"
            subtitle="Installations per km² by district"
            className="lg:col-span-2"
            delay={700}
          >
            <RegionMap data={[]} className="py-4" />
          </ChartCard>

          <div className="space-y-4">
            <InsightCard
              type="success"
              title="Strong Performance"
              description="Dresden and Leipzig regions exceeded 2024 targets by 15%, driven by commercial rooftop installations."
              delay={800}
            />
            <InsightCard
              type="warning"
              title="Grid Bottleneck"
              description="Eastern districts face grid connection delays averaging 8 months. Infrastructure investment needed."
              delay={900}
            />
            <InsightCard
              type="suggestion"
              title="Funding Focus"
              description="Battery storage incentives could unlock additional 800 MW of solar capacity in grid-constrained areas."
              delay={1000}
            />
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
          data={tableData}
          delay={1100}
        />
      </div>
    </DashboardLayout>
  );
};

export default Solar;
