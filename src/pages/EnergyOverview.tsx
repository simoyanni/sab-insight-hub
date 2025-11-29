import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { Sun, Wind, Zap, Leaf, Factory, TrendingUp } from "lucide-react";
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

const trendData = [
  { month: "Jan", solar: 1200, wind: 800, other: 400 },
  { month: "Feb", solar: 1350, wind: 850, other: 420 },
  { month: "Mar", solar: 1800, wind: 900, other: 450 },
  { month: "Apr", solar: 2200, wind: 920, other: 480 },
  { month: "May", solar: 2800, wind: 880, other: 500 },
  { month: "Jun", solar: 3200, wind: 750, other: 520 },
  { month: "Jul", solar: 3500, wind: 700, other: 540 },
  { month: "Aug", solar: 3300, wind: 720, other: 530 },
  { month: "Sep", solar: 2600, wind: 850, other: 510 },
  { month: "Oct", solar: 1900, wind: 950, other: 490 },
  { month: "Nov", solar: 1400, wind: 1000, other: 470 },
  { month: "Dec", solar: 1100, wind: 1050, other: 450 },
];

const categoryData = [
  { name: "Solar PV", installed: 4200, potential: 8500 },
  { name: "Wind", installed: 2100, potential: 4200 },
  { name: "Heat Pumps", installed: 1800, potential: 5500 },
  { name: "Storage", installed: 800, potential: 3200 },
  { name: "Mobility", installed: 1200, potential: 4800 },
  { name: "Hydrogen", installed: 150, potential: 2000 },
];

const EnergyOverview = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground mb-1">Energy Overview</h1>
          <p className="text-muted-foreground">
            Comprehensive energy metrics and trends across Sachsen
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="PV Installations"
            value="42,567"
            unit="units"
            change={12.4}
            changeLabel="vs last year"
            icon={<Sun className="w-5 h-5" />}
            delay={100}
          />
          <KPICard
            title="Renewable Share"
            value="34.8"
            unit="%"
            change={5.2}
            changeLabel="vs last year"
            icon={<Leaf className="w-5 h-5" />}
            delay={200}
          />
          <KPICard
            title="CO₂ Emissions"
            value="18.2"
            unit="Mt/year"
            change={-8.5}
            changeLabel="vs last year"
            icon={<Factory className="w-5 h-5" />}
            delay={300}
          />
          <KPICard
            title="Energy Efficiency"
            value="72"
            unit="score"
            change={3.1}
            changeLabel="vs last year"
            icon={<TrendingUp className="w-5 h-5" />}
            delay={400}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Energy Generation Trends"
            subtitle="Monthly GWh by source (2024)"
            delay={500}
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="solar"
                    name="Solar"
                    stroke="hsl(var(--chart-amber))"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="wind"
                    name="Wind"
                    stroke="hsl(var(--chart-blue))"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="other"
                    name="Other"
                    stroke="hsl(var(--chart-green))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Category Performance"
            subtitle="Installed vs Potential capacity (MW)"
            delay={600}
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="installed" name="Installed" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="potential" name="Potential" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Map and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard
            title="Regional Distribution"
            subtitle="Energy performance by district"
            className="lg:col-span-2"
            delay={700}
          >
            <RegionMap data={[]} className="py-4" />
          </ChartCard>

          <div className="space-y-4">
            <InsightCard
              type="success"
              title="Strong Solar Growth"
              description="Solar installations increased by 23% in Q3, exceeding regional targets."
              delay={800}
            />
            <InsightCard
              type="warning"
              title="Grid Capacity Alert"
              description="Eastern districts approaching 85% grid capacity. Infrastructure investment recommended."
              delay={900}
            />
            <InsightCard
              type="suggestion"
              title="Funding Opportunity"
              description="Heat pump adoption in rural areas shows high potential for funding impact."
              delay={1000}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EnergyOverview;
