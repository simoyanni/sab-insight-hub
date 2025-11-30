import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { TargetGroupSwitcher, TargetGroup } from "@/components/dashboard/TargetGroupSwitcher";
import { Network, Zap, TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const dataByGroup: Record<TargetGroup, {
  kpis: { title: string; value: string; unit?: string; change?: number; changeLabel?: string }[];
  capacityData: { region: string; current: number; planned: number }[];
  reliabilityData: { month: string; availability: number; incidents: number }[];
  insights: { type: "success" | "warning" | "info" | "suggestion"; title: string; description: string }[];
}> = {
  individuals: {
    kpis: [
      { title: "Smart Meters", value: "850,000", change: 32, changeLabel: "vs last year" },
      { title: "Grid Availability", value: "99.8", unit: "%" },
      { title: "Avg. Outage Time", value: "12", unit: "min/year" },
      { title: "Feed-in Capacity", value: "4,200", unit: "MW" },
    ],
    capacityData: [
      { region: "Dresden", current: 95, planned: 110 },
      { region: "Leipzig", current: 92, planned: 108 },
      { region: "Chemnitz", current: 88, planned: 102 },
      { region: "Görlitz", current: 78, planned: 95 },
      { region: "Bautzen", current: 82, planned: 98 },
    ],
    reliabilityData: [
      { month: "Jan", availability: 99.9, incidents: 8 },
      { month: "Feb", availability: 99.8, incidents: 12 },
      { month: "Mar", availability: 99.9, incidents: 6 },
      { month: "Apr", availability: 99.8, incidents: 10 },
      { month: "May", availability: 99.7, incidents: 15 },
      { month: "Jun", availability: 99.9, incidents: 5 },
    ],
    insights: [
      { type: "success", title: "High Reliability", description: "Residential grid reliability at 99.8%, exceeding national average by 0.2 percentage points." },
      { type: "info", title: "Smart Rollout", description: "Smart meter deployment accelerating, enabling better demand management and solar integration." },
    ],
  },
  businesses: {
    kpis: [
      { title: "Industrial Capacity", value: "3,800", unit: "MW" },
      { title: "Availability", value: "99.6", unit: "%" },
      { title: "Connection Queue", value: "280", unit: "projects" },
      { title: "Avg. Wait Time", value: "8.5", unit: "months" },
    ],
    capacityData: [
      { region: "Dresden", current: 92, planned: 120 },
      { region: "Leipzig", current: 88, planned: 115 },
      { region: "Chemnitz", current: 82, planned: 105 },
      { region: "Görlitz", current: 68, planned: 90 },
      { region: "Bautzen", current: 72, planned: 92 },
    ],
    reliabilityData: [
      { month: "Jan", availability: 99.7, incidents: 15 },
      { month: "Feb", availability: 99.6, incidents: 18 },
      { month: "Mar", availability: 99.8, incidents: 10 },
      { month: "Apr", availability: 99.7, incidents: 14 },
      { month: "May", availability: 99.5, incidents: 22 },
      { month: "Jun", availability: 99.8, incidents: 8 },
    ],
    insights: [
      { type: "warning", title: "Connection Delays", description: "Industrial solar and wind projects facing 8.5 month average grid connection delays." },
      { type: "suggestion", title: "Capacity Upgrade", description: "€280M grid investment could reduce commercial connection times by 60%." },
    ],
  },
  authorities: {
    kpis: [
      { title: "Grid Capacity", value: "8,500", unit: "MW", change: 5.2, changeLabel: "vs last year" },
      { title: "Availability", value: "99.7", unit: "%" },
      { title: "Investment Planned", value: "€850", unit: "M" },
      { title: "Modernization", value: "45", unit: "%" },
    ],
    capacityData: [
      { region: "Dresden", current: 92, planned: 120 },
      { region: "Leipzig", current: 88, planned: 115 },
      { region: "Chemnitz", current: 78, planned: 100 },
      { region: "Görlitz", current: 65, planned: 90 },
      { region: "Bautzen", current: 72, planned: 95 },
    ],
    reliabilityData: [
      { month: "Jan", availability: 99.8, incidents: 12 },
      { month: "Feb", availability: 99.7, incidents: 15 },
      { month: "Mar", availability: 99.9, incidents: 8 },
      { month: "Apr", availability: 99.8, incidents: 10 },
      { month: "May", availability: 99.6, incidents: 18 },
      { month: "Jun", availability: 99.9, incidents: 6 },
    ],
    insights: [
      { type: "warning", title: "Capacity Constraints", description: "Eastern districts operating at 85%+ capacity during peak hours. Expansion critical." },
      { type: "suggestion", title: "Investment Priority", description: "€350M in grid upgrades could unlock 2,000 MW of additional renewable connections." },
    ],
  },
};

const Grid = () => {
  const [targetGroup, setTargetGroup] = useState<TargetGroup>("individuals");
  const data = dataByGroup[targetGroup];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Network className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">Energy Category</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Grid Infrastructure</h1>
            <p className="text-muted-foreground">Power grid capacity, reliability, and modernization metrics across Sachsen</p>
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
              icon={index === 0 ? <Zap className="w-5 h-5" /> : index === 1 ? <Activity className="w-5 h-5" /> : index === 2 ? <Network className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
              delay={100 + index * 100}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Regional Grid Capacity" subtitle="Current vs planned capacity (% of peak demand)" delay={500}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.capacityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="region" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" domain={[0, 140]} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Legend />
                  <Bar dataKey="current" name="Current %" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="planned" name="Planned %" fill="hsl(var(--chart-green))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Grid Reliability" subtitle="Monthly availability and incident count" delay={600}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.reliabilityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="left" domain={[99.5, 100]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="availability" name="Availability %" stroke="hsl(var(--chart-green))" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="incidents" name="Incidents" stroke="hsl(var(--chart-red))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard title="Grid Stress Map" subtitle="Capacity utilization by district" className="lg:col-span-2" delay={700}>
            <RegionMap data={[]} className="py-4" />
          </ChartCard>
          <div className="space-y-4">
            {data.insights.map((insight, index) => (
              <InsightCard key={index} type={insight.type} title={insight.title} description={insight.description} delay={800 + index * 100} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Grid;