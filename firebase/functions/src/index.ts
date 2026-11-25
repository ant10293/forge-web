import { initializeApp } from "firebase-admin/app";

initializeApp();

// Cloud Functions land here in later phases: catalog sync, Stripe webhook
// (writes users/{uid}.subscriptionStatus), affiliate payout scheduler.
