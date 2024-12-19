import fetch from "node-fetch";

export async function POST(req) {
  try {
    const body = await req.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return new Response(JSON.stringify({ error: "Image URL is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const serpApiKey = process.env.NEXT_PUBLIC_SERP_API_KEY;

    if (!serpApiKey) {
      throw new Error(
        "SerpApi key is not configured in the environment variables."
      );
    }

    const apiUrl = `https://serpapi.com/search?engine=google_reverse_image&image_url=${encodeURIComponent(
      imageUrl
    )}&api_key=${serpApiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`SerpApi responded with status ${response.status}`);
    }

    const data = await response.json();

    // Extract relevant results
    const results = data.image_results || [];

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error during reverse image search:", error);
    return new Response(
      JSON.stringify({ error: "Failed to perform reverse image search" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
