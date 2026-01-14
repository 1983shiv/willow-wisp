// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    // 1. Get raw body for HMAC verification
    const rawBody = await req.text();
    const hmacHeader = req.headers.get('x-shopify-hmac-sha256');
    const topic = req.headers.get('x-shopify-topic'); // e.g., 'products/update'

    // 2. Verify the request is actually from Shopify
    const hash = crypto
      .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET!)
      .update(rawBody, 'utf8')
      .digest('base64');

    if (hash !== hmacHeader) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    // 3. Revalidate based on the topic
    // Map Shopify topics to your Next.js cache tags
    if (topic?.startsWith('products/')) {
      revalidateTag('products', 'profile');
    } else if (topic?.startsWith('collections/')) {
      revalidateTag('collections', 'profile');
    } else if (topic?.startsWith('customers/')) {
      revalidateTag('users', 'profile');
    }

    console.log(`Revalidated tags for topic: ${topic}`);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: err }, { status: 500 });
  }
}