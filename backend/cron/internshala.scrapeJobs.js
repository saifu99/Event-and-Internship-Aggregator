import cron from "node-cron";
import { scrapeInternshala } from "../scrapers/internshala.scraper.js";

// run once on startup (TEMPORARY)
scrapeInternshala();

cron.schedule(
  "0 2 * * *",
  async () => {
    await scrapeInternshala();
  },
  { timezone: "Asia/Kolkata" }
);

