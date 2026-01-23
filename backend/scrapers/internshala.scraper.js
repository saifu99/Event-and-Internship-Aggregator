import axios from "axios";
import { load } from "cheerio";
import Internship from "../models/internship.model.js";

const TECH_KEYWORDS = [
  "software", "developer", "web", "frontend", "backend",
  "full stack", "react", "node", "javascript", "data",
  "machine learning", "ai", "cloud", "devops",
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isTechInternship(text = "") {
  return TECH_KEYWORDS.some(keyword => text.toLowerCase().includes(keyword));
}

async function scrapePage(page = 1) {
  const url = `https://internshala.com/internships/computer-science-internship/page-${page}`;
  console.log(`Fetching page ${page}...`);

  const { data } = await axios.get(url);
  const $ = load(data);

  const internships = $(".internship_list > .individual_internship");
  if (internships.length === 0) return false; // no more pages

  for (let i = 0; i < internships.length; i++) {
    const elem = internships[i];
    const title = $(elem).find("h3 a").text().trim();
    const company = $(elem).find(".company_name a, .company_name").text().trim();
    const internshipUrl = "https://internshala.com" + $(elem).find("h3 a").attr("href");

    if (!title || !company || !internshipUrl) continue;

    const categoryText = $(elem).find(".internship_categories").text();
    if (!isTechInternship(title) && !isTechInternship(categoryText)) continue;

    const deadlineText = $(elem).find(".apply_by").text().replace("Apply by ", "").trim();
    const deadline = deadlineText ? new Date(deadlineText) : null;

    const existing = await Internship.findOne({ sourceUrl: internshipUrl });
    if (!existing) {
      await Internship.create({
        title,
        company,
        sourceUrl: internshipUrl,
        platform: "Internshala",
        type: "Internship",
        verified: true,
        isActive: true,
        deadline
      });
      console.log(`Saved: ${title} at ${company}`);
      await sleep(1000); // polite delay
    } else {
      console.log(`Skipped (exists): ${title}`);
    }
  }

  return true; // page processed
}

export async function scrapeInternshala() {
  try {
    console.log("Starting Internshala scraper...");
    let page = 1;
    while (await scrapePage(page)) page++;
    console.log("All pages scraped successfully!");
  } catch (err) {
    console.error("Scraper failed:", err.message);
  }
}
