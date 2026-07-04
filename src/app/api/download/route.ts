import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const fileId = '1uwlTKvq7T25iMClaVuMy2yQJSf10p6p5';
  const url = `https://drive.google.com/uc?export=download&id=${fileId}`;

  try {
    const filePath = path.join(process.cwd(), 'public', 'assets', 'brochure.pdf');
    
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      
      const headers = new Headers();
      headers.set('Content-Disposition', 'attachment; filename="SHARK BOND BROCHURE.pdf"');
      headers.set('Content-Type', 'application/pdf');

      return new Response(fileBuffer, {
        status: 200,
        headers,
      });
    }

    // Fallback: fetch from Google Drive
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from Google Drive: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    if (contentType.includes('text/html')) {
      return NextResponse.redirect(url);
    }

    const headers = new Headers();
    headers.set('Content-Disposition', 'attachment; filename="SHARK BOND BROCHURE.pdf"');
    headers.set('Content-Type', 'application/pdf');

    return new Response(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error serving brochure:', error);
    // Fallback: Redirect directly to Google Drive download URL
    return NextResponse.redirect(url);
  }
}
