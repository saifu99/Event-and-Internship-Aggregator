import cron from "node-cron";
import { scrapeInternshala } from "./scrapers/internshala.scraper.js";

cron.schedule("0 2 * * *", () => {
  console.log("Running Internshala scraper at 2 AM daily");
  scrapeInternshala();
});
