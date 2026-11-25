import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { Timestamp, getFirestore } from "firebase-admin/firestore";
import Stripe from "stripe";

const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");
const stripeWebhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");

const HANDLED_EVENT_TYPES = new Set([
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

/**
 * Writes `users/{uid}.subscriptionStatus` from a verified Stripe
 * subscription event — the only path allowed to touch that field (see
 * firestore.rules: clients can never write it themselves).
 *
 * Signature verification is real and complete. What's NOT wired up yet:
 * there's no Stripe Checkout flow in forge-web (that's a later phase), so
 * no Stripe Customer created so far carries the `firebaseUID` metadata
 * this handler expects — meaning this function is structurally correct
 * and would behave correctly against a real event, but has nothing real
 * to receive until Checkout session creation sets that metadata. Treat
 * that as the integration point to close when forge-web's auth+checkout
 * pages are built, not a bug here.
 */
export const stripeWebhook = onRequest(
  { secrets: [stripeSecretKey, stripeWebhookSecret] },
  async (req, res) => {
    const signature = req.headers["stripe-signature"];
    if (typeof signature !== "string") {
      res.status(400).send("Missing Stripe-Signature header");
      return;
    }

    const stripe = new Stripe(stripeSecretKey.value());

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.rawBody, signature, stripeWebhookSecret.value());
    } catch (error) {
      console.error("Stripe webhook signature verification failed", error);
      res.status(400).send("Invalid signature");
      return;
    }

    if (!HANDLED_EVENT_TYPES.has(event.type)) {
      res.status(200).send({ received: true, handled: false });
      return;
    }

    try {
      await applySubscriptionEvent(event.data.object as Stripe.Subscription);
      res.status(200).send({ received: true, handled: true });
    } catch (error) {
      console.error("Failed to apply Stripe subscription event", error);
      res.status(500).send("Internal error applying subscription update");
    }
  }
);

async function applySubscriptionEvent(subscription: Stripe.Subscription): Promise<void> {
  const uid = subscription.metadata?.firebaseUID;
  if (!uid) {
    console.warn(`Stripe subscription ${subscription.id} has no firebaseUID metadata; skipping`);
    return;
  }

  const isActive = subscription.status === "active" || subscription.status === "trialing";
  const price = subscription.items.data[0]?.price;

  await getFirestore()
    .collection("users")
    .doc(uid)
    .set(
      {
        subscriptionStatus: {
          plan: price?.nickname ?? price?.id ?? "unknown",
          isActive,
          currentPeriodEnd: Timestamp.fromMillis(subscription.current_period_end * 1000),
          stripeCustomerId: typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id,
          stripeSubscriptionId: subscription.id,
        },
      },
      { merge: true }
    );
}
