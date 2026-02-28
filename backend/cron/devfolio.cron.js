import "dotenv/config";
import cron from "node-cron";
import connectDB from "../config/db.js";
import { scrapeDevfolio } from "../scrapers/devfolio.scraper.js";

//DAILY AT 3 AM
cron.schedule("0 3 * * *", async () => {
  try {
    console.log("Starting Devfolio scrape...");

    await connectDB(); //ENSURE DB CONNECTED 

    await scrapeDevfolio();
    console.log("Devfolio scrape finished");
  } catch (err) {
    console.error("Scraping failed:", err.message);
  }
});
