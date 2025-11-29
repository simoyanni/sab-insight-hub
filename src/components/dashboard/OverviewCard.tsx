import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface OverviewCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  className?: string;
  delay?: number;
}

export function OverviewCard({
  title,
  description,
  icon,
  href,
  className,
  delay = 0,
}: OverviewCardProps) {
  return (
    <Link to={href}>
      <Card
        className={cn(
          "card-shadow hover:card-shadow-hover transition-all duration-300 cursor-pointer group animate-slide-up border-transparent hover:border-accent/30",
          className
        )}
        style={{ animationDelay: `${delay}ms` }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              {icon}
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
