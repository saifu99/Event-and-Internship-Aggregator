import cron from "node-cron";
import { scrapeDevfolio } from "../scrapers/devfolio.scraper.js";

// Run once daily at 3 AM
cron.schedule("0 3 * * *", async () => {
  try {
    console.log("Starting Devfolio scrape...");
    await scrapeDevfolio();
    console.log("Devfolio scrape finished");
  } catch (err) {
    console.error("Scraping failed:", err.message);
  }
});
