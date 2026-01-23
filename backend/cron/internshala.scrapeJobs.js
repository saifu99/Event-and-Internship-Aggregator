import cron from "node-cron";
import { scrapeInternshala } from "../scrapers/internshala.scraper.js";

// Schedule the scraper: every day at 8 AM IST
cron.schedule("0 8 * * *", async () => {
  console.log("Running Internshala scraper...");
  await scrapeInternshala();
}, {
  timezone: "Asia/Kolkata"
});
