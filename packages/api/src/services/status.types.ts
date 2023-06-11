export type ServiceStatus = {
  id: number;
  status: string;
};

export type ServicePlatform = {
  id: number;
  service_id: number;
  name: string;
  service_status_id: number;
  priority: number;
  updated: string;
  service_status: ServiceStatus;
};

export type Status = {
  id: number;
  name: string;
  tag: string;
  category_id: number | null;
  sandbox_category_id: number | null;
  alert_status: number;
  priority: number;
  updated: string;
  services_platforms: ServicePlatform[];
  message: string;
  status: number;
  recent_update: string;
  hash: string;
  status_tag: string;
};

export type Service = Status;

export type RawStatus = {
  services: Service[];
  statuses: Status[];
  updated: string;
};

export type StatusType = "UP" | "LIMITED" | "DOWN";
