//import { type Prisma } from "@packages/db";
import { type RawStatus } from "./status.types";

//const isProd = process.env.NODE_ENV === "production";
//const CACHE_KEY_PREFIX = "status:";

const ROCKSTAR_STATUS_API_ENDPOINT =
  "https://support.rockstargames.com/services/status.json";

const ENABLED_SERVICES = [
  "Red Dead Online",
  "Grand Theft Auto Online",
  "Social Club",
  "Rockstar Games Launcher",
];

class StatusService {
  // implement caching here (5 min?)
  async fetchStatus() {
    try {
      const r = await fetch(ROCKSTAR_STATUS_API_ENDPOINT);
      const json = await r.json();

      return json as RawStatus;
    } catch (e) {
      throw new Error("Failed to fetch status from Rockstar API");
    }
  }

  parseJSON(input: RawStatus): Record<string, Record<string, string>> {
    const result: Record<string, Record<string, string>> = {};

    input.statuses.forEach((status) => {
      const name = status.name;
      const platforms: Record<string, string> = {};

      status.services_platforms.forEach((platform) => {
        platforms[platform.name] = platform.service_status.status;
      });

      result[name] = platforms;
    });

    return result;
  }

  filterStatus(input: Record<string, Record<string, string>>) {
    return Object.fromEntries(
      Object.entries(input).filter(([key]) => ENABLED_SERVICES.includes(key)),
    );
  }
}

export const statusService = new StatusService();
