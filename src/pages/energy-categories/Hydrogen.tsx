import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { TargetGroupSwitcher, TargetGroup } from "@/components/dashboard/TargetGroupSwitcher";
import { Atom, Zap, TrendingUp, Factory, Beaker } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

const dataByGroup: Record<TargetGroup, {
  kpis: { title: string; value: string; unit?: string; change?: number; changeLabel?: string }[];
  projectData: { sector: string; projects: number; capacity: number }[];
  pieData: { name: string; value: number; color: string }[];
  insights: { type: "success" | "warning" | "info" | "suggestion"; title: string; description: string }[];
}> = {
  individuals: {
    kpis: [
      { title: "H2 Awareness", value: "42", unit: "%", change: 15, changeLabel: "vs last year" },
      { title: "Interest Level", value: "High" },
      { title: "Pilot Programs", value: "8" },
      { title: "Early Adopters", value: "250" },
    ],
    projectData: [
      { sector: "Home Heating", projects: 3, capacity: 2 },
      { sector: "Fuel Cells", projects: 5, capacity: 3 },
    ],
    pieData: [
      { name: "Interested", value: 42, color: "hsl(var(--chart-purple))" },
      { name: "Undecided", value: 38, color: "hsl(var(--muted-foreground))" },
      { name: "Not Interested", value: 20, color: "hsl(var(--border))" },
    ],
    insights: [
      { type: "info", title: "Emerging Interest", description: "Growing awareness of hydrogen as home energy solution, though adoption remains in pilot phase." },
      { type: "suggestion", title: "Education Needed", description: "Public information campaigns could accelerate understanding of hydrogen technology benefits." },
    ],
  },
  businesses: {
    kpis: [
      { title: "Industrial Projects", value: "18", change: 85, changeLabel: "vs last year" },
      { title: "Production Capacity", value: "65", unit: "MW" },
      { title: "Investment", value: "€280", unit: "M", change: 120, changeLabel: "vs last year" },
      { title: "Jobs Created", value: "620" },
    ],
    projectData: [
      { sector: "Industry", projects: 8, capacity: 45 },
      { sector: "Transport", projects: 5, capacity: 12 },
      { sector: "Power Gen", projects: 3, capacity: 8 },
      { sector: "Research", projects: 2, capacity: 0 },
    ],
    pieData: [
      { name: "Green H2", value: 25, color: "hsl(var(--chart-green))" },
      { name: "Blue H2", value: 55, color: "hsl(var(--accent))" },
      { name: "Grey H2", value: 20, color: "hsl(var(--muted-foreground))" },
    ],
    insights: [
      { type: "success", title: "Industrial Adoption", description: "Major industrial players investing heavily in hydrogen for decarbonization of processes." },
      { type: "warning", title: "Supply Chain", description: "Green hydrogen supply currently limited, most projects using blue hydrogen as bridge solution." },
    ],
  },
  authorities: {
    kpis: [
      { title: "Public Projects", value: "10", change: 5, changeLabel: "new projects" },
      { title: "Public Investment", value: "€140", unit: "M" },
      { title: "Hydrogen Buses", value: "45", change: 25, changeLabel: "new vehicles" },
      { title: "Refueling Stations", value: "8" },
    ],
    projectData: [
      { sector: "Public Transport", projects: 4, capacity: 15 },
      { sector: "Municipal Fleet", projects: 3, capacity: 8 },
      { sector: "Infrastructure", projects: 3, capacity: 5 },
    ],
    pieData: [
      { name: "Green H2", value: 45, color: "hsl(var(--chart-green))" },
      { name: "Blue H2", value: 40, color: "hsl(var(--accent))" },
      { name: "Grey H2", value: 15, color: "hsl(var(--muted-foreground))" },
    ],
    insights: [
      { type: "info", title: "Public Transport", description: "Hydrogen buses being deployed in major cities, with 45 vehicles now in operation." },
      { type: "suggestion", title: "Hub Development", description: "Leipzig-Halle corridor identified as strategic location for regional hydrogen hub." },
    ],
  },
};

const Hydrogen = () => {
  const [targetGroup, setTargetGroup] = useState<TargetGroup>("individuals");
  const data = dataByGroup[targetGroup];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Atom className="w-5 h-5 text-chart-purple" />
              <span className="text-sm font-medium text-chart-purple">Energy Category</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Hydrogen</h1>
            <p className="text-muted-foreground">Hydrogen production, storage, and utilization projects across Sachsen</p>
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
              icon={index === 0 ? <Beaker className="w-5 h-5" /> : index === 1 ? <Zap className="w-5 h-5" /> : index === 2 ? <Factory className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
              delay={100 + index * 100}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Projects by Sector" subtitle="Number of projects and capacity (MW)" delay={500}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.projectData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="sector" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Legend />
                  <Bar dataKey="projects" name="Projects" fill="hsl(var(--chart-purple))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="capacity" name="Capacity (MW)" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Hydrogen Type Mix" subtitle="Current production by source" delay={600}>
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
          <ChartCard title="Hydrogen Hub Map" subtitle="Project locations across Sachsen" className="lg:col-span-2" delay={700}>
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

export default Hydrogen;