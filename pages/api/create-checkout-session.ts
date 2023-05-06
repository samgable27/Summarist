// pages/api/create-checkout-session.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const { price } = req.body;

  if (price !== "premium" && price !== "premium_plus") {
    res.status(400).json({ error: "Invalid price value" });
    return;
  }

  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
    price_data: {
      currency: "usd",
      product_data: {
        name:
          price === "premium"
            ? "Premium - $9.99/month"
            : "Premium Plus - $99.99/year",
      },
      unit_amount: price === "premium" ? 999 : 9999,
      recurring: {
        interval: price === "premium" ? "month" : "year",
      },
    },
    quantity: 1,
  };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [lineItem],
      mode: "subscription",
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("[error]", error);
    res
      .status(500)
      .json({
        error: "Failed to create checkout session",
        details: error.message,
      });
  }
}
