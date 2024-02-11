import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';


const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);

export const POST = async (req: Request) => {
  try {
    
    const { amount } = await req.json();
    
    const origin = req.headers.get('origin');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      submit_type: "pay",
      billing_address_collection: "auto",
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Donation',
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${origin}/success`,
      cancel_url: `${origin}/canceled`,
    });

    return NextResponse.json(session, {status: 200});
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something Went Wrong" }), { status: 500 });
  }
};
