import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Stripe from "stripe";

const CheckoutPage = ({
  sessionId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const redirectToStripeCheckout = async () => {
    const stripe = await (
      await import("@stripe/stripe-js")
    ).loadStripe(process.env.STRIPE_PUBLIC_KEY!);
    if (stripe) {
      await stripe.redirectToCheckout({ sessionId });
    }
  };

  redirectToStripeCheckout();

  return <div>Loading...</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { price } = context.query;

  // Create a new instance of the Stripe object inside getServerSideProps
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const productData = {
    currency: "usd",
    product_data: {
      name: price === "price1" ? "Summarist Premium Plus" : "Summarist Premium",
    },
    unit_amount: price === "price1" ? 99 : 10,
  };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: productData,
          quantity: 1,
        },
      ],
      mode: "payment",
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
