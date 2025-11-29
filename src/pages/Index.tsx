import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OverviewCard } from "@/components/dashboard/OverviewCard";
import { Zap, Users, Grid3X3, Lightbulb, TrendingUp, MapPin } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="animate-fade-in">
          <div className="mb-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-accent uppercase tracking-wider">
              Live Dashboard
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            SAB Energy Insights Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Visualizing energy data to support data-driven funding decisions across Sachsen.
          </p>
        </div>

        {/* Description */}
        <div className="bg-card rounded-xl p-6 card-shadow animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl dashboard-gradient flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Faster insights. Better decisions.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This dashboard aggregates comprehensive energy data from across Sachsen, providing 
                real-time analytics on renewable energy adoption, regional performance metrics, 
                and funding opportunities. Navigate through different energy categories and target 
                groups to discover actionable insights.
              </p>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <OverviewCard
            title="Energy Overview"
            description="Comprehensive view of energy metrics, trends, and regional performance across Sachsen."
            icon={<Zap className="w-6 h-6" />}
            href="/energy-overview"
            delay={200}
          />
          <OverviewCard
            title="Target Groups"
            description="Analyze energy data segmented by individuals, businesses, and local authorities."
            icon={<Users className="w-6 h-6" />}
            href="/target-groups/individuals"
            delay={300}
          />
          <OverviewCard
            title="Energy Categories"
            description="Explore data by energy type: Solar, Wind, Heat, Storage, Mobility, and more."
            icon={<Grid3X3 className="w-6 h-6" />}
            href="/energy-categories/solar"
            delay={400}
          />
          <OverviewCard
            title="Recommendations"
            description="AI-powered funding suggestions based on regional needs and data analysis."
            icon={<Lightbulb className="w-6 h-6" />}
            href="/recommendations"
            delay={500}
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: "600ms" }}>
          <div className="bg-card rounded-xl p-4 card-shadow text-center">
            <div className="text-2xl font-bold text-foreground">42,500+</div>
            <div className="text-sm text-muted-foreground">PV Installations</div>
          </div>
          <div className="bg-card rounded-xl p-4 card-shadow text-center">
            <div className="text-2xl font-bold text-foreground">34.8%</div>
            <div className="text-sm text-muted-foreground">Renewable Share</div>
          </div>
          <div className="bg-card rounded-xl p-4 card-shadow text-center">
            <div className="text-2xl font-bold text-foreground">13</div>
            <div className="text-sm text-muted-foreground">Regions Covered</div>
          </div>
          <div className="bg-card rounded-xl p-4 card-shadow text-center">
            <div className="text-2xl font-bold text-foreground">€2.4B</div>
            <div className="text-sm text-muted-foreground">Funding Available</div>
          </div>
        </div>

        {/* Map Preview */}
        <div className="bg-card rounded-xl p-6 card-shadow animate-slide-up" style={{ animationDelay: "700ms" }}>
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Regional Coverage</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Data coverage spans all 13 districts of Sachsen, with real-time updates on energy metrics and funding allocation.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Dresden", "Leipzig", "Chemnitz", "Görlitz", "Bautzen", "Meißen", "Zwickau", "Vogtlandkreis"].map((region, i) => (
              <div
                key={region}
                className="bg-muted/50 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent/10 hover:text-accent transition-colors cursor-default"
              >
                {region}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
