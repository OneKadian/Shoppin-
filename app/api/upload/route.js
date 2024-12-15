import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(UPLOAD_DIR, file.name);

    // Ensure upload directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    // Save file locally
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      url: `/uploads/${file.name}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
