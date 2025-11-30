import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { TargetGroupSwitcher, TargetGroup } from "@/components/dashboard/TargetGroupSwitcher";
import { Car, Zap, TrendingUp, MapPin } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const dataByGroup: Record<TargetGroup, {
  kpis: { title: string; value: string; unit?: string; change?: number; changeLabel?: string }[];
  evData: { month: string; registrations: number; chargers: number }[];
  infraData: { type: string; count: number }[];
  insights: { type: "success" | "warning" | "info" | "suggestion"; title: string; description: string }[];
}> = {
  individuals: {
    kpis: [
      { title: "Private EVs", value: "38,500", change: 48, changeLabel: "vs last year" },
      { title: "Home Chargers", value: "18,500", change: 52, changeLabel: "vs last year" },
      { title: "EV Share", value: "15.2", unit: "%", change: 5.8, changeLabel: "vs last year" },
      { title: "Avg. Savings", value: "€1,800", unit: "/year" },
    ],
    evData: [
      { month: "Jan", registrations: 950, chargers: 320 },
      { month: "Feb", registrations: 1100, chargers: 380 },
      { month: "Mar", registrations: 1280, chargers: 450 },
      { month: "Apr", registrations: 1420, chargers: 520 },
      { month: "May", registrations: 1580, chargers: 600 },
      { month: "Jun", registrations: 1750, chargers: 680 },
    ],
    infraData: [
      { type: "Home Chargers", count: 18500 },
      { type: "Public AC", count: 1200 },
      { type: "Public DC", count: 280 },
    ],
    insights: [
      { type: "success", title: "Rapid Adoption", description: "Private EV registrations up 48% YoY, driven by federal incentives and fuel cost savings." },
      { type: "suggestion", title: "Rural Charging", description: "Rural areas need 40% more public charging infrastructure to match urban coverage." },
    ],
  },
  businesses: {
    kpis: [
      { title: "Fleet EVs", value: "8,200", change: 42, changeLabel: "vs last year" },
      { title: "Workplace Chargers", value: "1,200", change: 35, changeLabel: "vs last year" },
      { title: "Fleet Conversion", value: "22", unit: "%", change: 8, changeLabel: "vs last year" },
      { title: "Fuel Savings", value: "€12", unit: "M/year" },
    ],
    evData: [
      { month: "Jan", registrations: 180, chargers: 45 },
      { month: "Feb", registrations: 220, chargers: 55 },
      { month: "Mar", registrations: 280, chargers: 68 },
      { month: "Apr", registrations: 320, chargers: 82 },
      { month: "May", registrations: 380, chargers: 95 },
      { month: "Jun", registrations: 420, chargers: 110 },
    ],
    infraData: [
      { type: "Workplace", count: 1200 },
      { type: "Fleet Depots", count: 450 },
      { type: "Customer", count: 380 },
    ],
    insights: [
      { type: "info", title: "Fleet Transition", description: "Corporate fleets transitioning to electric, with 22% of company vehicles now EVs." },
      { type: "warning", title: "Charging Gaps", description: "Logistics companies report insufficient depot charging capacity for full fleet electrification." },
    ],
  },
  authorities: {
    kpis: [
      { title: "Public Fleet", value: "1,800", change: 28, changeLabel: "vs last year" },
      { title: "Public Chargers", value: "3,480", change: 32, changeLabel: "vs last year" },
      { title: "E-Bus Fleet", value: "180", change: 45, changeLabel: "new vehicles" },
      { title: "Investment", value: "€85", unit: "M" },
    ],
    evData: [
      { month: "Jan", registrations: 70, chargers: 85 },
      { month: "Feb", registrations: 85, chargers: 95 },
      { month: "Mar", registrations: 95, chargers: 110 },
      { month: "Apr", registrations: 110, chargers: 125 },
      { month: "May", registrations: 125, chargers: 145 },
      { month: "Jun", registrations: 140, chargers: 165 },
    ],
    infraData: [
      { type: "Public AC", count: 2800 },
      { type: "Public DC", count: 680 },
      { type: "Bus Charging", count: 85 },
    ],
    insights: [
      { type: "success", title: "Public Leadership", description: "Municipal EV programs leading by example with 28% growth in public fleet electrification." },
      { type: "suggestion", title: "Charging Network", description: "Strategic expansion of public DC fast chargers along highways could accelerate regional EV adoption." },
    ],
  },
};

const Mobility = () => {
  const [targetGroup, setTargetGroup] = useState<TargetGroup>("individuals");
  const data = dataByGroup[targetGroup];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Car className="w-5 h-5 text-chart-teal" />
              <span className="text-sm font-medium text-chart-teal">Energy Category</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">E-Mobility</h1>
            <p className="text-muted-foreground">Electric vehicle adoption and charging infrastructure across Sachsen</p>
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
              icon={index === 0 ? <Car className="w-5 h-5" /> : index === 1 ? <Zap className="w-5 h-5" /> : index === 2 ? <TrendingUp className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
              delay={100 + index * 100}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="EV Adoption Trend" subtitle="Monthly registrations and charger deployments" delay={500}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.evData}>
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
                <BarChart data={data.infraData} layout="vertical">
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
            {data.insights.map((insight, index) => (
              <InsightCard key={index} type={insight.type} title={insight.title} description={insight.description} delay={800 + index * 100} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Mobility;