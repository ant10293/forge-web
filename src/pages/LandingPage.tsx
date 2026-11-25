import { Link } from 'react-router-dom'
import './LandingPage.css'

export function LandingPage() {
  const appName = import.meta.env.VITE_APP_NAME ?? 'Forge'

  return (
    <main className="page-shell landing">
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Personalized workout planning that adapts to you</div>
            <h1>Train with a plan built around how you actually work out.</h1>
            <p>
              {appName} generates personalized workout plans, tracks your strength
              and performance over time, and respects the equipment you actually
              have — whether that's a full commercial gym or a few dumbbells at
              home.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/sign-up">
                Create your account
              </Link>
              <a className="button button-secondary" href="#features">
                See what it does
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <strong>Goal-aware planning</strong>
                <span>Build muscle, get stronger, lose weight, or train for general fitness.</span>
              </div>
              <div className="stat">
                <strong>Equipment-aware workouts</strong>
                <span>Plans respect the equipment you've told it you have access to.</span>
              </div>
              <div className="stat">
                <strong>Strength you can measure</strong>
                <span>See how your lifts rank against real population strength standards.</span>
              </div>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="hero-panel-header">
              <h2>Your training companion, not a one-size-fits-all template.</h2>
              <p>
                {appName} combines algorithmic planning, an exercise library with
                real context, and practical in-session tools so your plan is
                easier to follow — and easier to improve.
              </p>
            </div>
            <div className="mini-stack">
              <div className="mini-card">
                <strong>Generate a workout plan</strong>
                <span>Start from a plan tailored to your goal and refine it as you progress.</span>
              </div>
              <div className="mini-card">
                <strong>Track what matters</strong>
                <span>Log sets, follow your strength trends, and see real PRs over time.</span>
              </div>
              <div className="mini-card">
                <strong>Go beyond a template app</strong>
                <span>Strength ranking, custom equipment, and plate-loading visualization.</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="features" className="section">
        <div className="section-header">
          <h2>What {appName} helps you do</h2>
          <p>
            Built around personalized training, practical execution, and measurable
            progress — not just a list of workouts.
          </p>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-icon">1</div>
            <h3>Generate personalized workout plans</h3>
            <p>
              Plans tailored to your goal, experience, schedule, and equipment, so
              your starting point actually fits your training reality.
            </p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">2</div>
            <h3>Track performance and strength</h3>
            <p>
              Review completed workouts and exercise performance trends, and see
              where your lifts rank against real strength standards.
            </p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">3</div>
            <h3>Explore exercises with context</h3>
            <p>
              Browse the exercise library, see what muscles and equipment are
              involved, and find similar exercises when something doesn't fit.
            </p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">4</div>
            <h3>Train with your own setup</h3>
            <p>
              Tell {appName} what equipment you actually have — at a commercial
              gym, a home setup, or anywhere in between — and generation respects it.
            </p>
          </article>
        </div>
      </section>

      <section id="pro" className="section">
        <div className="pro-card">
          <h2>Upgrade with {appName} Premium</h2>
          <p>
            Premium unlocks deeper training tools and automation. It's purchased
            here on the website and applies to your account everywhere — the app
            itself never shows a purchase screen.
          </p>
          <div className="pro-grid">
            <div className="pro-item">
              <strong>Automatic progression</strong>
              <span>Adjust volume week to week based on your logged performance.</span>
            </div>
            <div className="pro-item">
              <strong>Unlimited custom templates</strong>
              <span>Build and save as many workout templates as you need.</span>
            </div>
            <div className="pro-item">
              <strong>Warm-up set autofill</strong>
              <span>Calculate and autofill warm-up sets automatically.</span>
            </div>
            <div className="pro-item">
              <strong>Plate-load visualization</strong>
              <span>See exactly how to load the bar before you start a set.</span>
            </div>
          </div>
          <div className="hero-actions" style={{ marginTop: 24 }}>
            <Link className="button button-primary" to="/sign-up">
              Create an account to subscribe
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-card">
        <h2>Start building a smarter training routine.</h2>
        <p>
          Create your account, open {appName} on iPhone, and generate your first
          plan in a couple minutes.
        </p>
        <div className="hero-actions" style={{ justifyContent: 'center', marginBottom: 0 }}>
          <Link className="button button-primary" to="/sign-up">
            Get started free
          </Link>
        </div>
      </section>
    </main>
  )
}
