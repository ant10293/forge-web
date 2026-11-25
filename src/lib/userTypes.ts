// Mirrors the `users/{uid}` Firestore document shape documented in this
// project's memory/plan — the schema forge-core's UserProfileStore and the
// Cloud Functions in firebase/functions/src also key off of. There's no
// cross-language codegen in this stack, so these fields are a manual sync
// point with forge-core's Codable types; keep them in lockstep by hand.

export interface SubscriptionStatus {
  plan: string
  isActive: boolean
  currentPeriodEnd: number | null
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
}

export interface UserProfile {
  gender?: string
  ageYears?: number
  bodyweightKg?: number
  unitSystem?: string
}

export interface UserDocument {
  profile?: UserProfile
  subscriptionStatus?: SubscriptionStatus
  createdAt?: number
}
