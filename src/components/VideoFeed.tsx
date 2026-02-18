import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import cctvImage from "@/assets/cctv-placeholder.jpg";

interface VideoFeedProps {
  cameraName: string;
  cameraId: string;
  status: "live" | "recording" | "offline";
  alertFlash: boolean;
}

export function VideoFeed({ cameraName, cameraId, status, alertFlash }: VideoFeedProps) {
  const [timestamp, setTimestamp] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTimestamp(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    live: { label: "LIVE", dotClass: "bg-primary pulse-dot" },
    recording: { label: "REC", dotClass: "bg-destructive pulse-dot" },
    offline: { label: "OFFLINE", dotClass: "bg-muted-foreground" },
  };

  const s = statusConfig[status];

  return (
    <div
      className={cn(
        "glass-card overflow-hidden relative transition-all duration-300",
        alertFlash && "alert-flash border-destructive/50"
      )}
    >
      {/* Video Area */}
      <div className="relative aspect-video bg-background">
        <img
          src={cctvImage}
          alt="CCTV Feed"
          className="w-full h-full object-cover opacity-80"
        />

        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="w-full h-px bg-primary/20 scan-line" />
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        {/* Status badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-background/70 backdrop-blur-sm px-2.5 py-1 rounded-md">
          <span className={cn("w-2 h-2 rounded-full", s.dotClass)} />
          <span className="text-xs font-mono font-medium text-foreground">{s.label}</span>
        </div>

        {/* Timestamp */}
        <div className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm px-2.5 py-1 rounded-md">
          <span className="text-xs font-mono text-foreground">
            {timestamp.toLocaleTimeString("en-US", { hour12: false })}
          </span>
        </div>

        {/* Camera info */}
        <div className="absolute bottom-3 left-3">
          <p className="text-xs font-mono text-muted-foreground">{cameraId}</p>
          <p className="text-sm font-medium text-foreground">{cameraName}</p>
        </div>

        {/* Alert flash overlay */}
        {alertFlash && (
          <div className="absolute inset-0 bg-destructive/10 animate-pulse pointer-events-none" />
        )}
      </div>
    </div>
  );
}
