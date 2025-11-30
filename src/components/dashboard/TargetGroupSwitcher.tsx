import { User, Building2, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

export type TargetGroup = "individuals" | "businesses" | "authorities";

interface TargetGroupSwitcherProps {
  value: TargetGroup;
  onChange: (value: TargetGroup) => void;
}

const groups = [
  { id: "individuals" as TargetGroup, label: "Individuals", icon: User },
  { id: "businesses" as TargetGroup, label: "Businesses", icon: Building2 },
  { id: "authorities" as TargetGroup, label: "Local Authorities", icon: Landmark },
];

export function TargetGroupSwitcher({ value, onChange }: TargetGroupSwitcherProps) {
  return (
    <div className="bg-card rounded-xl p-1.5 card-shadow inline-flex gap-1">
      {groups.map((group) => {
        const isActive = value === group.id;
        return (
          <button
            key={group.id}
            onClick={() => onChange(group.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <group.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{group.label}</span>
          </button>
        );
      })}
    </div>
  );
}