import { statusService } from "../services/status.service";
import { createRouter, publicProcedure } from "../trpc";

export const statusRouter = createRouter({
  getStatus: publicProcedure.query(async () => {
    const rawStatus = await statusService.fetchStatus();
    const status = statusService.parseJSON(rawStatus);
    const filteredStatus = statusService.filterStatus(status);

    // await new Promise((r) => setTimeout(r, 300)); // artificial delay for simulating loading

    return filteredStatus;
  }),
});
