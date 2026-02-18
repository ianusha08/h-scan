import { Camera, ShieldCheck, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardsProps {
  activeCameras: number;
  totalCameras: number;
  intrusionsToday: number;
  systemSecure: boolean;
  lastDetection: string;
}

const cards = [
  {
    key: "cameras",
    label: "Active Cameras",
    icon: Camera,
    getValue: (p: StatCardsProps) => `${p.activeCameras}/${p.totalCameras}`,
    color: "text-primary",
    glowClass: "",
  },
  {
    key: "intrusions",
    label: "Intrusions Today",
    icon: AlertTriangle,
    getValue: (p: StatCardsProps) => p.intrusionsToday.toString(),
    color: "text-destructive",
    glowClass: "",
  },
  {
    key: "status",
    label: "System Status",
    icon: ShieldCheck,
    getValue: (p: StatCardsProps) => (p.systemSecure ? "Secure" : "Breach Detected"),
    color: "",
    dynamic: true,
  },
  {
    key: "lastDetection",
    label: "Last Detection",
    icon: Clock,
    getValue: (p: StatCardsProps) => p.lastDetection,
    color: "text-warning",
    glowClass: "",
  },
];

export function StatCards(props: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const dynamicColor = card.dynamic
          ? props.systemSecure
            ? "text-primary"
            : "text-destructive"
          : card.color;

        return (
          <div
            key={card.key}
            className="glass-card-hover p-4 flex items-center gap-4"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                dynamicColor === "text-primary" && "bg-primary/10",
                dynamicColor === "text-destructive" && "bg-destructive/10",
                dynamicColor === "text-warning" && "bg-warning/10"
              )}
            >
              <card.icon className={cn("w-5 h-5", dynamicColor)} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {card.label}
              </p>
              <p className={cn("text-xl font-semibold font-mono", dynamicColor)}>
                {card.getValue(props)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
