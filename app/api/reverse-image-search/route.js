import { google } from "googlethis";
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    // Fetch the image from the URL
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data);

    // Define a temporary file path
    const tempFilePath = path.join(process.cwd(), "temp-image.jpg");

    // Save the image temporarily
    await fs.writeFile(tempFilePath, imageBuffer);

    try {
      // Perform reverse image search
      const searchResponse = await google.search(
        await fs.readFile(tempFilePath),
        { ris: true }
      );

      // Delete the temporary file after search
      await fs.unlink(tempFilePath);

      // Return the search results
      return NextResponse.json({
        results: searchResponse.results.map((result) => result.url),
      });
    } catch (searchError) {
      console.error("Error during reverse image search:", searchError);

      // Cleanup the file even if search fails
      await fs.unlink(tempFilePath);

      return NextResponse.json(
        { error: "Reverse image search failed" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in processing API request:", error);

    return NextResponse.json(
      { error: "Failed to process the image URL" },
      { status: 500 }
    );
  }
}
