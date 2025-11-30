import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryPanelProps {
  title: string;
  icon: LucideIcon;
  href: string;
  metrics: {
    label: string;
    value: string;
  }[];
  summary?: string;
  colorClass?: string;
  delay?: number;
}

export function CategoryPanel({
  title,
  icon: Icon,
  href,
  metrics,
  summary,
  colorClass = "text-accent",
  delay = 0,
}: CategoryPanelProps) {
  return (
    <Link
      to={href}
      className="group block animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="bg-card rounded-xl p-5 card-shadow transition-all duration-300 hover:shadow-lg hover:scale-[1.02] h-full">
        <div className="flex items-start gap-3 mb-4">
          <div className={cn("w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center", colorClass)}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
              {title}
            </h3>
          </div>
        </div>

        <div className="space-y-2">
          {metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{metric.label}</span>
              <span className="font-medium text-foreground">{metric.value}</span>
            </div>
          ))}
        </div>

        {summary && (
          <div className="mt-3 pt-3 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-xs text-muted-foreground">{summary}</p>
          </div>
        )}
      </div>
    </Link>
  );
}