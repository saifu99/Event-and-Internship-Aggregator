// import axios from "axios";
// import * as cheerio from "cheerio";
// import Opportunity from "../models/Opportunity.js";

// export const scrapeDevfolio = async () => {
//   const { data } = await axios.get("https://devfolio.co/hackathons");

//   const $ = cheerio.load(data);

//   const hackathons = [];

//   $(".hackathon-card").each((i, el) => {
//     const title = $(el).find(".title").text().trim();
//     const link = "https://devfolio.co" + $(el).find("a").attr("href");
//     const deadline = $(el).find(".deadline").text().trim();

//     if (title && link) {
//       hackathons.push({
//         title,
//         sourceUrl: link,
//         platform: "Devfolio",
//         type: "hackathon",
//         verified: true
//       });
//     }
//   });

//   for (let item of hackathons) {
//     await Opportunity.updateOne(
//       { sourceUrl: item.sourceUrl },
//       { $set: item },
//       { upsert: true }
//     );
//   }

//   console.log("Devfolio scrape completed");
//   console.log("Hackathon cards found:", $(".hackathon-card").length);
//   console.log("First hackathon item:", hackathons[0]);
// };


// import axios from "axios";
// import * as cheerio from "cheerio";
// import Opportunity from "../models/Opportunity.js";
// import { hackathonUrls } from "./hackathonUrls.js";

// export const scrapeDevfolio = async () => {
//   let savedCount = 0;

//   for (const url of hackathonUrls) {
//     try {
//       const { data } = await axios.get(url, {
//         headers: { "User-Agent": "Mozilla/5.0" },
//         timeout: 10000
//       });

//       const $ = cheerio.load(data);

//       // Update selectors based on actual page structure
//       const title = $("h1").first().text().trim();
//       const deadline = $(".HackathonCard__Deadline").text().trim() || "N/A";

//       if (!title) continue;

//       const opportunity = {
//         title,
//         sourceUrl: url,
//         platform: "Devfolio",
//         type: "hackathon",
//         verified: true,
//         isActive: true,
//         deadline
//       };

//       await Opportunity.updateOne(
//         { sourceUrl: url },
//         { $set: opportunity },
//         { upsert: true }
//       );

//       savedCount++;
//       console.log(`Saved: ${title}`);
//     } catch (err) {
//       console.error(`Failed to scrape ${url}: ${err.message}`);
//     }
//   }

//   console.log(`Devfolio scrape completed. Total saved: ${savedCount}`);
// };


import axios from "axios";
import Opportunity from "../models/Opportunity.js";
import { hackathonSlugs } from "./hackathonSlugs.js";

export const scrapeDevfolio = async () => {
  let savedCount = 0;

  for (const slug of hackathonSlugs) {
    try {
      // Fetch hackathon data
      const { data } = await axios.get(
        `https://api.devfolio.co/api/hackathons/${slug}`,
        { timeout: 10000, headers: { "User-Agent": "Mozilla/5.0" } }
      );

      // Debug: log raw response once
      console.log("RAW RESPONSE for", slug, ":", data);

      // The hackathon object is at the top level
      const h = data;

      if (!h || !h.name) {
        console.warn(`No data for slug: ${slug}`);
        continue;
      }

      // Prepare opportunity object
      const opportunity = {
        title: h.name,
        sourceUrl: `https://${h.slug}.devfolio.co`,
        platform: "Devfolio",
        type: "hackathon",
        verified: h.verified ?? true,
        isActive: ["publish", "live"].includes(h.status?.toLowerCase()),
        deadline: h.hackathon_setting?.reg_ends_at || "N/A",
        location: h.location || "Online/Unknown",
        participants: h.participants_count || 0,
        applyUrl: h.hackathon_setting?.site || null
      };

      // Upsert into MongoDB
      await Opportunity.updateOne(
        { sourceUrl: opportunity.sourceUrl },
        { $set: opportunity },
        { upsert: true }
      );

      savedCount++;
      console.log(`✅ Saved: ${h.name}`);
    } catch (err) {
      console.error(`❌ Failed for slug ${slug}: ${err.message}`);
    }
  }

  console.log(`\nDevfolio scrape completed. Total saved: ${savedCount}`);
};

