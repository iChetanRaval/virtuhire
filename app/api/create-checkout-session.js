// app/api/create-checkout-session/route.js (for Next.js App Directory)
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { plan } = await request.json();

  const price = {
    free: 0,
    team: 2900, // in cents ($29)
    popular: 5900, // in cents ($59)
    enterprise: 9900, // in cents ($99)
  }[plan];

  if (price === undefined) {
    return new Response(JSON.stringify({ error: 'Invalid plan' }), { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'upi'], // Enable Card and UPI
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${plan} Plan`,
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
  });

  return new Response(JSON.stringify({ id: session.id }), { status: 200 });
}
