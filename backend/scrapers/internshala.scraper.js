import axios from "axios";
import { load } from "cheerio";
import Internship from "../models/internship.model.js";

export async function scrapeInternshala() {
  try {
    const { data } = await axios.get("https://internshala.com/internships");
    const $ = load(data);

    $(".internship_meta").each(async (i, elem) => {
      const title = $(elem).find(".profile .heading_4_5").text().trim();
      const company = $(elem).find(".company_name").text().trim();
      const url = "https://internshala.com" + $(elem).find("a").attr("href");
      const deadlineText = $(elem).find(".deadline").text().replace("Apply by ", "").trim();
      const deadline = deadlineText ? new Date(deadlineText) : null;

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
      }
    });

    console.log("Internshala internships scraped successfully");
  } catch (err) {
    console.error("Failed to scrape Internshala:", err.message);
  }
}
