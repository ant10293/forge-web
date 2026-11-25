import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './AccountPage.css'

export function AccountPage() {
  const { user, userDoc, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  const subscription = userDoc?.subscriptionStatus
  const isActive = subscription?.isActive ?? false

  return (
    <main className="page-shell account-page">
      <div className="account-card">
        <h1>Your account</h1>
        <p className="subtitle">Signed in as {user?.email}</p>

        <section className="account-section">
          <h2>Subscription</h2>
          {isActive ? (
            <div className="sub-status sub-active">
              <strong>{subscription?.plan ?? 'Premium'} — active</strong>
              <span>Your subscription is active. Manage it from the customer portal below.</span>
            </div>
          ) : (
            <div className="sub-status sub-inactive">
              <strong>No active subscription</strong>
              <span>Subscribe to unlock Premium features in the app.</span>
            </div>
          )}
          <button className="button button-secondary" disabled title="Coming soon">
            {isActive ? 'Manage subscription' : 'Subscribe to Premium'}
          </button>
          <p className="coming-soon-note">
            Subscription management coming soon — Stripe checkout isn't wired up yet.
          </p>
        </section>

        <section className="account-section">
          <h2>Account</h2>
          <button className="button button-secondary" onClick={handleSignOut}>
            Sign out
          </button>
        </section>
      </div>
    </main>
  )
}
