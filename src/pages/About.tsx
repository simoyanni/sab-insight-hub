import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Database, Shield, Users, Mail, ExternalLink } from "lucide-react";

const About = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground mb-1">About This Dashboard</h1>
          <p className="text-muted-foreground">
            Information about the SAB Energy Insights Dashboard
          </p>
        </div>

        <Card className="card-shadow animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              The SAB Energy Insights Dashboard is a comprehensive data visualization platform designed 
              to support data-driven funding decisions for energy transition initiatives across Sachsen, Germany.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By aggregating and analyzing energy data from multiple sources, this dashboard provides 
              actionable insights for policymakers, funding bodies, and stakeholders involved in 
              Sachsen's energy transformation.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="card-shadow animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Database className="w-4 h-4 text-accent" />
                Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Bundesnetzagentur (Federal Network Agency)</li>
                <li>• Statistisches Landesamt Sachsen</li>
                <li>• Energy provider reports</li>
                <li>• Municipal energy data</li>
                <li>• Building registry information</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-shadow animate-slide-up" style={{ animationDelay: "300ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="w-4 h-4 text-accent" />
                Data Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All data displayed is aggregated and anonymized in compliance with GDPR regulations. 
                No personally identifiable information is collected or displayed.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-shadow animate-slide-up" style={{ animationDelay: "400ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Target Audience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Policy Makers</h4>
                <p className="text-sm text-muted-foreground">
                  Evidence-based insights for energy policy development and funding allocation.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Funding Bodies</h4>
                <p className="text-sm text-muted-foreground">
                  Data-driven recommendations for maximizing impact of energy transition investments.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Researchers</h4>
                <p className="text-sm text-muted-foreground">
                  Comprehensive data for academic research on regional energy transitions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow animate-slide-up" style={{ animationDelay: "500ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-accent" />
              Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-foreground">Sächsische Aufbaubank (SAB)</h4>
                <p className="text-sm text-muted-foreground">Development Bank of Saxony</p>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <a href="mailto:info@sab.sachsen.de" className="text-accent hover:underline flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  info@sab.sachsen.de
                </a>
                <a href="https://www.sab.sachsen.de" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center gap-1">
                  <ExternalLink className="w-4 h-4" />
                  www.sab.sachsen.de
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground py-4 animate-slide-up" style={{ animationDelay: "600ms" }}>
          <p>© 2024 Sächsische Aufbaubank. All rights reserved.</p>
          <p className="mt-1">Dashboard Version 1.0.0</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default About;
