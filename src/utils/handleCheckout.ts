import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { loadStripe } from "@stripe/stripe-js";
import { getAuth } from "firebase/auth";

interface User {
  uid: string;
  email: string;
}

export const handleCheckout = async (user: User) => {
  const premium = "price_1N5zwiFmiBcp6hq062LJ0OCD";
  const premium_plus = "price_1N5zwHFmiBcp6hq0PlHXsECY";

  const checkoutSessionRef = await addDoc(
    collection(db, "users", user.uid, "checkout_sessions"),
    {
      price: premium || premium_plus,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }
  );

  onSnapshot(checkoutSessionRef, async (snap) => {
    if (!snap.exists()) {
      console.log("Document does not exist");
      return;
    }
    const data = snap.data();
    const { sessionId } = data || {};

    console.log("Stripe Session ID:", sessionId);

    if (!sessionId) {
      console.log("Session ID not found in document data:", data);
      return;
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
    );

    if (!stripe) {
      console.log("Stripe failed to initialize");
      return;
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.log("Stripe redirectToCheckout error:", error);
    }
  });
};
