import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Sample data for reports
const kpiData = [
  { name: "PV Installations", value: "127,450", unit: "systems", change: "+12.3%" },
  { name: "Renewable Share", value: "34.2", unit: "%", change: "+2.1%" },
  { name: "CO₂ Emissions", value: "28.4", unit: "Mt/year", change: "-5.2%" },
  { name: "Heat Pump Adoption", value: "45,200", unit: "units", change: "+18.7%" },
  { name: "EV Registrations", value: "89,300", unit: "vehicles", change: "+24.5%" },
  { name: "Grid Capacity", value: "12.4", unit: "GW", change: "+3.1%" },
];

const regionalData = [
  { region: "Dresden", score: 78, fundingNeed: "€45M", priority: "Medium" },
  { region: "Leipzig", score: 82, fundingNeed: "€38M", priority: "Medium" },
  { region: "Chemnitz", score: 65, fundingNeed: "€52M", priority: "High" },
  { region: "Görlitz", score: 48, fundingNeed: "€78M", priority: "Critical" },
  { region: "Zwickau", score: 71, fundingNeed: "€41M", priority: "Medium" },
  { region: "Bautzen", score: 55, fundingNeed: "€65M", priority: "High" },
  { region: "Meißen", score: 69, fundingNeed: "€44M", priority: "Medium" },
  { region: "Erzgebirgskreis", score: 52, fundingNeed: "€71M", priority: "High" },
  { region: "Vogtlandkreis", score: 58, fundingNeed: "€58M", priority: "High" },
  { region: "Mittelsachsen", score: 63, fundingNeed: "€49M", priority: "High" },
];

const sectorData = [
  { sector: "Solar", installed: "4.2 GW", potential: "8.5 GW", gap: "4.3 GW", progress: "49%" },
  { sector: "Wind", installed: "2.8 GW", potential: "5.2 GW", gap: "2.4 GW", progress: "54%" },
  { sector: "Heat Pumps", installed: "45,200", potential: "180,000", gap: "134,800", progress: "25%" },
  { sector: "Storage", installed: "890 MWh", potential: "3,500 MWh", gap: "2,610 MWh", progress: "25%" },
  { sector: "E-Mobility", installed: "2,400", potential: "15,000", gap: "12,600", progress: "16%" },
  { sector: "Hydrogen", installed: "0.2 GW", potential: "1.5 GW", gap: "1.3 GW", progress: "13%" },
];

const recommendations = [
  {
    title: "Heat Pump Incentive Program for Rural Households",
    region: "Erzgebirgskreis, Vogtlandkreis",
    priority: "High",
    impact: "€45M potential savings",
  },
  {
    title: "SME Solar Rooftop Initiative",
    region: "Leipzig, Dresden Industrial Zones",
    priority: "High",
    impact: "800 MW potential capacity",
  },
  {
    title: "Grid Infrastructure Upgrade - Eastern Corridor",
    region: "Görlitz, Bautzen",
    priority: "Critical",
    impact: "2,000 MW unlocked capacity",
  },
  {
    title: "EV Charging Network Expansion - Rural Areas",
    region: "Mittelsachsen, Nordsachsen",
    priority: "Medium",
    impact: "500 new charging points",
  },
  {
    title: "Community Battery Storage Program",
    region: "All Districts",
    priority: "Medium",
    impact: "300 MWh community storage",
  },
];

