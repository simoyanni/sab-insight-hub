import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { Car, Zap, TrendingUp, MapPin, Fuel } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const evData = [
  { month: "Jan", registrations: 1200, chargers: 180 },
  { month: "Feb", registrations: 1350, chargers: 195 },
  { month: "Mar", registrations: 1580, chargers: 210 },
  { month: "Apr", registrations: 1720, chargers: 228 },
  { month: "May", registrations: 1890, chargers: 245 },
  { month: "Jun", registrations: 2100, chargers: 265 },
];

const infraData = [
  { type: "AC Public", count: 2800 },
  { type: "DC Fast", count: 680 },
  { type: "Home Chargers", count: 18500 },
  { type: "Workplace", count: 1200 },
];

const Mobility = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <Car className="w-5 h-5 text-chart-teal" />
            <span className="text-sm font-medium text-chart-teal">Energy Category</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">E-Mobility</h1>
          <p className="text-muted-foreground">Electric vehicle adoption and charging infrastructure across Sachsen</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Registered EVs" value="48,500" change={45} changeLabel="vs last year" icon={<Car className="w-5 h-5" />} delay={100} />
          <KPICard title="Public Chargers" value="3,480" change={32} changeLabel="vs last year" icon={<Zap className="w-5 h-5" />} delay={200} />
          <KPICard title="EV Market Share" value="18.5" unit="%" change={6.2} changeLabel="vs last year" icon={<TrendingUp className="w-5 h-5" />} delay={300} />
          <KPICard title="Charging Points/EV" value="1:14" icon={<MapPin className="w-5 h-5" />} delay={400} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="EV Adoption Trend" subtitle="Monthly registrations and charger deployments" delay={500}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="registrations" name="EV Registrations" stroke="hsl(var(--chart-teal))" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="chargers" name="New Chargers" stroke="hsl(var(--chart-amber))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Charging Infrastructure" subtitle="Charger count by type" delay={600}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={infraData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="type" type="category" width={100} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Bar dataKey="count" name="Count" fill="hsl(var(--chart-teal))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard title="Charging Network Map" subtitle="Public charger distribution" className="lg:col-span-2" delay={700}>
            <RegionMap data={[]} className="py-4" />
          </ChartCard>
          <div className="space-y-4">
            <InsightCard type="success" title="Strong Growth" description="EV registrations up 45% YoY, outpacing national average by 12 percentage points." delay={800} />
            <InsightCard type="warning" title="Infrastructure Gap" description="Rural areas show 1:28 charger-to-EV ratio vs 1:10 in urban centers." delay={900} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Mobility;
