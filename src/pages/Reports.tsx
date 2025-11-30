import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  Loader2, 
  CheckCircle2,
  MapPin,
  TrendingUp,
  Target,
  BarChart3,
  Lightbulb,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateSummaryReport, generateDetailedReport, exportToCSV } from "@/lib/reportGenerator";

const reportFeatures = {
  summary: [
    "Executive summary",
    "KPI overview",
    "Key insights",
    "Top recommendations"
  ],
  detailed: [
    "Executive summary",
    "Complete KPI overview",
    "Regional insights map",
    "Funding gap analysis",
    "Sector insights",
    "All recommendations",
    "Data tables & charts"
  ]
};

const Reports = () => {
  const { toast } = useToast();
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [generatingDetailed, setGeneratingDetailed] = useState(false);
  const [exportingCSV, setExportingCSV] = useState(false);

  const handleGenerateSummaryReport = async () => {
    setGeneratingSummary(true);
    try {
      await generateSummaryReport();
      toast({
        title: "Report Generated",
        description: "Summary report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGeneratingSummary(false);
    }
  };

  const handleGenerateDetailedReport = async () => {
    setGeneratingDetailed(true);
    try {
      await generateDetailedReport();
      toast({
        title: "Report Generated",
        description: "Detailed report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGeneratingDetailed(false);
    }
  };

  const handleExportCSV = async () => {
    setExportingCSV(true);
    try {
      await exportToCSV();
      toast({
        title: "Export Complete",
        description: "CSV data has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setExportingCSV(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">Reporting & Export</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Reports & Data Export</h1>
          <p className="text-muted-foreground">
            Generate comprehensive reports and export data for funding decisions
          </p>
        </div>

        {/* Feature Summary Banner */}
        <Card className="card-shadow animate-slide-up border-accent/20 bg-gradient-to-r from-accent/5 to-transparent">
          <CardContent className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-accent" />
                </div>
                <span className="text-muted-foreground">Real-time energy & funding insights</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-chart-green/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-chart-green" />
                </div>
                <span className="text-muted-foreground">Regional heatmaps & analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-chart-amber/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-chart-amber" />
                </div>
                <span className="text-muted-foreground">Auto-generated reports</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-chart-purple/10 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-chart-purple" />
                </div>
                <span className="text-muted-foreground">Smart recommendations</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Generation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Summary Report Card */}
          <Card className="card-shadow hover:card-shadow-hover transition-all duration-300 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Summary Report</CardTitle>
                    <CardDescription>Quick overview for briefings</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-0">
                  ~4 pages
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Includes:</p>
                <ul className="grid grid-cols-2 gap-2">
                  {reportFeatures.summary.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-chart-green flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                onClick={handleGenerateSummaryReport}
                disabled={generatingSummary}
                className="w-full"
              >
                {generatingSummary ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Generate Summary Report
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Detailed Report Card */}
          <Card className="card-shadow hover:card-shadow-hover transition-all duration-300 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-chart-purple/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-chart-purple" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Detailed Report</CardTitle>
                    <CardDescription>Comprehensive analysis document</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-chart-purple/10 text-chart-purple border-0">
                  ~15 pages
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Includes:</p>
                <ul className="grid grid-cols-2 gap-2">
                  {reportFeatures.detailed.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-chart-green flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                onClick={handleGenerateDetailedReport}
                disabled={generatingDetailed}
                variant="secondary"
                className="w-full"
              >
                {generatingDetailed ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Generate Detailed Report
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Export Options */}
        <Card className="card-shadow animate-slide-up" style={{ animationDelay: "300ms" }}>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-chart-green" />
              Data Export Options
            </CardTitle>
            <CardDescription>Export raw data for further analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                onClick={handleExportCSV}
                disabled={exportingCSV}
                className="h-auto py-4 flex flex-col items-center gap-2"
              >
                {exportingCSV ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <FileSpreadsheet className="w-6 h-6 text-chart-green" />
                )}
                <div className="text-center">
                  <div className="font-medium">Export to CSV</div>
                  <div className="text-xs text-muted-foreground">All datasets</div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                onClick={handleGenerateSummaryReport}
                disabled={generatingSummary}
                className="h-auto py-4 flex flex-col items-center gap-2"
              >
                {generatingSummary ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <FileText className="w-6 h-6 text-chart-red" />
                )}
                <div className="text-center">
                  <div className="font-medium">Export to PDF</div>
                  <div className="text-xs text-muted-foreground">Summary format</div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                onClick={handleGenerateDetailedReport}
                disabled={generatingDetailed}
                className="h-auto py-4 flex flex-col items-center gap-2"
              >
                {generatingDetailed ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <FileText className="w-6 h-6 text-chart-purple" />
                )}
                <div className="text-center">
                  <div className="font-medium">Export to PDF</div>
                  <div className="text-xs text-muted-foreground">Detailed format</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Report Preview Section */}
        <Card className="card-shadow animate-slide-up" style={{ animationDelay: "400ms" }}>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Report Contents Preview</CardTitle>
            <CardDescription>What you'll find in the detailed report</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-accent" />
                  <span className="font-medium text-sm">Executive Summary</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  High-level overview of Saxony's energy transition status, key achievements, and critical gaps.
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-chart-green" />
                  <span className="font-medium text-sm">KPI Overview</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  All key performance indicators with current values, trends, and comparisons to targets.
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-chart-amber" />
                  <span className="font-medium text-sm">Regional Insights</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  District-by-district analysis with funding needs, adoption rates, and priority rankings.
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-chart-red" />
                  <span className="font-medium text-sm">Funding Gap Analysis</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Detailed breakdown of funding gaps by sector, region, and target group with projections.
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-chart-purple" />
                  <span className="font-medium text-sm">Sector Insights</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Analysis of each energy category: Solar, Wind, Heat, Storage, Mobility, Hydrogen, Grid.
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-chart-teal" />
                  <span className="font-medium text-sm">Recommendations</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  AI-generated funding suggestions prioritized by impact, urgency, and feasibility.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Last Generated Info */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "500ms" }}>
          <Calendar className="w-4 h-4" />
          <span>Reports are generated with the latest available data</span>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
