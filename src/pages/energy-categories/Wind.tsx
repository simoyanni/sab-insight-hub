import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { TargetGroupSwitcher, TargetGroup } from "@/components/dashboard/TargetGroupSwitcher";
import { Wind, Zap, TrendingUp, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const dataByGroup: Record<TargetGroup, {
  kpis: { title: string; value: string; unit?: string; change?: number; changeLabel?: string }[];
  generationData: { month: string; generation: number; capacity: number }[];
  regionData: { region: string; turbines: number; capacity: number }[];
  insights: { type: "success" | "warning" | "info" | "suggestion"; title: string; description: string }[];
}> = {
  individuals: {
    kpis: [
      { title: "Small Wind Turbines", value: "320", change: 15, changeLabel: "vs last year" },
      { title: "Household Capacity", value: "12", unit: "MW" },
      { title: "Avg. System Size", value: "8", unit: "kW" },
      { title: "Investment Interest", value: "High" },
    ],
    generationData: [
      { month: "Jan", generation: 8, capacity: 10 },
      { month: "Feb", generation: 7, capacity: 10 },
      { month: "Mar", generation: 9, capacity: 11 },
      { month: "Apr", generation: 6, capacity: 11 },
      { month: "May", generation: 5, capacity: 11 },
      { month: "Jun", generation: 4, capacity: 12 },
    ],
    regionData: [
      { region: "Erzgebirge", turbines: 85, capacity: 2 },
      { region: "Vogtland", turbines: 62, capacity: 2 },
      { region: "Mittelsachsen", turbines: 48, capacity: 2 },
      { region: "Nordsachsen", turbines: 55, capacity: 3 },
      { region: "Leipzig Land", turbines: 40, capacity: 2 },
    ],
    insights: [
      { type: "info", title: "Rural Focus", description: "Small wind turbines primarily installed in rural properties with sufficient land area." },
      { type: "suggestion", title: "Hybrid Systems", description: "Combined solar-wind systems could provide more consistent energy generation for households." },
    ],
  },
  businesses: {
    kpis: [
      { title: "Commercial Wind", value: "850", unit: "MW", change: 12, changeLabel: "vs last year" },
      { title: "Business Turbines", value: "180", change: 8, changeLabel: "new this year" },
      { title: "Avg. Capacity Factor", value: "32", unit: "%" },
      { title: "PPA Contracts", value: "45", change: 28, changeLabel: "vs last year" },
    ],
    generationData: [
      { month: "Jan", generation: 180, capacity: 150 },
      { month: "Feb", generation: 160, capacity: 150 },
      { month: "Mar", generation: 190, capacity: 155 },
      { month: "Apr", generation: 140, capacity: 155 },
      { month: "May", generation: 120, capacity: 160 },
      { month: "Jun", generation: 100, capacity: 160 },
    ],
    regionData: [
      { region: "Erzgebirge", turbines: 55, capacity: 220 },
      { region: "Vogtland", turbines: 42, capacity: 168 },
      { region: "Mittelsachsen", turbines: 35, capacity: 140 },
      { region: "Nordsachsen", turbines: 28, capacity: 112 },
      { region: "Leipzig Land", turbines: 20, capacity: 80 },
    ],
    insights: [
      { type: "success", title: "Corporate PPAs", description: "Power purchase agreements driving commercial wind investment with guaranteed returns." },
      { type: "warning", title: "Land Acquisition", description: "Competition for suitable sites increasing development costs in prime locations." },
    ],
  },
  authorities: {
    kpis: [
      { title: "Municipal Wind", value: "1,250", unit: "MW", change: 6.5, changeLabel: "vs last year" },
      { title: "Community Projects", value: "28", change: 5, changeLabel: "new projects" },
      { title: "Public Revenue", value: "€42", unit: "M/year" },
      { title: "Community Ownership", value: "35", unit: "%" },
    ],
    generationData: [
      { month: "Jan", generation: 280, capacity: 240 },
      { month: "Feb", generation: 250, capacity: 240 },
      { month: "Mar", generation: 300, capacity: 250 },
      { month: "Apr", generation: 220, capacity: 250 },
      { month: "May", generation: 180, capacity: 260 },
      { month: "Jun", generation: 160, capacity: 260 },
    ],
    regionData: [
      { region: "Erzgebirge", turbines: 120, capacity: 480 },
      { region: "Vogtland", turbines: 95, capacity: 380 },
      { region: "Mittelsachsen", turbines: 78, capacity: 312 },
      { region: "Nordsachsen", turbines: 65, capacity: 260 },
      { region: "Leipzig Land", turbines: 52, capacity: 208 },
    ],
    insights: [
      { type: "info", title: "Community Models", description: "Citizen wind parks gaining popularity, with 35% of new projects having community ownership." },
      { type: "warning", title: "Permitting Delays", description: "Average permitting time of 4.2 years remains a significant barrier to municipal projects." },
    ],
  },
};

const Wind_ = () => {
  const [targetGroup, setTargetGroup] = useState<TargetGroup>("individuals");
  const data = dataByGroup[targetGroup];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Wind className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">Energy Category</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Wind Energy</h1>
            <p className="text-muted-foreground">Wind turbine installations and generation across Sachsen</p>
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
              icon={index === 0 ? <Zap className="w-5 h-5" /> : index === 1 ? <Wind className="w-5 h-5" /> : index === 2 ? <Target className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
              delay={100 + index * 100}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Monthly Generation" subtitle="GWh generated vs installed capacity trend" delay={500}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.generationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Legend />
                  <Line type="monotone" dataKey="generation" name="Generation (GWh)" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="capacity" name="Capacity (MW)" stroke="hsl(var(--chart-green))" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Regional Distribution" subtitle="Turbines and capacity by region" delay={600}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.regionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="region" type="category" width={90} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Legend />
                  <Bar dataKey="turbines" name="Turbines" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="capacity" name="Capacity (MW)" fill="hsl(var(--chart-teal))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard title="Wind Resource Map" subtitle="Wind potential by district" className="lg:col-span-2" delay={700}>
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

export default Wind_;