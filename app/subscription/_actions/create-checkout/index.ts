"use server";

import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import Stripe from "stripe";

export const createStripeCheckout = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw error("Unauthorized");
  }

  if (!process.env.STRIPE_SECRET_KEY_TEST) {
    throw error("Stripe secret key not found");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST, {
    apiVersion: "2024-10-28.acacia",
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: `https://localhost:3000`,
    cancel_url: `https://localhost:3000`,
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID_TEST,
        quantity: 1,
      },
    ],
  });
  return { sessionId: session.id };
};
