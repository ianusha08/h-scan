import { AlertTriangle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Alert, Severity } from "@/types/dashboard";

interface AlertPanelProps {
  alerts: Alert[];
}

const severityConfig: Record<Severity, { label: string; className: string }> = {
  critical: {
    label: "Critical",
    className: "bg-destructive/20 text-destructive border-destructive/30",
  },
  medium: {
    label: "Medium",
    className: "bg-warning/20 text-warning border-warning/30",
  },
  low: {
    label: "Low",
    className: "bg-primary/20 text-primary border-primary/30",
  },
};

export function AlertPanel({ alerts }: AlertPanelProps) {
  return (
    <div className="glass-card flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          <h2 className="text-sm font-semibold text-foreground">Intrusion Alerts</h2>
        </div>
        <span className="text-xs font-mono bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">
          {alerts.length}
        </span>
      </div>

      {/* Alert List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 max-h-[500px]">
        {alerts.map((alert, index) => {
          const sev = severityConfig[alert.severity];
          return (
            <div
              key={alert.id}
              className={cn(
                "p-3 rounded-md border transition-all duration-200 hover:border-foreground/10 cursor-pointer",
                alert.severity === "critical"
                  ? "bg-destructive/5 border-destructive/20"
                  : "bg-card/40 border-border/20",
                index === 0 && "animate-slide-in-alert"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {alert.type}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {alert.time}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {alert.cameraId}
                    </span>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0",
                    sev.className
                  )}
                >
                  {sev.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
