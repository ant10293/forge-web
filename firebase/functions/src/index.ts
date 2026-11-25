import { initializeApp } from "firebase-admin/app";

initializeApp();

export { seedCatalogFromBundledData } from "./catalogSeed.js";
export { stripeWebhook } from "./stripeWebhook.js";

// Still to come: affiliate payout scheduler (scheduled function computing
// payouts from real Stripe subscription events — see the plan's forge-web
// section), and referral-code creation/claim callables.
