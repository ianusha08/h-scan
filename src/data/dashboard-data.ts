import { Alert } from "@/types/dashboard";

export const CAMERAS = [
  { id: "CAM-01", name: "Server Room", status: "live" as const },
  { id: "CAM-02", name: "Main Entrance", status: "recording" as const },
  { id: "CAM-03", name: "Parking Lot B", status: "live" as const },
  { id: "CAM-04", name: "Control Room", status: "live" as const },
  { id: "CAM-05", name: "East Corridor", status: "offline" as const },
  { id: "CAM-06", name: "Warehouse", status: "recording" as const },
];

export const INITIAL_ALERTS: Alert[] = [
  {
    id: "ALT-001",
    time: "14:32:07",
    cameraId: "CAM-03",
    type: "Unauthorized Access Detected",
    severity: "critical",
  },
  {
    id: "ALT-002",
    time: "13:45:22",
    cameraId: "CAM-01",
    type: "Motion Detected in Restricted Zone",
    severity: "medium",
  },
  {
    id: "ALT-003",
    time: "12:18:55",
    cameraId: "CAM-02",
    type: "Unidentified Personnel",
    severity: "low",
  },
  {
    id: "ALT-004",
    time: "11:02:33",
    cameraId: "CAM-04",
    type: "Perimeter Breach Attempt",
    severity: "critical",
  },
  {
    id: "ALT-005",
    time: "09:47:11",
    cameraId: "CAM-06",
    type: "Tailgating Detected",
    severity: "medium",
  },
];

export const ALERT_TYPES = [
  "Unauthorized Access Detected",
  "Motion Detected in Restricted Zone",
  "Perimeter Breach Attempt",
  "Unidentified Personnel",
  "Tailgating Detected",
  "Forced Entry Attempt",
  "Suspicious Activity Detected",
];
