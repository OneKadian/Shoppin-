import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);

const BUCKET_NAME = "shoppin";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    // Ensure file is present and is of a valid type
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Convert the file to an ArrayBuffer
    const fileArrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileArrayBuffer);

    const fileName = `${Date.now()}-${file.name || "uploaded-file"}`; // Unique filename

    // Upload the file to Supabase
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, buffer, {
        contentType: file.type || "application/octet-stream",
        cacheControl: "3600", // Optional: Cache control header
      });

    if (error) {
      console.error("Supabase upload error:", error.message);
      return NextResponse.json(
        { error: "File upload failed" },
        { status: 500 }
      );
    }

    // Generate the public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (error) {
    console.error("Upload error:", error.message, error.stack);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
