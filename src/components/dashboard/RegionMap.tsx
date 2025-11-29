import { cn } from "@/lib/utils";

interface RegionData {
  name: string;
  value: number;
  path: string;
}

interface RegionMapProps {
  data: RegionData[];
  className?: string;
}

// Simplified Sachsen regions SVG paths
const sachsenRegions: RegionData[] = [
  { name: "Leipzig", value: 85, path: "M60,30 L120,30 L130,60 L100,90 L50,80 L40,50 Z" },
  { name: "Dresden", value: 92, path: "M170,40 L230,35 L240,80 L220,120 L160,110 L150,70 Z" },
  { name: "Chemnitz", value: 78, path: "M80,100 L140,95 L150,140 L130,180 L70,175 L55,130 Z" },
  { name: "Görlitz", value: 65, path: "M240,50 L290,45 L295,100 L275,145 L235,140 L225,90 Z" },
  { name: "Bautzen", value: 72, path: "M180,120 L235,115 L245,155 L225,195 L175,190 L160,150 Z" },
  { name: "Meißen", value: 88, path: "M130,70 L170,65 L175,100 L155,130 L120,125 L110,95 Z" },
  { name: "Zwickau", value: 70, path: "M40,140 L80,135 L90,175 L70,210 L30,205 L20,170 Z" },
  { name: "Erzgebirgskreis", value: 55, path: "M90,180 L150,175 L165,220 L140,260 L80,255 L60,215 Z" },
  { name: "Vogtlandkreis", value: 62, path: "M10,200 L50,195 L60,240 L40,280 L5,275 L0,235 Z" },
  { name: "Mittelsachsen", value: 75, path: "M100,130 L155,125 L165,170 L145,200 L95,195 L80,160 Z" },
];

const getColorIntensity = (value: number): string => {
  if (value >= 90) return "fill-accent";
  if (value >= 80) return "fill-accent/80";
  if (value >= 70) return "fill-accent/60";
  if (value >= 60) return "fill-accent/40";
  return "fill-accent/20";
};

export function RegionMap({ data = sachsenRegions, className }: RegionMapProps) {
  const displayData = data.length > 0 ? data : sachsenRegions;

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        viewBox="0 0 300 290"
        className="w-full h-auto"
        style={{ maxHeight: "300px" }}
      >
        {displayData.map((region) => (
          <g key={region.name} className="group cursor-pointer">
            <path
              d={region.path}
              className={cn(
                getColorIntensity(region.value),
                "stroke-card stroke-2 transition-all duration-200 hover:stroke-foreground hover:stroke-[3px]"
              )}
            />
            <title>{`${region.name}: ${region.value}%`}</title>
          </g>
        ))}
      </svg>
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-3 h-3 rounded bg-accent/20" />
          <span>Low</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-3 h-3 rounded bg-accent/60" />
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-3 h-3 rounded bg-accent" />
          <span>High</span>
        </div>
      </div>
    </div>
  );
}
