import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { Building2, Factory, Zap, TrendingUp, Euro } from "lucide-react";
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

const sectorData = [
  { sector: "Manufacturing", consumption: 4200, renewable: 1260 },
  { sector: "Retail", consumption: 1800, renewable: 720 },
  { sector: "Services", consumption: 2400, renewable: 1080 },
  { sector: "Agriculture", consumption: 1200, renewable: 840 },
  { sector: "Tech/IT", consumption: 800, renewable: 480 },
];

const pieData = [
  { name: "SMEs", value: 65, color: "hsl(var(--accent))" },
  { name: "Large Corps", value: 25, color: "hsl(var(--chart-green))" },
  { name: "Micro", value: 10, color: "hsl(var(--chart-amber))" },
];

const tableData = [
  { region: "Dresden", businesses: "24,500", renewableShare: "35%", investment: "€42M", potential: "High" },
  { region: "Leipzig", businesses: "28,200", renewableShare: "32%", investment: "€38M", potential: "High" },
  { region: "Chemnitz", businesses: "15,800", renewableShare: "28%", investment: "€25M", potential: "Medium" },
  { region: "Zwickau", businesses: "8,900", renewableShare: "31%", investment: "€18M", potential: "Medium" },
  { region: "Görlitz", businesses: "6,200", renewableShare: "38%", investment: "€15M", potential: "High" },
];

const Businesses = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">Target Group</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Businesses</h1>
          <p className="text-muted-foreground">
            Commercial and industrial energy metrics across Sachsen
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Registered Businesses"
            value="142,000"
            icon={<Building2 className="w-5 h-5" />}
            delay={100}
          />
          <KPICard
            title="Renewable Adoption"
            value="32.5"
            unit="%"
            change={6.8}
            changeLabel="vs last year"
            icon={<Zap className="w-5 h-5" />}
            delay={200}
          />
          <KPICard
            title="Total Investment"
            value="€185"
            unit="M"
            change={15.2}
            changeLabel="vs last year"
            icon={<Euro className="w-5 h-5" />}
            delay={300}
          />
          <KPICard
            title="Growth Rate"
            value="+18"
            unit="%"
            icon={<TrendingUp className="w-5 h-5" />}
            delay={400}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Energy by Sector"
            subtitle="Consumption vs Renewable generation (GWh)"
            delay={500}
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="sector" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="consumption" name="Total Consumption" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="renewable" name="Renewable" fill="hsl(var(--chart-green))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Business Size Distribution"
            subtitle="Renewable energy adopters by company size"
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
            title="Business Energy Map"
            subtitle="Commercial renewable adoption by district"
            className="lg:col-span-2"
            delay={700}
          >
            <RegionMap data={[]} className="py-4" />
          </ChartCard>

          <div className="space-y-4">
            <InsightCard
              type="info"
              title="Insights for Businesses"
              description="Manufacturing sector shows highest potential for solar rooftop installations with 45% of suitable roof space unutilized."
              delay={800}
            />
            <InsightCard
              type="suggestion"
              title="Funding Opportunity"
              description="SME-focused programs could accelerate adoption; 72% of interested businesses cite upfront costs as main barrier."
              delay={900}
            />
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          title="Regional Business Metrics"
          subtitle="Key commercial energy metrics by district"
          columns={[
            { key: "region", header: "Region" },
            { key: "businesses", header: "Businesses" },
            { key: "renewableShare", header: "Renewable Share" },
            { key: "investment", header: "Investment (2024)" },
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

export default Businesses;
