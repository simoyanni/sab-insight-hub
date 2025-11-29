import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { User, Home, Sun, Zap, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const adoptionData = [
  { category: "Solar PV", adoption: 28, target: 45 },
  { category: "Heat Pumps", adoption: 15, target: 35 },
  { category: "EV Charging", adoption: 8, target: 25 },
  { category: "Battery", adoption: 5, target: 20 },
  { category: "Smart Meters", adoption: 42, target: 70 },
];

const pieData = [
  { name: "Urban", value: 45, color: "hsl(var(--accent))" },
  { name: "Suburban", value: 35, color: "hsl(var(--chart-green))" },
  { name: "Rural", value: 20, color: "hsl(var(--chart-amber))" },
];

const tableData = [
  { region: "Dresden", households: "285,000", pvAdoption: "32%", heatPumps: "18%", potential: "High" },
  { region: "Leipzig", households: "312,000", pvAdoption: "29%", heatPumps: "15%", potential: "High" },
  { region: "Chemnitz", households: "125,000", pvAdoption: "25%", heatPumps: "12%", potential: "Medium" },
  { region: "Görlitz", households: "68,000", pvAdoption: "35%", heatPumps: "22%", potential: "High" },
  { region: "Bautzen", households: "72,000", pvAdoption: "31%", heatPumps: "19%", potential: "Medium" },
];

const Individuals = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <User className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">Target Group</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Individuals & Households</h1>
          <p className="text-muted-foreground">
            Energy adoption metrics for private households across Sachsen
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Households"
            value="1.85"
            unit="M"
            icon={<Home className="w-5 h-5" />}
            delay={100}
          />
          <KPICard
            title="PV Adoption Rate"
            value="28.4"
            unit="%"
            change={4.2}
            changeLabel="vs last year"
            icon={<Sun className="w-5 h-5" />}
            delay={200}
          />
          <KPICard
            title="Avg. Energy Savings"
            value="€1,240"
            unit="/year"
            change={8.5}
            changeLabel="vs last year"
            icon={<Zap className="w-5 h-5" />}
            delay={300}
          />
          <KPICard
            title="Growth Potential"
            value="High"
            icon={<TrendingUp className="w-5 h-5" />}
            delay={400}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Technology Adoption vs Targets"
            subtitle="Current adoption rate vs 2030 targets"
            delay={500}
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adoptionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="category" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, ""]}
                  />
                  <Legend />
                  <Bar dataKey="adoption" name="Current" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="2030 Target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Distribution by Area Type"
            subtitle="Household energy adoption by location"
            delay={600}
          >
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, ""]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Map and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard
            title="Regional Adoption Map"
            subtitle="PV adoption rate by district"
            className="lg:col-span-2"
            delay={700}
          >
            <RegionMap data={[]} className="py-4" />
          </ChartCard>

          <div className="space-y-4">
            <InsightCard
              type="info"
              title="Insights for Individuals"
              description="Households in rural areas show 40% higher solar adoption rates due to larger roof areas and lower grid reliability."
              delay={800}
            />
            <InsightCard
              type="suggestion"
              title="Funding Recommendation"
              description="Targeted incentives for heat pump installations in older housing stock could accelerate adoption by 25%."
              delay={900}
            />
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          title="Regional Household Metrics"
          subtitle="Key metrics by district"
          columns={[
            { key: "region", header: "Region" },
            { key: "households", header: "Households" },
            { key: "pvAdoption", header: "PV Adoption" },
            { key: "heatPumps", header: "Heat Pumps" },
            {
              key: "potential",
              header: "Potential",
              render: (value) => (
                <span
                  className={
                    value === "High"
                      ? "text-chart-green font-medium"
                      : "text-chart-amber font-medium"
                  }
                >
                  {value as string}
                </span>
              ),
            },
          ]}
          data={tableData}
          delay={1000}
        />
      </div>
    </DashboardLayout>
  );
};

export default Individuals;
