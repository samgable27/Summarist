import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

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

  const { price, userId } = req.body;

  if (price !== "premium" && price !== "premium_plus") {
    res.status(400).json({ error: "Invalid price value" });
    return;
  }

  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
    price_data: {
      currency: "usd",
      product_data: {
        name:
          price === "premium" ? "Summarist Premium" : "Summarist Premium Plus",
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
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/for-you`,
    });

    // Update the user's data in the database with the session ID
    const db = getFirestore();
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { checkoutSessionId: session.id });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("[error]", error);
    res.status(500).json({
      error: "Failed to create checkout session",
      details: error.message,
    });
  }
}
