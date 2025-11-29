import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RegionMap } from "@/components/dashboard/RegionMap";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { Landmark, Building, Zap, Users, FileText } from "lucide-react";
import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const initiativeData = [
  { area: "Solar", current: 75, target: 100 },
  { area: "Wind", current: 45, target: 100 },
  { area: "Heat", current: 55, target: 100 },
  { area: "Mobility", current: 35, target: 100 },
  { area: "Grid", current: 60, target: 100 },
  { area: "Storage", current: 25, target: 100 },
];

const budgetData = [
  { category: "Infrastructure", allocated: 85, spent: 62 },
  { category: "Subsidies", allocated: 120, spent: 98 },
  { category: "Planning", allocated: 25, spent: 22 },
  { category: "Education", allocated: 15, spent: 12 },
  { category: "Research", allocated: 35, spent: 28 },
];

const tableData = [
  { municipality: "Dresden City", population: "560,000", initiatives: 24, budget: "€45M", completion: "68%" },
  { municipality: "Leipzig City", population: "620,000", initiatives: 28, budget: "€52M", completion: "72%" },
  { municipality: "Chemnitz City", population: "245,000", initiatives: 15, budget: "€28M", completion: "61%" },
  { municipality: "Zwickau", population: "89,000", initiatives: 8, budget: "€12M", completion: "75%" },
  { municipality: "Plauen", population: "65,000", initiatives: 6, budget: "€8M", completion: "58%" },
];

const LocalAuthorities = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <Landmark className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">Target Group</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Local Authorities</h1>
          <p className="text-muted-foreground">
            Municipal and district-level energy initiatives across Sachsen
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Municipalities"
            value="419"
            icon={<Building className="w-5 h-5" />}
            delay={100}
          />
          <KPICard
            title="Active Initiatives"
            value="186"
            change={22}
            changeLabel="vs last year"
            icon={<FileText className="w-5 h-5" />}
            delay={200}
          />
          <KPICard
            title="Total Budget"
            value="€312"
            unit="M"
            change={18.5}
            changeLabel="vs last year"
            icon={<Zap className="w-5 h-5" />}
            delay={300}
          />
          <KPICard
            title="Population Reached"
            value="4.0"
            unit="M"
            icon={<Users className="w-5 h-5" />}
            delay={400}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Initiative Progress"
            subtitle="Current progress vs targets by energy area"
            delay={500}
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={initiativeData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="area" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <PolarRadiusAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Radar name="Current" dataKey="current" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Budget Allocation"
            subtitle="Allocated vs Spent (€M)"
            delay={600}
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="category" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="allocated" name="Allocated" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="spent" name="Spent" fill="hsl(var(--chart-green))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Map and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard
            title="Municipal Activity Map"
            subtitle="Energy initiative density by district"
            className="lg:col-span-2"
            delay={700}
          >
            <RegionMap data={[]} className="py-4" />
          </ChartCard>

          <div className="space-y-4">
            <InsightCard
              type="info"
              title="Insights for Authorities"
              description="Rural municipalities show 40% lower initiative completion rates, often due to limited administrative capacity."
              delay={800}
            />
            <InsightCard
              type="suggestion"
              title="Funding Recommendation"
              description="Shared services model between smaller municipalities could improve efficiency by 35% and reduce overhead."
              delay={900}
            />
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          title="Municipal Overview"
          subtitle="Key metrics for major municipalities"
          columns={[
            { key: "municipality", header: "Municipality" },
            { key: "population", header: "Population" },
            { key: "initiatives", header: "Initiatives" },
            { key: "budget", header: "Budget" },
            {
              key: "completion",
              header: "Completion",
              render: (value) => {
                const num = parseInt(value as string);
                return (
                  <span className={num >= 70 ? "text-chart-green font-medium" : num >= 60 ? "text-chart-amber font-medium" : "text-chart-red font-medium"}>
                    {value as string}
                  </span>
                );
              },
            },
          ]}
          data={tableData}
          delay={1000}
        />
      </div>
    </DashboardLayout>
  );
};

export default LocalAuthorities;
