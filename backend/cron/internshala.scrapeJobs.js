import cron from "node-cron";
import { scrapeInternshala } from "../scrapers/internshala.scraper.js";

//Daily at 2 AM IST
cron.schedule(
  "0 2 * * *",
  async () => {
    try {
      console.log("Starting Internshala scrape...");
      await scrapeInternshala(); // will process all new internships on the page
      console.log("Internshala scrape finished");
    } catch (err) {
      console.error("Internshala scraping failed:", err.message);
    }
  },
  { timezone: "Asia/Kolkata" }
);
