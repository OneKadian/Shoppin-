// app/api/image-search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { performImageSearch } from '../../lib/image-search';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' }, 
        { status: 400 }
      );
    }

    // Save file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join(process.cwd(), 'public', 'uploads', file.name);
    
    await writeFile(path, buffer);

    // Perform image search
    const searchResults = await performImageSearch(path);

    return NextResponse.json({
      results: searchResults,
      success: true
    });

  } catch (error) {
    console.error('Image search API error:', error);
    return NextResponse.json(
      { 
        error: 'Image search failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
}