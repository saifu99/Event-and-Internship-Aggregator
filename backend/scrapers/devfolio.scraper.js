import axios from "axios";
import Opportunity from "../models/hackathon.model.js";
import { hackathonSlugs } from "./hackathonSlugs.js";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const scrapeDevfolio = async (slugs = hackathonSlugs) => {
  console.log("🔥 Devfolio scrape started");

  for (const slug of slugs) {
    console.log("Calling Devfolio API for:", slug);

    try {
      const { data } = await axios.get(
        `https://api.devfolio.co/api/hackathons/${slug}`,
        {
          headers: { "User-Agent": "Mozilla/5.0" },
          timeout: 10000,
        }
      );

      if (!data?.name) continue;

      const deadline = data.hackathon_setting?.reg_ends_at
        ? new Date(data.hackathon_setting.reg_ends_at)
        : null;

      const isActive =
        ["publish", "live"].includes(data.status?.toLowerCase()) &&
        (!deadline || deadline > new Date());

      await Opportunity.updateOne(
        { sourceUrl: `https://${data.slug}.devfolio.co` },
        {
          $set: {
            title: data.name,
            sourceUrl: `https://${data.slug}.devfolio.co`,
            platform: "Devfolio",
            type: "hackathon",
            verified: data.verified === true,
            isActive,
            deadline,
            location: data.location || "Online",
            participants: data.participants_count || 0,
            applyUrl: data.hackathon_setting?.site || null,
          },
        },
        { upsert: true }
      );

      console.log("Saved:", data.name);
      await sleep(1000); // avoid blocking
    } catch (err) {
      console.error(`Failed ${slug}:`, err.message);
    }
  }

  console.log("✅ Devfolio scrape finished");
};
