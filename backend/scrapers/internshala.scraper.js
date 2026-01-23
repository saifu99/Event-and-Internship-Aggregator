import axios from "axios";
import { load } from "cheerio";
import Internship from "../models/internship.model.js";

// Small delay function to prevent server overload
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function scrapeInternshala() {
  try {
    console.log("Starting Internshala scraper...");

    // Fetch the main internships page
    const { data } = await axios.get("https://internshala.com/internships");
    const $ = load(data);

    // Limit scraping to first 50 internships
    const internships = $(".internship_meta").slice(0, 50);

    console.log(`Found ${internships.length} internships, processing...`);

    for (let i = 0; i < internships.length; i++) {
      const elem = internships[i];
      const title = $(elem).find(".profile .heading_4_5").text().trim();
      const company = $(elem).find(".company_name").text().trim();
      const url = "https://internshala.com" + $(elem).find("a").attr("href");
      const deadlineText = $(elem).find(".deadline").text().replace("Apply by ", "").trim();
      const deadline = deadlineText ? new Date(deadlineText) : null;

      // Skip if already exists
      const existing = await Internship.findOne({ sourceUrl: url });
      if (!existing) {
        await Internship.create({
          title,
          company,
          sourceUrl: url,
          platform: "Internshala",
          type: "Internship",
          verified: true,
          isActive: true,
          deadline,
        });

        console.log(`Saved: ${title} at ${company}`);
        await sleep(1000); // 1-second delay between inserts
      } else {
        console.log(`Skipped (already exists): ${title}`);
      }
    }

    console.log("Internshala scraping completed successfully!");
  } catch (err) {
    console.error("Failed to scrape Internshala:", err.message);
  }
}
