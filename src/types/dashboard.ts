export type Severity = "low" | "medium" | "critical";
export type CameraStatus = "live" | "recording" | "offline";

export interface Alert {
  id: string;
  time: string;
  cameraId: string;
  type: string;
  severity: Severity;
}

export interface Camera {
  id: string;
  name: string;
  status: CameraStatus;
}
