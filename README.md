# Forge (web)

Marketing site, account/subscription pages, and admin console for Forge
(React + TypeScript + Vite, deployed to Firebase Hosting), plus the
Firebase backend — Cloud Functions, Firestore rules, Storage rules — under
[`firebase/`](firebase/).

Premium subscriptions are purchased here, via Stripe Checkout — not in the
iOS app. A Stripe webhook Cloud Function is the only writer of
`users/{uid}.subscriptionStatus`, which the app reads.

## Frontend

```bash
npm install
cp .env.example .env   # fill in Firebase web app config
npm run dev
```

## Firebase backend

See [`firebase/README.md`](firebase/README.md).
