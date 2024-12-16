// lib/image-search.ts
import puppeteer from 'puppeteer';
import { ImageSearchResult } from '../types/image-search';

export async function performImageSearch(imagePath: string): Promise<ImageSearchResult[]> {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set a realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Navigate to Google Lens
    await page.goto('https://lens.google.com/upload', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Upload image
    const fileInput = await page.$('input[type="file"]');
    if (fileInput) {
      await fileInput.uploadFile(imagePath);
    } else {
      throw new Error('File upload input not found');
    }

    // Wait for results to load
    await page.waitForSelector('.image-result-container', { 
      timeout: 30000 
    });

    // Extract results
    const results = await page.evaluate(() => {
      const resultElements = document.querySelectorAll('.image-result-container');
      const extractedResults: ImageSearchResult[] = [];

      resultElements.forEach((element, index) => {
        if (index >= 20) return; // Limit to 20 results

        const titleEl = element.querySelector('.result-title');
        const linkEl = element.querySelector('a');
        const sourceEl = element.querySelector('.result-source');
        const thumbnailEl = element.querySelector('img');

        extractedResults.push({
          title: titleEl?.textContent || 'Untitled Result',
          link: linkEl?.href || '',
          source: sourceEl?.textContent || 'Unknown Source',
          thumbnail: thumbnailEl?.src
        });
      });

      return extractedResults;
    });

    return results;

  } catch (error) {
    console.error('Image search error:', error);
    throw error;
  } finally {
    await browser.close();
  }
}