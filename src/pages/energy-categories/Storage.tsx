import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { Battery, Zap, TrendingUp, Target, Activity } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const capacityData = [
  { year: "2020", residential: 120, commercial: 80, utility: 50 },
  { year: "2021", residential: 180, commercial: 120, utility: 80 },
  { year: "2022", residential: 280, commercial: 180, utility: 120 },
  { year: "2023", residential: 420, commercial: 260, utility: 180 },
  { year: "2024", residential: 600, commercial: 380, utility: 280 },
];

const Storage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <Battery className="w-5 h-5 text-chart-green" />
            <span className="text-sm font-medium text-chart-green">Energy Category</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Energy Storage</h1>
          <p className="text-muted-foreground">Battery storage and grid stabilization metrics across Sachsen</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Total Capacity" value="1,260" unit="MWh" change={42.5} changeLabel="vs last year" icon={<Battery className="w-5 h-5" />} delay={100} />
          <KPICard title="Installations" value="28,500" change={35} changeLabel="vs last year" icon={<Zap className="w-5 h-5" />} delay={200} />
          <KPICard title="Grid Services" value="180" unit="MW" icon={<Activity className="w-5 h-5" />} delay={300} />
          <KPICard title="Utilization" value="78" unit="%" change={12} changeLabel="vs last year" icon={<TrendingUp className="w-5 h-5" />} delay={400} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Storage Capacity Growth" subtitle="MWh by segment" delay={500}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={capacityData}>
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

          <ChartCard title="Regional Distribution" subtitle="Storage capacity by district" className="lg:col-span-1" delay={600}>
            <RegionMap data={[]} className="py-4" />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InsightCard type="success" title="Market Leader" description="Sachsen ranks 3rd nationally in residential storage adoption per capita." delay={700} />
          <InsightCard type="info" title="Grid Integration" description="85% of new solar installations now include battery storage systems." delay={800} />
          <InsightCard type="suggestion" title="Funding Impact" description="Utility-scale storage projects could unlock 500 MW of curtailed renewable capacity." delay={900} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Storage;
