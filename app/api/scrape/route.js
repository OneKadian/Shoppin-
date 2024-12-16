// import puppeteer from "puppeteer-extra";
// import StealthPlugin from "puppeteer-extra-plugin-stealth";

// puppeteer.use(StealthPlugin());

// export async function POST(req) {
//   try {
//     const { imageUrl } = await req.json();

//     // Start Puppeteer browser
//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ["--no-sandbox"],
//     });

//     const page = await browser.newPage();

//     // Navigate to Google Images
//     await page.goto("https://images.google.com/", {
//       waitUntil: "networkidle2",
//     });

//     // Click on the "Search by Image" button
//     const searchByImageButtonSelector = ".S3Wjs";
//     await page.waitForSelector(searchByImageButtonSelector);
//     await page.click(searchByImageButtonSelector);

//     // Input the image URL
//     const inputSelector = 'input[type="url"]';
//     await page.waitForSelector(inputSelector);
//     await page.type(inputSelector, imageUrl);
//     await page.keyboard.press("Enter");

//     // Wait for search results to load
//     await page.waitForSelector(".islrc", { timeout: 10000 });

//     // Scrape the first 20 image results
//     const results = await page.evaluate(() => {
//       const imageElements = document.querySelectorAll(".rg_i");
//       const resultArray = [];
//       for (let i = 0; i < imageElements.length && i < 20; i++) {
//         const img = imageElements[i];
//         resultArray.push({
//           src: img.getAttribute("src") || img.getAttribute("data-src"),
//           link: img.closest("a")?.getAttribute("href"),
//         });
//       }
//       return resultArray;
//     });

//     await browser.close();

//     return new Response(JSON.stringify(results), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: "Failed to fetch results." }), {
//       status: 500,
//     });
//   }
// }
