import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { Flame, Zap, Home, TrendingUp, Thermometer } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

const adoptionData = [
  { type: "Air-Source", count: 45000, growth: 28 },
  { type: "Ground-Source", count: 12000, growth: 15 },
  { type: "District Heat", count: 280000, growth: 5 },
  { type: "Hybrid Systems", count: 8000, growth: 42 },
];

const pieData = [
  { name: "Residential", value: 68, color: "hsl(var(--chart-amber))" },
  { name: "Commercial", value: 22, color: "hsl(var(--accent))" },
  { name: "Industrial", value: 10, color: "hsl(var(--chart-green))" },
];

const Heat = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-5 h-5 text-chart-amber" />
            <span className="text-sm font-medium text-chart-amber">Energy Category</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Heat / Wärmepumpen</h1>
          <p className="text-muted-foreground">Heat pump adoption and thermal energy metrics across Sachsen</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Heat Pumps Installed" value="65,000" change={24.5} changeLabel="vs last year" icon={<Thermometer className="w-5 h-5" />} delay={100} />
          <KPICard title="District Heating" value="280,000" unit="connections" icon={<Home className="w-5 h-5" />} delay={200} />
          <KPICard title="CO₂ Savings" value="1.2" unit="Mt/year" change={18} changeLabel="vs last year" icon={<Zap className="w-5 h-5" />} delay={300} />
          <KPICard title="Market Growth" value="+32" unit="%" icon={<TrendingUp className="w-5 h-5" />} delay={400} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Heat Pump Types" subtitle="Installation count and growth rate" delay={500}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adoptionData}>
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
          <ChartCard title="Regional Heat Map" subtitle="Heat pump density by district" className="lg:col-span-2" delay={700}>
            <RegionMap data={[]} className="py-4" />
          </ChartCard>
          <div className="space-y-4">
            <InsightCard type="success" title="Rapid Adoption" description="Heat pump installations grew 32% YoY, driven by federal subsidies and rising gas prices." delay={800} />
            <InsightCard type="suggestion" title="Focus Area" description="Pre-1990 buildings show 65% untapped potential. Targeted renovation programs recommended." delay={900} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Heat;
