import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { Wind, Zap, TrendingUp, Target, MapPin } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const generationData = [
  { month: "Jan", generation: 320, capacity: 280 },
  { month: "Feb", generation: 290, capacity: 280 },
  { month: "Mar", generation: 340, capacity: 290 },
  { month: "Apr", generation: 280, capacity: 290 },
  { month: "May", generation: 250, capacity: 300 },
  { month: "Jun", generation: 220, capacity: 300 },
  { month: "Jul", generation: 200, capacity: 310 },
  { month: "Aug", generation: 210, capacity: 310 },
  { month: "Sep", generation: 260, capacity: 320 },
  { month: "Oct", generation: 310, capacity: 320 },
  { month: "Nov", generation: 350, capacity: 330 },
  { month: "Dec", generation: 380, capacity: 330 },
];

const regionData = [
  { region: "Erzgebirge", turbines: 45, capacity: 180 },
  { region: "Vogtland", turbines: 38, capacity: 152 },
  { region: "Mittelsachsen", turbines: 32, capacity: 128 },
  { region: "Nordsachsen", turbines: 28, capacity: 112 },
  { region: "Leipzig Land", turbines: 22, capacity: 88 },
];

const Wind_ = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <Wind className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">Energy Category</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Wind Energy</h1>
          <p className="text-muted-foreground">Wind turbine installations and generation across Sachsen</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Installed Capacity" value="2,100" unit="MW" change={8.5} changeLabel="vs last year" icon={<Zap className="w-5 h-5" />} delay={100} />
          <KPICard title="Turbines Online" value="485" change={12} changeLabel="new this year" icon={<Wind className="w-5 h-5" />} delay={200} />
          <KPICard title="Avg. Capacity Factor" value="28" unit="%" icon={<Target className="w-5 h-5" />} delay={300} />
          <KPICard title="Grid Connection" value="94" unit="%" icon={<TrendingUp className="w-5 h-5" />} delay={400} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Monthly Generation" subtitle="GWh generated vs installed capacity trend" delay={500}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generationData}>
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
                <BarChart data={regionData} layout="vertical">
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
            <InsightCard type="info" title="Seasonal Patterns" description="Wind generation peaks in autumn/winter months, complementing solar production cycles." delay={800} />
            <InsightCard type="warning" title="Permitting Delays" description="Average permitting time increased to 4.2 years. Process streamlining recommended." delay={900} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Wind_;
