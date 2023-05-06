// pages/checkout.tsx
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
import Stripe from "stripe";

const CheckoutPage = ({
  sessionId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const redirectToStripeCheckout = async () => {
    const stripe = await (
      await import("@stripe/stripe-js")
    ).loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
    if (stripe) {
      await stripe.redirectToCheckout({ sessionId });
    }
  };

  useEffect(() => {
    if (sessionId) {
      redirectToStripeCheckout();
    }
  }, [sessionId]);

  return <div>Loading...</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { price } = context.query;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  if (price !== "premium" && price !== "premium_plus") {
    return {
      notFound: true,
    };
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
      success_url: `${context.req.headers.origin}/success`,
      cancel_url: `${context.req.headers.origin}/cancel`,
    });

    return {
      props: {
        sessionId: session.id,
      },
    };
  } catch (error) {
    console.error("[error]", error);
    return {
      notFound: true,
    };
  }
};

export default CheckoutPage;
