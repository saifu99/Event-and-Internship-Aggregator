import axios from "axios";
import { load } from "cheerio";
import Internship from "../models/internship.model.js";

const TECH_KEYWORDS = [
  "software", "developer", "web", "frontend", "backend",
  "full stack", "react", "node", "javascript",
  "data", "machine learning", "ai", "cloud", "devops",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const isTech = (text = "") =>
  TECH_KEYWORDS.some((k) => text.toLowerCase().includes(k));

export async function scrapeInternshala() {
  console.log("Internshala HTML scraper started");

  try {
    const url =
      "https://internshala.com/internships/computer-science-internship";

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
      timeout: 15000,
    });

    console.log("HTML length:", data.length);

    const $ = load(data);
    const internships = $(".individual_internship");

    console.log("Internship cards found:", internships.length);

    if (internships.length === 0) {
      console.warn("Selector failed. Internshala markup changed.");
      return;
    }

    let saved = 0;

    for (let i = 0; i < internships.length; i++) {
      const el = internships[i];

      const title = $(el).find(".job-title-href").text().trim();
      const company = $(el).find(".company-name").text().trim();
      const href = $(el).find(".job-title-href").attr("href");

      if (!title || !company || !href) continue;

      if (!isTech(title)) continue;

      const sourceUrl = `https://internshala.com${href}`;

      const exists = await Internship.findOne({ sourceUrl });
      if (exists) continue;

      const location = $(el).find(".location-class").text().trim() || null;

      await Internship.create({
        title,
        company,
        sourceUrl,
        platform: "Internshala",
        type: "Internship",
        verified: true,
        isActive: true,
        location,
      });

      saved++;
      console.log(`Saved: ${title} @ ${company}`);
      await sleep(1200); // anti-block delay
    }

    console.log(`Internshala scrape complete. Saved: ${saved}`);
  } catch (err) {
    console.error("Internshala scrape failed:", err.message);
  }
}
