import cron from "node-cron";
import { scrapeInternshala } from "../scrapers/internshala.scraper.js";

//DAILY AT 2 AM IST
cron.schedule(
  "0 2 * * *",
  async () => {
    try {
      console.log("Starting Internshala scrape...");
      await scrapeInternshala(); //WILL PROCESS ALL NEW INTERNSHIPS ON THE PAGE 
      console.log("Internshala scrape finished");
    } catch (err) {
      console.error("Internshala scraping failed:", err.message);
    }
  },
  { timezone: "Asia/Kolkata" }
);
