import { useState, useCallback } from "react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { StatCards } from "@/components/StatCards";
import { VideoFeed } from "@/components/VideoFeed";
import { AlertPanel } from "@/components/AlertPanel";
import { CAMERAS, INITIAL_ALERTS, ALERT_TYPES } from "@/data/dashboard-data";
import type { Alert } from "@/types/dashboard";
import { Zap } from "lucide-react";

const Dashboard = () => {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [alertFlash, setAlertFlash] = useState(false);
  const [intrusionsToday, setIntrusionsToday] = useState(INITIAL_ALERTS.length);

  const activeCameras = CAMERAS.filter((c) => c.status !== "offline").length;

  const simulateIntrusion = useCallback(() => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour12: false });
    const cam = CAMERAS[Math.floor(Math.random() * CAMERAS.length)];
    const type = ALERT_TYPES[Math.floor(Math.random() * ALERT_TYPES.length)];
    const severities: Array<"low" | "medium" | "critical"> = ["low", "medium", "critical"];
    const severity = severities[Math.floor(Math.random() * severities.length)];

    const newAlert: Alert = {
      id: `ALT-${Date.now()}`,
      time,
      cameraId: cam.id,
      type,
      severity,
    };

    setAlerts((prev) => [newAlert, ...prev]);
    setIntrusionsToday((prev) => prev + 1);
    setAlertFlash(true);
    setTimeout(() => setAlertFlash(false), 1500);
  }, []);

  const lastDetection = alerts.length > 0 ? alerts[0].time : "--:--:--";
  const hasCritical = alerts.some((a) => a.severity === "critical");

  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />

      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-border/30">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Surveillance Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">
              Restricted Area Intrusion Detection System
            </p>
          </div>
          <button
            onClick={simulateIntrusion}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm font-medium hover:bg-destructive/20 hover:border-destructive/50 transition-all duration-200 active:scale-95"
          >
            <Zap className="w-4 h-4" />
            Simulate Intrusion
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Stat Cards */}
          <StatCards
            activeCameras={activeCameras}
            totalCameras={CAMERAS.length}
            intrusionsToday={intrusionsToday}
            systemSecure={!hasCritical}
            lastDetection={lastDetection}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Feed - 2 cols */}
            <div className="lg:col-span-2">
              <VideoFeed
                cameraName="Server Room"
                cameraId="CAM-01"
                status="live"
                alertFlash={alertFlash}
              />
            </div>

            {/* Alert Panel - 1 col */}
            <div className="lg:col-span-1">
              <AlertPanel alerts={alerts} />
            </div>
          </div>

          {/* Secondary Cameras Grid */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Camera Grid
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {CAMERAS.slice(1).map((cam) => (
                <div
                  key={cam.id}
                  className="glass-card-hover p-3 flex items-center gap-3"
                >
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      cam.status === "live"
                        ? "bg-primary pulse-dot"
                        : cam.status === "recording"
                        ? "bg-destructive pulse-dot"
                        : "bg-muted-foreground"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-muted-foreground">
                      {cam.id}
                    </p>
                    <p className="text-sm text-foreground truncate">{cam.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
