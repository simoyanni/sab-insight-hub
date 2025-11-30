import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { TargetGroupSwitcher, TargetGroup } from "@/components/dashboard/TargetGroupSwitcher";
import { Flame, Zap, Home, TrendingUp, Thermometer } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

const dataByGroup: Record<TargetGroup, {
  kpis: { title: string; value: string; unit?: string; change?: number; changeLabel?: string }[];
  adoptionData: { type: string; count: number; growth: number }[];
  pieData: { name: string; value: number; color: string }[];
  insights: { type: "success" | "warning" | "info" | "suggestion"; title: string; description: string }[];
}> = {
  individuals: {
    kpis: [
      { title: "Heat Pumps Installed", value: "52,000", change: 28, changeLabel: "vs last year" },
      { title: "Households Covered", value: "48,000", change: 25, changeLabel: "vs last year" },
      { title: "CO₂ Savings", value: "850", unit: "kt/year" },
      { title: "Avg. Savings", value: "€1,200", unit: "/year", change: 15, changeLabel: "vs last year" },
    ],
    adoptionData: [
      { type: "Air-Source", count: 38000, growth: 32 },
      { type: "Ground-Source", count: 9000, growth: 18 },
      { type: "Hybrid Systems", count: 5000, growth: 45 },
    ],
    pieData: [
      { name: "New Build", value: 45, color: "hsl(var(--chart-amber))" },
      { name: "Retrofit", value: 40, color: "hsl(var(--accent))" },
      { name: "Replacement", value: 15, color: "hsl(var(--chart-green))" },
    ],
    insights: [
      { type: "success", title: "Strong Uptake", description: "Residential heat pump installations grew 28% YoY, driven by federal subsidies and gas price volatility." },
      { type: "suggestion", title: "Retrofit Potential", description: "Pre-1990 housing stock shows 65% untapped potential. Targeted renovation programs recommended." },
    ],
  },
  businesses: {
    kpis: [
      { title: "Commercial Heat Pumps", value: "8,500", change: 22, changeLabel: "vs last year" },
      { title: "Industrial Connections", value: "1,200", change: 12, changeLabel: "vs last year" },
      { title: "Energy Savings", value: "380", unit: "GWh/year" },
      { title: "ROI Period", value: "4.5", unit: "years" },
    ],
    adoptionData: [
      { type: "Air-Source", count: 5500, growth: 25 },
      { type: "Ground-Source", count: 2200, growth: 15 },
      { type: "District Heat", count: 800, growth: 8 },
    ],
    pieData: [
      { name: "Office", value: 35, color: "hsl(var(--accent))" },
      { name: "Retail", value: 28, color: "hsl(var(--chart-amber))" },
      { name: "Industrial", value: 37, color: "hsl(var(--chart-green))" },
    ],
    insights: [
      { type: "info", title: "Commercial Growth", description: "Large commercial buildings increasingly adopting heat pumps for cooling and heating efficiency." },
      { type: "warning", title: "Grid Capacity", description: "Some commercial zones face electrical capacity constraints for large heat pump installations." },
    ],
  },
  authorities: {
    kpis: [
      { title: "Public Buildings", value: "4,500", change: 18, changeLabel: "vs last year" },
      { title: "District Heating", value: "280,000", unit: "connections" },
      { title: "Municipal Savings", value: "€28", unit: "M/year" },
      { title: "Carbon Reduction", value: "320", unit: "kt/year" },
    ],
    adoptionData: [
      { type: "District Heat", count: 280000, growth: 5 },
      { type: "Heat Pumps", count: 4500, growth: 18 },
      { type: "Biomass", count: 850, growth: 8 },
    ],
    pieData: [
      { name: "Schools", value: 32, color: "hsl(var(--accent))" },
      { name: "Admin Buildings", value: 28, color: "hsl(var(--chart-amber))" },
      { name: "Sports Facilities", value: 22, color: "hsl(var(--chart-green))" },
      { name: "Other", value: 18, color: "hsl(var(--muted-foreground))" },
    ],
    insights: [
      { type: "success", title: "District Heating", description: "Extensive district heating networks serve 280,000 connections, reducing individual heating costs." },
      { type: "suggestion", title: "Public Buildings", description: "Municipal buildings renovation program could reduce heating costs by 40% across public infrastructure." },
    ],
  },
};

const Heat = () => {
  const [targetGroup, setTargetGroup] = useState<TargetGroup>("individuals");
  const data = dataByGroup[targetGroup];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5 text-chart-amber" />
              <span className="text-sm font-medium text-chart-amber">Energy Category</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Heat / Wärmepumpen</h1>
            <p className="text-muted-foreground">Heat pump adoption and thermal energy metrics across Sachsen</p>
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
              icon={index === 0 ? <Thermometer className="w-5 h-5" /> : index === 1 ? <Home className="w-5 h-5" /> : index === 2 ? <Zap className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
              delay={100 + index * 100}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Heat System Types" subtitle="Installation count by type" delay={500}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.adoptionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="type" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Legend />
                  <Bar dataKey="count" name="Installations" fill="hsl(var(--chart-amber))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Sector Distribution" subtitle="Heat pump adoption by sector" delay={600}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                    {data.pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(value: number) => [`${value}%`, ""]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard title="Regional Heat Map" subtitle="Heat pump density by district" className="lg:col-span-2" delay={700}>
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

export default Heat;