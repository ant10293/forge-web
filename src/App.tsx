import './App.css'

function App() {
  const appName = import.meta.env.VITE_APP_NAME ?? 'Forge'

  return (
    <main className="placeholder">
      <h1>{appName}</h1>
      <p>Marketing, account/subscription, and admin console — coming soon.</p>
    </main>
  )
}

export default App