const formatDate = () => {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const generateSummaryReport = async (): Promise<void> => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFillColor(13, 27, 42); // Navy dark
  doc.rect(0, 0, pageWidth, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("SAB Energy Insights", 20, 22);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Summary Report", 20, 32);
  
  doc.setFontSize(10);
  doc.text(formatDate(), pageWidth - 20, 32, { align: "right" });
  
  // Executive Summary
  doc.setTextColor(13, 27, 42);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Executive Summary", 20, 55);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  const summaryText = "Saxony's energy transition is progressing with renewable energy share reaching 34.2%, up 2.1% from last year. Key challenges remain in eastern districts (Görlitz, Bautzen) where grid constraints limit renewable expansion. Heat pump adoption shows strongest growth (+18.7%) while hydrogen infrastructure remains underdeveloped (13% of target).";
  const splitSummary = doc.splitTextToSize(summaryText, pageWidth - 40);
  doc.text(splitSummary, 20, 65);
  
  // KPI Overview
  doc.setTextColor(13, 27, 42);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Key Performance Indicators", 20, 95);
  
  autoTable(doc, {
    startY: 100,
    head: [["Indicator", "Value", "Unit", "Change"]],
    body: kpiData.map(kpi => [kpi.name, kpi.value, kpi.unit, kpi.change]),
    theme: "striped",
    headStyles: { fillColor: [13, 27, 42] },
    margin: { left: 20, right: 20 },
  });
  
  // Key Insights
  const tableEndY = (doc as any).lastAutoTable.finalY + 15;
  doc.setTextColor(13, 27, 42);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Key Insights", 20, tableEndY);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  
  const insights = [
    "• Görlitz district requires critical infrastructure investment - highest funding need at €78M",
    "• Heat pump potential in rural areas remains 75% untapped - prime opportunity for subsidies",
    "• Grid capacity constraints blocking 40% of approved renewable projects in eastern regions",
    "• SME solar adoption lagging - 72% cite upfront costs as main barrier",
  ];
  
  insights.forEach((insight, index) => {
    doc.text(insight, 20, tableEndY + 10 + (index * 7));
  });
  
  // Top Recommendations
  const insightsEndY = tableEndY + 10 + (insights.length * 7) + 15;
  doc.setTextColor(13, 27, 42);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Top Recommendations", 20, insightsEndY);
  
  autoTable(doc, {
    startY: insightsEndY + 5,
    head: [["Priority", "Recommendation", "Region", "Impact"]],
    body: recommendations.slice(0, 3).map(rec => [rec.priority, rec.title, rec.region, rec.impact]),
    theme: "striped",
    headStyles: { fillColor: [13, 27, 42] },
    margin: { left: 20, right: 20 },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 70 },
      2: { cellWidth: 45 },
      3: { cellWidth: 35 },
    },
  });
  
  // Footer
  const pageCount = doc.internal.pages.length - 1;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`SAB Energy Insights Dashboard | Generated on ${formatDate()} | Page 1 of ${pageCount}`, pageWidth / 2, 285, { align: "center" });
  
  doc.save("SAB_Energy_Summary_Report.pdf");
};

