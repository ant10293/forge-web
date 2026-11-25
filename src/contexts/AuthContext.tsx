import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import type { UserDocument } from '../lib/userTypes'

interface AuthContextValue {
  user: User | null
  userDoc: UserDocument | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userDoc, setUserDoc] = useState<UserDocument | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!user) {
      setUserDoc(null)
      return
    }
    return onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
      setUserDoc(snapshot.exists() ? (snapshot.data() as UserDocument) : null)
    })
  }, [user])

  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
  }

  async function signUp(email: string, password: string) {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    const userRef = doc(db, 'users', credential.user.uid)
    const existing = await getDoc(userRef)
    if (!existing.exists()) {
      // subscriptionStatus is intentionally omitted here — Firestore rules make
      // it client-immutable; only the Stripe webhook Cloud Function ever writes it.
      await setDoc(userRef, { createdAt: Date.now() })
    }
  }

  async function signOut() {
    await firebaseSignOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, userDoc, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
