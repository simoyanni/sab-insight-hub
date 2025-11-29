import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Lightbulb, AlertTriangle, CheckCircle, Info } from "lucide-react";

type InsightType = "info" | "warning" | "success" | "suggestion";

interface InsightCardProps {
  type: InsightType;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

const iconMap = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  suggestion: Lightbulb,
};

const colorMap = {
  info: "bg-accent/10 text-accent border-accent/20",
  warning: "bg-chart-amber/10 text-chart-amber border-chart-amber/20",
  success: "bg-chart-green/10 text-chart-green border-chart-green/20",
  suggestion: "bg-chart-purple/10 text-chart-purple border-chart-purple/20",
};

export function InsightCard({
  type,
  title,
  description,
  className,
  delay = 0,
}: InsightCardProps) {
  const Icon = iconMap[type];

  return (
    <Card
      className={cn(
        "border animate-slide-up",
        colorMap[type],
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm mb-1">{title}</h4>
            <p className="text-sm opacity-90 leading-relaxed">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
