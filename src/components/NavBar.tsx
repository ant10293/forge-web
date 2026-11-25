import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './NavBar.css'

export function NavBar() {
  const { user } = useAuth()
  const appName = import.meta.env.VITE_APP_NAME ?? 'Forge'

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" to="/">
          <span className="brand-mark">{appName.charAt(0)}</span>
          <span>{appName}</span>
        </Link>
        <nav className="nav-links">
          <Link to="/#pro">Premium</Link>
          {user ? (
            <Link to="/account">Account</Link>
          ) : (
            <>
              <Link to="/sign-in">Sign in</Link>
              <Link className="button button-primary nav-cta" to="/sign-up">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