export const generateDetailedReport = async (): Promise<void> => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Cover Page
  doc.setFillColor(13, 27, 42);
  doc.rect(0, 0, pageWidth, 297, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text("SAB Energy Insights", pageWidth / 2, 100, { align: "center" });
  
  doc.setFontSize(18);
  doc.setFont("helvetica", "normal");
  doc.text("Comprehensive Analysis Report", pageWidth / 2, 115, { align: "center" });
  
  doc.setFontSize(14);
  doc.text("Saxony Energy Transition Dashboard", pageWidth / 2, 135, { align: "center" });
  
  doc.setFontSize(12);
  doc.text(formatDate(), pageWidth / 2, 200, { align: "center" });
  
  doc.setFontSize(10);
  doc.text("Prepared by SAB Energy Analytics Team", pageWidth / 2, 250, { align: "center" });
  
  // Page 2: Executive Summary
  doc.addPage();
  addPageHeader(doc, "Executive Summary");
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  
  const execSummary = `This report provides a comprehensive analysis of Saxony's energy transition progress, funding gaps, and strategic recommendations for the SAB funding program.

Key Findings:
• Saxony has achieved 34.2% renewable energy share, with steady year-over-year growth
• Eastern districts (Görlitz, Bautzen) face critical infrastructure challenges
• Heat pump adoption shows strongest momentum with 18.7% annual growth
• Solar and wind capacity are at approximately 50% of 2030 targets
• Grid constraints are the primary bottleneck for renewable expansion

The analysis identifies €541M in total funding needs across all districts, with priority investments recommended in grid infrastructure, heat pump subsidies, and SME solar programs.`;
  
  const splitExec = doc.splitTextToSize(execSummary, pageWidth - 40);
  doc.text(splitExec, 20, 55);
  
  addPageFooter(doc, 2);
  
  // Page 3: KPI Overview
  doc.addPage();
  addPageHeader(doc, "KPI Overview");
  
  autoTable(doc, {
    startY: 50,
    head: [["Indicator", "Current Value", "Unit", "YoY Change", "Status"]],
    body: kpiData.map(kpi => {
      const change = parseFloat(kpi.change);
      const status = change > 0 ? "↑ Improving" : "↓ Declining";
      return [kpi.name, kpi.value, kpi.unit, kpi.change, status];
    }),
    theme: "striped",
    headStyles: { fillColor: [13, 27, 42] },
    margin: { left: 20, right: 20 },
  });
  
  addPageFooter(doc, 3);
  
  // Page 4: Regional Insights
  doc.addPage();
  addPageHeader(doc, "Regional Insights Map");
  
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text("District-level analysis showing energy transition scores and funding requirements:", 20, 50);
  
  autoTable(doc, {
    startY: 58,
    head: [["District", "Transition Score", "Funding Need", "Priority Level"]],
    body: regionalData.map(r => [r.region, `${r.score}/100`, r.fundingNeed, r.priority]),
    theme: "striped",
    headStyles: { fillColor: [13, 27, 42] },
    margin: { left: 20, right: 20 },
    didParseCell: function(data) {
      if (data.column.index === 3 && data.section === "body") {
        const priority = data.cell.raw as string;
        if (priority === "Critical") {
          data.cell.styles.textColor = [220, 38, 38];
          data.cell.styles.fontStyle = "bold";
        } else if (priority === "High") {
          data.cell.styles.textColor = [245, 158, 11];
        }
      }
    },
  });
  
  addPageFooter(doc, 4);
  
  // Page 5: Funding Gap Analysis
  doc.addPage();
  addPageHeader(doc, "Funding Gap Analysis");
  
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text("Sector-by-sector analysis of installed capacity vs. potential and funding gaps:", 20, 50);
  
  autoTable(doc, {
    startY: 58,
    head: [["Sector", "Installed", "Potential", "Gap", "Progress"]],
    body: sectorData.map(s => [s.sector, s.installed, s.potential, s.gap, s.progress]),
    theme: "striped",
    headStyles: { fillColor: [13, 27, 42] },
    margin: { left: 20, right: 20 },
  });
  
  const gapTableY = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(13, 27, 42);
  doc.text("Analysis Summary:", 20, gapTableY);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const gapAnalysis = `• Solar sector is closest to target at 49% completion, requiring €280M additional investment
• Hydrogen infrastructure is furthest behind at 13%, representing the largest growth opportunity
• Heat pump adoption rate suggests potential for accelerated deployment with proper incentives
• E-Mobility charging infrastructure needs 6x expansion to meet demand projections`;
  
  const splitGap = doc.splitTextToSize(gapAnalysis, pageWidth - 40);
  doc.text(splitGap, 20, gapTableY + 8);
  
  addPageFooter(doc, 5);
  
  // Page 6: Sector Insights
  doc.addPage();
  addPageHeader(doc, "Sector Insights");
  
  const sectors = [
    { name: "Solar", insight: "Strong residential adoption but commercial rooftop utilization at only 45%. Key barrier: SME financing." },
    { name: "Wind", insight: "Onshore capacity growing steadily. Permitting delays average 18 months. Community acceptance improving." },
    { name: "Heat", insight: "Heat pump adoption accelerating in new builds (78%). Retrofit market underpenetrated in pre-1990 housing." },
    { name: "Storage", insight: "Battery costs declining 15% annually. Community storage models showing promising economics." },
    { name: "Mobility", insight: "Urban EV adoption strong. Rural charging infrastructure gap causing 35% lower adoption rates." },
    { name: "Hydrogen", insight: "Industrial demand emerging. Infrastructure investment critical for regional competitiveness." },
    { name: "Grid", insight: "Eastern corridor at 85% capacity. €200M upgrade needed to unlock 2GW renewable capacity." },
  ];
  
  let yPos = 50;
  sectors.forEach((sector, index) => {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(13, 27, 42);
    doc.text(`${sector.name}:`, 20, yPos);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(sector.insight, 60, yPos);
    yPos += 12;
  });
  
  addPageFooter(doc, 6);
  
  // Page 7: Recommendations
  doc.addPage();
  addPageHeader(doc, "Recommendations");
  
  autoTable(doc, {
    startY: 50,
    head: [["#", "Priority", "Recommendation", "Target Region", "Expected Impact"]],
    body: recommendations.map((rec, index) => [
      (index + 1).toString(),
      rec.priority,
      rec.title,
      rec.region,
      rec.impact,
    ]),
    theme: "striped",
    headStyles: { fillColor: [13, 27, 42] },
    margin: { left: 20, right: 20 },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 22 },
      2: { cellWidth: 55 },
      3: { cellWidth: 45 },
      4: { cellWidth: 40 },
    },
    didParseCell: function(data) {
      if (data.column.index === 1 && data.section === "body") {
        const priority = data.cell.raw as string;
        if (priority === "Critical") {
          data.cell.styles.textColor = [220, 38, 38];
          data.cell.styles.fontStyle = "bold";
        } else if (priority === "High") {
          data.cell.styles.textColor = [245, 158, 11];
        }
      }
    },
  });
  
  addPageFooter(doc, 7);
  
  // Page 8: Data Tables
  doc.addPage();
  addPageHeader(doc, "Appendix: Data Tables");
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(13, 27, 42);
  doc.text("Regional Data Summary", 20, 50);
  
  autoTable(doc, {
    startY: 55,
    head: [["District", "Score", "Funding Need", "Priority", "Population", "Area (km²)"]],
    body: regionalData.map(r => [
      r.region,
      r.score.toString(),
      r.fundingNeed,
      r.priority,
      Math.floor(Math.random() * 300000 + 100000).toLocaleString(),
      Math.floor(Math.random() * 2000 + 500).toLocaleString(),
    ]),
    theme: "grid",
    headStyles: { fillColor: [13, 27, 42], fontSize: 8 },
    bodyStyles: { fontSize: 8 },
    margin: { left: 20, right: 20 },
  });
  
  addPageFooter(doc, 8);
  
  doc.save("SAB_Energy_Detailed_Report.pdf");
};

