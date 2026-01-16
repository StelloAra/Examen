import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
});

export async function POST(req: Request) {
  try {
    const body = await req.formData();

    const amount = Number(body.get("amount")); // donation amount
    const packageName = String(body.get("packageName"));
    const animalName = String(body.get("animalName"));

    if (!amount || !packageName || !animalName) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "sek",
            unit_amount: amount * 100, // Stripe uses öre
            product_data: {
              name: `${packageName} donation for ${animalName}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donation-success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donation-cancelled`,
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    return NextResponse.json({ error: "Stripe error", details: err }, { status: 500 });
  }
}
