import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  className?: string;
  delay?: number;
}

export function KPICard({
  title,
  value,
  unit,
  change,
  changeLabel,
  icon,
  className,
  delay = 0,
}: KPICardProps) {
  const getTrendIcon = () => {
    if (change === undefined) return null;
    if (change > 0) return <TrendingUp className="w-3 h-3" />;
    if (change < 0) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getTrendColor = () => {
    if (change === undefined) return "";
    if (change > 0) return "text-chart-green";
    if (change < 0) return "text-chart-red";
    return "text-muted-foreground";
  };

  return (
    <Card
      className={cn(
        "card-shadow hover:card-shadow-hover transition-all duration-300 animate-slide-up",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{value}</span>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
            {change !== undefined && (
              <div className={cn("flex items-center gap-1 mt-2 text-xs font-medium", getTrendColor())}>
                {getTrendIcon()}
                <span>{change > 0 ? "+" : ""}{change}%</span>
                {changeLabel && <span className="text-muted-foreground ml-1">{changeLabel}</span>}
              </div>
            )}
          </div>
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
