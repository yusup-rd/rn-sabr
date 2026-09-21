export type HeadingPermissionStatus = "checking" | "granted" | "denied";

export interface DeviceHeading {
  heading: number | null;
  accuracy: number;
  hasSensor: boolean;
  permissionStatus: HeadingPermissionStatus;
}

export type CompassLabel = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
