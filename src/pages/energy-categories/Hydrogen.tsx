import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { Atom, Zap, TrendingUp, Factory, Beaker } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

const projectData = [
  { sector: "Industry", projects: 8, capacity: 45 },
  { sector: "Transport", projects: 5, capacity: 12 },
  { sector: "Power Gen", projects: 3, capacity: 28 },
  { sector: "Research", projects: 12, capacity: 5 },
];

const pieData = [
  { name: "Green H2", value: 35, color: "hsl(var(--chart-green))" },
  { name: "Blue H2", value: 45, color: "hsl(var(--accent))" },
  { name: "Grey H2", value: 20, color: "hsl(var(--muted-foreground))" },
];

const Hydrogen = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <Atom className="w-5 h-5 text-chart-purple" />
            <span className="text-sm font-medium text-chart-purple">Energy Category</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Hydrogen</h1>
          <p className="text-muted-foreground">Hydrogen production, storage, and utilization projects across Sachsen</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Active Projects" value="28" change={75} changeLabel="vs last year" icon={<Beaker className="w-5 h-5" />} delay={100} />
          <KPICard title="Production Capacity" value="90" unit="MW" icon={<Zap className="w-5 h-5" />} delay={200} />
          <KPICard title="Investment" value="€420" unit="M" change={120} changeLabel="vs last year" icon={<Factory className="w-5 h-5" />} delay={300} />
          <KPICard title="Jobs Created" value="850" change={45} changeLabel="new positions" icon={<TrendingUp className="w-5 h-5" />} delay={400} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Projects by Sector" subtitle="Number of projects and capacity (MW)" delay={500}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectData}>
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
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                    {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
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
            <InsightCard type="info" title="Emerging Sector" description="Hydrogen economy in early stages with significant growth projected through 2030." delay={800} />
            <InsightCard type="suggestion" title="Strategic Priority" description="Leipzig-Halle corridor identified as optimal location for hydrogen hub development." delay={900} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Hydrogen;
