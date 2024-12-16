// pages/api/reverse-search.js
import puppeteer from "puppeteer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: "Image URL is required" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: false, // Run with UI for easier debugging
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Avoid permissions issues
    });

    const page = await browser.newPage();

    // Set a random user agent to avoid bot detection
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
    );

    // Go to Google Images reverse search
    await page.goto("https://images.google.com", {
      waitUntil: "networkidle2",
    });

    // Click on the "Search by Image" button
    const cameraButtonSelector = "button[aria-label='Search by image']";
    await page.waitForSelector(cameraButtonSelector);
    await page.click(cameraButtonSelector);

    // Input the image URL and perform the search
    const inputSelector = "input[type='text']";
    await page.waitForSelector(inputSelector);
    await page.type(inputSelector, imageUrl);
    await page.keyboard.press("Enter");

    // Wait for results to load
    await page.waitForSelector(".rg_i", { timeout: 15000 });

    // Scrape the top 10 results
    const results = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll(".rg_i")).slice(
        0,
        10
      );
      return images.map((img) => ({
        image: img.getAttribute("src"),
        link: img.closest("a").href,
      }));
    });

    await browser.close();
    return res.status(200).json(results);
  } catch (error) {
    console.error("Error during reverse image search:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to perform reverse image search" });
  }
}
