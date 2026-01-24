import "dotenv/config";
import cron from "node-cron";
import connectDB from "../config/db.js";
import { scrapeDevfolio } from "../scrapers/devfolio.scraper.js";

// Daily at 3 AM
cron.schedule("0 3 * * *", async () => {
  try {
    console.log("Starting Devfolio scrape...");

    await connectDB(); // Ensure DB connected

    await scrapeDevfolio();
    console.log("Devfolio scrape finished");
  } catch (err) {
    console.error("Scraping failed:", err.message);
  }
});
