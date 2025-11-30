import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { TargetGroupSwitcher, TargetGroup } from "@/components/dashboard/TargetGroupSwitcher";
import { Battery, Zap, TrendingUp, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const dataByGroup: Record<TargetGroup, {
  kpis: { title: string; value: string; unit?: string; change?: number; changeLabel?: string }[];
  capacityData: { year: string; residential: number; commercial: number; utility: number }[];
  insights: { type: "success" | "warning" | "info" | "suggestion"; title: string; description: string }[];
}> = {
  individuals: {
    kpis: [
      { title: "Home Batteries", value: "24,500", change: 45, changeLabel: "vs last year" },
      { title: "Total Capacity", value: "280", unit: "MWh", change: 48, changeLabel: "vs last year" },
      { title: "Avg. System Size", value: "11.5", unit: "kWh" },
      { title: "Self-Sufficiency", value: "72", unit: "%", change: 8, changeLabel: "vs last year" },
    ],
    capacityData: [
      { year: "2020", residential: 80, commercial: 0, utility: 0 },
      { year: "2021", residential: 120, commercial: 0, utility: 0 },
      { year: "2022", residential: 180, commercial: 0, utility: 0 },
      { year: "2023", residential: 230, commercial: 0, utility: 0 },
      { year: "2024", residential: 280, commercial: 0, utility: 0 },
    ],
    insights: [
      { type: "success", title: "High Adoption", description: "85% of new residential solar installations now include battery storage systems." },
      { type: "info", title: "Grid Independence", description: "Home batteries enabling 72% self-sufficiency rates for households with solar." },
    ],
  },
  businesses: {
    kpis: [
      { title: "Commercial Storage", value: "3,200", change: 38, changeLabel: "vs last year" },
      { title: "Total Capacity", value: "520", unit: "MWh", change: 42, changeLabel: "vs last year" },
      { title: "Peak Shaving", value: "180", unit: "MW" },
      { title: "ROI Period", value: "5.2", unit: "years" },
    ],
    capacityData: [
      { year: "2020", residential: 0, commercial: 80, utility: 0 },
      { year: "2021", residential: 0, commercial: 140, utility: 0 },
      { year: "2022", residential: 0, commercial: 240, utility: 0 },
      { year: "2023", residential: 0, commercial: 380, utility: 0 },
      { year: "2024", residential: 0, commercial: 520, utility: 0 },
    ],
    insights: [
      { type: "success", title: "Peak Shaving", description: "Commercial batteries reducing demand charges by up to 35% for large energy users." },
      { type: "suggestion", title: "Grid Services", description: "Aggregated commercial storage could provide 180 MW of grid balancing services." },
    ],
  },
  authorities: {
    kpis: [
      { title: "Utility Storage", value: "12", change: 4, changeLabel: "new projects" },
      { title: "Grid Capacity", value: "460", unit: "MWh" },
      { title: "Grid Services", value: "180", unit: "MW" },
      { title: "Investment", value: "€185", unit: "M" },
    ],
    capacityData: [
      { year: "2020", residential: 0, commercial: 0, utility: 50 },
      { year: "2021", residential: 0, commercial: 0, utility: 120 },
      { year: "2022", residential: 0, commercial: 0, utility: 220 },
      { year: "2023", residential: 0, commercial: 0, utility: 340 },
      { year: "2024", residential: 0, commercial: 0, utility: 460 },
    ],
    insights: [
      { type: "info", title: "Grid Stability", description: "Utility-scale storage providing critical grid balancing and frequency regulation services." },
      { type: "suggestion", title: "Expansion Needed", description: "Additional 500 MW of storage could unlock curtailed renewable capacity in eastern districts." },
    ],
  },
};

const Storage = () => {
  const [targetGroup, setTargetGroup] = useState<TargetGroup>("individuals");
  const data = dataByGroup[targetGroup];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Battery className="w-5 h-5 text-chart-green" />
              <span className="text-sm font-medium text-chart-green">Energy Category</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Energy Storage</h1>
            <p className="text-muted-foreground">Battery storage and grid stabilization metrics across Sachsen</p>
          </div>
          <TargetGroupSwitcher value={targetGroup} onChange={setTargetGroup} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.kpis.map((kpi, index) => (
            <KPICard
              key={kpi.title}
              title={kpi.title}
              value={kpi.value}
              unit={kpi.unit}
              change={kpi.change}
              changeLabel={kpi.changeLabel}
              icon={index === 0 ? <Battery className="w-5 h-5" /> : index === 1 ? <Zap className="w-5 h-5" /> : index === 2 ? <Activity className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
              delay={100 + index * 100}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Storage Capacity Growth" subtitle="MWh by segment" delay={500}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.capacityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Legend />
                  <Area type="monotone" dataKey="residential" name="Residential" stackId="1" stroke="hsl(var(--chart-green))" fill="hsl(var(--chart-green))" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="commercial" name="Commercial" stackId="1" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="utility" name="Utility-Scale" stackId="1" stroke="hsl(var(--chart-purple))" fill="hsl(var(--chart-purple))" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Regional Distribution" subtitle="Storage capacity by district" delay={600}>
            <RegionMap data={[]} className="py-4" />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.insights.map((insight, index) => (
            <InsightCard key={index} type={insight.type} title={insight.title} description={insight.description} delay={700 + index * 100} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Storage;