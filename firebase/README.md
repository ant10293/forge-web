# Firebase backend

Cloud Functions, Firestore rules, and Storage rules for the Forge Firebase
project. Populated via `firebase init` / the Firebase MCP tooling once the
project exists — not hand-written, so the generated `firebase.json`,
`.firebaserc`, and function scaffolding stay in sync with the CLI's
expectations.

Firestore/Storage rules and Cloud Function payload validation derive from
one explicit schema per collection (see forge-core's Codable types), not an
inferred shape.
