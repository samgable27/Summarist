import { loadStripe } from "@stripe/stripe-js";

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY!;

if (!stripePublicKey) {
  throw new Error("Stripe public key is missing in environment variables.");
}

export const stripePromise = loadStripe(stripePublicKey);
