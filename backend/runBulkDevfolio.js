import "dotenv/config";
import connectDB from "./config/db.js";
import { scrapeDevfolio } from "./scrapers/devfolio.scraper.js";

const run = async () => {
  await connectDB();

  //USE ALL SLUGS IN hackathonSlugs.js
  await scrapeDevfolio();

  console.log("Bulk scrape complete");
  process.exit(0);
};

run();
