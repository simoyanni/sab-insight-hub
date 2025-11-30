import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CategoryPanel } from "@/components/dashboard/CategoryPanel";
import { Sun, Wind, Flame, Battery, Car, Atom, Network, Factory, FileText, Download, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
const fundingGrowthData = [{
  year: "2020",
  Solar: 120,
  Wind: 80,
  Heat: 45,
  Storage: 20,
  Hydrogen: 5,
  Grid: 60,
  Mobility: 30,
  Industry: 40
}, {
  year: "2021",
  Solar: 180,
  Wind: 95,
  Heat: 65,
  Storage: 35,
  Hydrogen: 15,
  Grid: 75,
  Mobility: 55,
  Industry: 52
}, {
  year: "2022",
  Solar: 280,
  Wind: 120,
  Heat: 95,
  Storage: 60,
  Hydrogen: 35,
  Grid: 95,
  Mobility: 85,
  Industry: 68
}, {
  year: "2023",
  Solar: 420,
  Wind: 150,
  Heat: 140,
  Storage: 95,
  Hydrogen: 65,
  Grid: 120,
  Mobility: 130,
  Industry: 88
}, {
  year: "2024",
  Solar: 580,
  Wind: 190,
  Heat: 195,
  Storage: 140,
  Hydrogen: 110,
  Grid: 155,
  Mobility: 185,
  Industry: 115
}, {
  year: "2025",
  Solar: 720,
  Wind: 240,
  Heat: 260,
  Storage: 200,
  Hydrogen: 180,
  Grid: 200,
  Mobility: 250,
  Industry: 145
}];
const categoryData = [{
  title: "Solar",
  icon: Sun,
  href: "/energy-categories/solar",
  colorClass: "text-chart-amber",
  metrics: [{
    label: "Installed Capacity",
    value: "5,100 MW"
  }, {
    label: "Potential",
    value: "9,300 MW"
  }, {
    label: "Gap",
    value: "4,200 MW"
  }],
  summary: "Strong growth in rooftop installations, commercial sector leading adoption."
}, {
  title: "Wind",
  icon: Wind,
  href: "/energy-categories/wind",
  colorClass: "text-accent",
  metrics: [{
    label: "Installed Capacity",
    value: "2,100 MW"
  }, {
    label: "Potential",
    value: "4,800 MW"
  }, {
    label: "Gap",
    value: "2,700 MW"
  }],
  summary: "Permitting delays impacting growth, strong resource potential in highlands."
}, {
  title: "Heat",
  icon: Flame,
  href: "/energy-categories/heat",
  colorClass: "text-chart-amber",
  metrics: [{
    label: "Heat Pumps",
    value: "65,000"
  }, {
    label: "Target 2030",
    value: "180,000"
  }, {
    label: "Gap",
    value: "115,000"
  }],
  summary: "Rapid growth driven by subsidies and rising gas prices."
}, {
  title: "Storage",
  icon: Battery,
  href: "/energy-categories/storage",
  colorClass: "text-chart-green",
  metrics: [{
    label: "Capacity",
    value: "1,260 MWh"
  }, {
    label: "Potential",
    value: "3,500 MWh"
  }, {
    label: "Gap",
    value: "2,240 MWh"
  }],
  summary: "85% of new solar includes storage, utility-scale projects emerging."
}, {
  title: "Hydrogen",
  icon: Atom,
  href: "/energy-categories/hydrogen",
  colorClass: "text-chart-purple",
  metrics: [{
    label: "Projects",
    value: "28"
  }, {
    label: "Investment",
    value: "€420M"
  }, {
    label: "Jobs Created",
    value: "850"
  }],
  summary: "Emerging sector with Leipzig-Halle corridor as strategic hub."
}, {
  title: "Grid",
  icon: Network,
  href: "/energy-categories/grid",
  colorClass: "text-accent",
  metrics: [{
    label: "Capacity",
    value: "8,500 MW"
  }, {
    label: "Availability",
    value: "99.7%"
  }, {
    label: "Investment",
    value: "€850M"
  }],
  summary: "Eastern districts at capacity limits, expansion critical."
}, {
  title: "Mobility",
  icon: Car,
  href: "/energy-categories/mobility",
  colorClass: "text-chart-teal",
  metrics: [{
    label: "EVs Registered",
    value: "48,500"
  }, {
    label: "Public Chargers",
    value: "3,480"
  }, {
    label: "Market Share",
    value: "18.5%"
  }],
  summary: "Rural charging infrastructure gap remains a challenge."
}, {
  title: "Industry",
  icon: Factory,
  href: "/energy-categories/grid",
  colorClass: "text-muted-foreground",
  metrics: [{
    label: "Energy Intensity",
    value: "-12%"
  }, {
    label: "Renewable Use",
    value: "34%"
  }, {
    label: "Investment",
    value: "€280M"
  }],
  summary: "Industrial decarbonization gaining momentum."
}];
const Index = () => {
  return <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Hero Header */}
        <div className="py-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            {/* Pentagon Logo with Apple-like rounding */}
            <div className="w-10 h-10 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50 8 L92 35 Q95 37 94 41 L80 82 Q78 86 74 87 L26 87 Q22 86 20 82 L6 41 Q5 37 8 35 Z" fill="hsl(var(--accent))" className="drop-shadow-sm" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-muted-foreground">
              ampéra insight
            </h1>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground uppercase tracking-wide">
            Required Funding for the Energy Sector
          </h2>
        </div>

        {/* Main Growth Chart */}
        <div className="bg-card rounded-2xl p-6 card-shadow animate-slide-up" style={{
        animationDelay: "100ms"
      }}>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-accent" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Funding Requirements by Category</h2>
              <p className="text-sm text-muted-foreground">Projected funding needs (€M) through 2025</p>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fundingGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" tick={{
                fontSize: 12
              }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{
                fontSize: 12
              }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }} formatter={(value: number) => [`€${value}M`, ""]} />
                <Legend />
                <Area type="monotone" dataKey="Solar" stackId="1" stroke="hsl(var(--chart-amber))" fill="hsl(var(--chart-amber))" fillOpacity={0.7} />
                <Area type="monotone" dataKey="Wind" stackId="1" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.7} />
                <Area type="monotone" dataKey="Heat" stackId="1" stroke="hsl(38, 92%, 60%)" fill="hsl(38, 92%, 60%)" fillOpacity={0.7} />
                <Area type="monotone" dataKey="Storage" stackId="1" stroke="hsl(var(--chart-green))" fill="hsl(var(--chart-green))" fillOpacity={0.7} />
                <Area type="monotone" dataKey="Hydrogen" stackId="1" stroke="hsl(var(--chart-purple))" fill="hsl(var(--chart-purple))" fillOpacity={0.7} />
                <Area type="monotone" dataKey="Grid" stackId="1" stroke="hsl(var(--chart-teal))" fill="hsl(var(--chart-teal))" fillOpacity={0.7} />
                <Area type="monotone" dataKey="Mobility" stackId="1" stroke="hsl(180, 55%, 55%)" fill="hsl(180, 55%, 55%)" fillOpacity={0.7} />
                <Area type="monotone" dataKey="Industry" stackId="1" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground))" fillOpacity={0.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Panels Grid */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">Energy Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryData.map((category, index) => <CategoryPanel key={category.title} title={category.title} icon={category.icon} href={category.href} metrics={category.metrics} summary={category.summary} colorClass={category.colorClass} delay={200 + index * 50} />)}
          </div>
        </div>

        {/* Report/Export Panel */}
        <div className="animate-slide-up" style={{
        animationDelay: "600ms"
      }}>
          <Link to="/reports" className="block">
            <div className="bg-card rounded-2xl p-8 card-shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl dashboard-gradient flex items-center justify-center">
                    <FileText className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">Reports & Export</h3>
                    <p className="text-muted-foreground">Generate comprehensive reports and export data</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-muted/50 rounded-lg px-5 py-3 text-center">
                    <FileText className="w-5 h-5 text-accent mx-auto mb-1" />
                    <span className="text-sm font-medium text-foreground">Generate Report</span>
                  </div>
                  <div className="bg-muted/50 rounded-lg px-5 py-3 text-center">
                    <Download className="w-5 h-5 text-accent mx-auto mb-1" />
                    <span className="text-sm font-medium text-foreground">Export Data</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Feature Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up" style={{
        animationDelay: "700ms"
      }}>
          <div className="bg-card rounded-xl p-4 card-shadow text-center">
            <div className="text-sm font-medium text-foreground">Real-time energy & funding insights</div>
          </div>
          <div className="bg-card rounded-xl p-4 card-shadow text-center">
            <div className="text-sm font-medium text-foreground">Regional heatmaps & sector analytics</div>
          </div>
          <div className="bg-card rounded-xl p-4 card-shadow text-center">
            <div className="text-sm font-medium text-foreground">Auto-generated funding reports</div>
          </div>
          <div className="bg-card rounded-xl p-4 card-shadow text-center">
            <div className="text-sm font-medium text-foreground">Smart insights & recommendations</div>
          </div>
        </div>
      </div>
    </DashboardLayout>;
};
export default Index;