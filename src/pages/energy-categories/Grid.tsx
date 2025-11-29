import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { Network, Zap, TrendingUp, AlertTriangle, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const capacityData = [
  { region: "Dresden", current: 92, planned: 120 },
  { region: "Leipzig", current: 88, planned: 115 },
  { region: "Chemnitz", current: 78, planned: 100 },
  { region: "Görlitz", current: 65, planned: 90 },
  { region: "Bautzen", current: 72, planned: 95 },
];

const reliabilityData = [
  { month: "Jan", availability: 99.8, incidents: 12 },
  { month: "Feb", availability: 99.7, incidents: 15 },
  { month: "Mar", availability: 99.9, incidents: 8 },
  { month: "Apr", availability: 99.8, incidents: 10 },
  { month: "May", availability: 99.6, incidents: 18 },
  { month: "Jun", availability: 99.9, incidents: 6 },
];

const Grid = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <Network className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">Energy Category</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Grid Infrastructure</h1>
          <p className="text-muted-foreground">Power grid capacity, reliability, and modernization metrics across Sachsen</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Grid Capacity" value="8,500" unit="MW" change={5.2} changeLabel="vs last year" icon={<Zap className="w-5 h-5" />} delay={100} />
          <KPICard title="Availability" value="99.7" unit="%" icon={<Activity className="w-5 h-5" />} delay={200} />
          <KPICard title="Smart Meters" value="1.2" unit="M" change={28} changeLabel="vs last year" icon={<Network className="w-5 h-5" />} delay={300} />
          <KPICard title="Investment Planned" value="€850" unit="M" icon={<TrendingUp className="w-5 h-5" />} delay={400} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Regional Grid Capacity" subtitle="Current vs planned capacity (% of peak demand)" delay={500}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={capacityData}>
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
                <LineChart data={reliabilityData}>
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
            <InsightCard type="warning" title="Capacity Constraints" description="Eastern districts operating at 85%+ capacity during peak hours. Expansion critical." delay={800} />
            <InsightCard type="suggestion" title="Investment Priority" description="€350M in grid upgrades could unlock 2,000 MW of additional renewable connections." delay={900} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Grid;