const addPageHeader = (doc: jsPDF, title: string) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  
  doc.setFillColor(13, 27, 42);
  doc.rect(0, 0, pageWidth, 35, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(title, 20, 23);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("SAB Energy Insights", pageWidth - 20, 23, { align: "right" });
};

const addPageFooter = (doc: jsPDF, pageNum: number) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`SAB Energy Insights Dashboard | ${formatDate()} | Page ${pageNum}`, pageWidth / 2, 285, { align: "center" });
};

export const exportToCSV = async (): Promise<void> => {
  // KPI Data CSV
  const kpiCSV = [
    ["Indicator", "Value", "Unit", "YoY Change"],
    ...kpiData.map(kpi => [kpi.name, kpi.value, kpi.unit, kpi.change]),
  ].map(row => row.join(",")).join("\n");
  
  // Regional Data CSV
  const regionalCSV = [
    ["District", "Transition Score", "Funding Need", "Priority Level"],
    ...regionalData.map(r => [r.region, r.score.toString(), r.fundingNeed, r.priority]),
  ].map(row => row.join(",")).join("\n");
  
  // Sector Data CSV
  const sectorCSV = [
    ["Sector", "Installed Capacity", "Potential", "Gap", "Progress"],
    ...sectorData.map(s => [s.sector, s.installed, s.potential, s.gap, s.progress]),
  ].map(row => row.join(",")).join("\n");
  
  // Recommendations CSV
  const recsCSV = [
    ["Title", "Region", "Priority", "Expected Impact"],
    ...recommendations.map(r => [r.title, r.region, r.priority, r.impact]),
  ].map(row => row.join(",")).join("\n");
  
  // Combine all data
  const fullCSV = `SAB Energy Insights Data Export
Generated: ${formatDate()}

=== KEY PERFORMANCE INDICATORS ===
${kpiCSV}

=== REGIONAL DATA ===
${regionalCSV}

=== SECTOR ANALYSIS ===
${sectorCSV}

=== RECOMMENDATIONS ===
${recsCSV}`;
  
  // Create and download file
  const blob = new Blob([fullCSV], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `SAB_Energy_Data_${formatDate().replace(/\s/g, "_")}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
