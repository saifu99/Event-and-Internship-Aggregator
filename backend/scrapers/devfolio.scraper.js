import axios from "axios";
import Opportunity from "../models/hackathon.model.js";
import { hackathonSlugs } from "./hackathonList.js";

export const scrapeDevfolio = async () => {
  let savedCount = 0;

  for (const slug of hackathonSlugs) {
    try {
      // Fetch hackathon data
      const { data } = await axios.get(
        `https://api.devfolio.co/api/hackathons/${slug}`,
        { timeout: 10000, headers: { "User-Agent": "Mozilla/5.0" } },
      );

      // Debug: log raw response once
      console.log("RAW RESPONSE for", slug, ":", data);

      // The hackathon object is at the top level
      const h = data;

      if (!h || !h.name) {
        console.warn(`No data for slug: ${slug}`);
        continue;
      }

      const deadline = h.hackathon_setting?.reg_ends_at
        ? new Date(h.hackathon_setting.reg_ends_at)
        : null;

      const isDeadlineActive = deadline ? deadline > new Date() : false;

      // Prepare opportunity object
      const opportunity = {
        title: h.name,
        sourceUrl: `https://${h.slug}.devfolio.co`,
        platform: "Devfolio",
        type: "hackathon",
        verified: h.verified ?? true,
        isActive:
          ["publish", "live"].includes(h.status?.toLowerCase()) &&
          isDeadlineActive,
        deadline: deadline,
        location: h.location || "Online/Unknown",
        participants: h.participants_count || 0,
        applyUrl: h.hackathon_setting?.site || null,
      };

      // Upsert into MongoDB
      await Opportunity.updateOne(
        { sourceUrl: opportunity.sourceUrl },
        { $set: opportunity },
        { upsert: true },
      );

      savedCount++;
      console.log(`✅ Saved: ${h.name}`);
    } catch (err) {
      console.error(`❌ Failed for slug ${slug}: ${err.message}`);
    }
  }

  console.log(`\nDevfolio scrape completed. Total saved: ${savedCount}`);
};
