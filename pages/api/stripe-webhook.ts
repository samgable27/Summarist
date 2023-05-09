// pages/api/stripe-webhook.ts
import { NextApiRequest, NextApiResponse } from "next";
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

  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[error]", err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Determine the user's subscription tier from the session data
    const subscriptionTier =
      session.line_items.data[0].price.unit_amount === 999
        ? "premium"
        : "premium_plus";

    // Update the user's subscription tier in the database
    const userId = session.client_reference_id;
    const db = getFirestore();
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { subscriptionTier });

    res.status(200).send("Subscription tier updated");
  } else {
    res.status(200).send("Unhandled event type");
  }
}
