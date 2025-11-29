import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, MapPin, Users, Zap, ArrowRight, TrendingUp, AlertTriangle, Target } from "lucide-react";

const recommendations = [
  {
    id: 1,
    title: "Heat Pump Incentive Program for Rural Households",
    region: "Erzgebirgskreis, Vogtlandkreis",
    targetGroup: "Individuals",
    category: "Heat",
    priority: "High",
    impact: "€45M potential savings",
    description: "Pre-1990 housing stock in rural areas shows 65% untapped heat pump potential. Targeted subsidies could accelerate adoption by 40% and reduce heating emissions by 120,000 tonnes CO₂/year.",
    rationale: "Data shows highest energy cost burden and lowest adoption rates in these districts. Building age profile is ideal for air-source heat pumps.",
  },
  {
    id: 2,
    title: "SME Solar Rooftop Initiative",
    region: "Leipzig, Dresden Industrial Zones",
    targetGroup: "Businesses",
    category: "Solar",
    priority: "High",
    impact: "800 MW potential capacity",
    description: "45% of commercial rooftop space in major industrial zones remains unutilized. An SME-focused financing program could unlock significant solar capacity while reducing business energy costs.",
    rationale: "Survey data indicates 72% of SMEs cite upfront costs as main barrier. Low-interest loan programs have shown 3x higher adoption rates.",
  },
  {
    id: 3,
    title: "Grid Infrastructure Upgrade - Eastern Corridor",
    region: "Görlitz, Bautzen",
    targetGroup: "Local Authorities",
    category: "Grid",
    priority: "Critical",
    impact: "2,000 MW unlocked capacity",
    description: "Grid constraints are blocking 40% of approved renewable projects in eastern districts. Strategic infrastructure investment is essential to meet 2030 targets.",
    rationale: "Current grid operates at 85%+ capacity during peaks. Connection wait times average 8 months, causing project cancellations.",
  },
  {
    id: 4,
    title: "EV Charging Network Expansion - Rural Areas",
    region: "Mittelsachsen, Nordsachsen",
    targetGroup: "Local Authorities",
    category: "Mobility",
    priority: "Medium",
    impact: "500 new charging points",
    description: "Rural areas show 1:28 charger-to-EV ratio vs 1:10 in urban centers. Expanding charging infrastructure is critical for equitable EV adoption.",
    rationale: "EV sales in rural areas lag urban by 35% primarily due to charging anxiety. Public charging expansion shows direct correlation with adoption rates.",
  },
  {
    id: 5,
    title: "Community Battery Storage Program",
    region: "All Districts",
    targetGroup: "Individuals",
    category: "Storage",
    priority: "Medium",
    impact: "300 MWh community storage",
    description: "Shared neighborhood storage systems can reduce costs by 40% vs individual units while improving grid stability. Pilot program recommended.",
    rationale: "85% of new solar installations include storage requests. Community model addresses cost barriers for lower-income households.",
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical": return "bg-chart-red/10 text-chart-red border-chart-red/20";
    case "High": return "bg-chart-amber/10 text-chart-amber border-chart-amber/20";
    case "Medium": return "bg-accent/10 text-accent border-accent/20";
    default: return "bg-muted text-muted-foreground";
  }
};

const Recommendations = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-5 h-5 text-chart-amber" />
            <span className="text-sm font-medium text-chart-amber">AI-Powered Analysis</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Recommendation Engine</h1>
          <p className="text-muted-foreground">
            Data-driven funding suggestions based on regional needs and gap analysis
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="card-shadow animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-red/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-chart-red" />
                </div>
                <div>
                  <div className="text-2xl font-bold">Görlitz</div>
                  <div className="text-sm text-muted-foreground">Highest Need Region</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">Individuals</div>
                  <div className="text-sm text-muted-foreground">Most Affected Group</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow animate-slide-up" style={{ animationDelay: "300ms" }}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-chart-green/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-chart-green" />
                </div>
                <div>
                  <div className="text-2xl font-bold">Heat</div>
                  <div className="text-sm text-muted-foreground">Biggest Impact Category</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Funding Suggestions</h2>
          
          {recommendations.map((rec, index) => (
            <Card
              key={rec.id}
              className="card-shadow hover:card-shadow-hover transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                        {rec.priority} Priority
                      </Badge>
                      <Badge variant="secondary" className="bg-muted">
                        {rec.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold">{rec.title}</CardTitle>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-semibold text-chart-green">{rec.impact}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4">{rec.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{rec.region}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{rec.targetGroup}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Zap className="w-4 h-4" />
                    <span>{rec.category}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-foreground">Data Rationale: </span>
                      <span className="text-sm text-muted-foreground">{rec.rationale}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Recommendations;
