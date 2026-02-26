import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia' as any,
  });
};

export async function POST(req: Request) {
  try {
    const { bookingData } = await req.json();
    const stripe = getStripe();
    
    // Sanitize metadata (Stripe only accepts strings and no nulls)
    const sanitizedMetadata: Record<string, string> = {};
    Object.entries(bookingData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        sanitizedMetadata[key] = String(value);
      }
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'sar',
            product_data: {
              name: `Legal Consultation - ${bookingData.service}`,
              description: '20-minute professional legal consultation',
            },
            unit_amount: 10000, // 100.00 SAR
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.APP_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/booking`,
      metadata: sanitizedMetadata,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
