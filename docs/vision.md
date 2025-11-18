# P-MFA — Proximity Multi-Factor Authentication
_A seamless authentication layer that unlocks accounts and devices when your trusted phone is physically nearby._

---

## 1. One-line Concept

P-MFA is a proximity-based multi-factor authentication system that uses your phone as a secure, cryptographically verified “key fob” to automatically approve logins on your laptop or desktop when it’s physically near you.

---

## 2. Problem

Current authentication flows are:

- Slow and disruptive (passwords, SMS codes, authenticator apps, email links).
- Fragmented across devices, apps, and platforms.
- Overly complex for non-technical users.
- Still vulnerable to phishing, social engineering, and poor password hygiene.

Even with 2FA, the user experience is:
- Open website → enter email/password → open phone → find app → copy code → paste → login.

This is secure, but clunky. It breaks flow, especially for people logging into tools many times a day.

---

## 3. Core Insight

Modern cars already solved this exact UX:

> If your key is nearby, the car unlocks. If not, nothing happens.

The key is:
- Proximity (physical closeness).
- A secure, pre-paired device that’s uniquely linked to the car.

**P-MFA brings this pattern to digital authentication.**

Instead of:
> “Type password. Enter 6-digit code.”

We want:
> “If my phone is here and I’m at my laptop, just log me in.”

---

## 4. High-level Solution

P-MFA is a system with three main parts:

1. **Trusted Device (Phone)**
   - Runs the P-MFA mobile app.
   - Advertises a secure, rotating BLE (Bluetooth Low Energy) presence signal.
   - Holds a private key and device identity (generated during onboarding).
   - Approves or denies high-risk actions (optional UX step).

2. **Local Listener (Desktop Client / Browser Extension)**
   - Runs on the user’s laptop or desktop.
   - Listens for the user’s trusted phone via BLE within a defined proximity.
   - Establishes a secure, encrypted handshake using pre-exchanged keys.
   - When a login attempt occurs on a website/app, it checks:
     - “Is the trusted phone nearby and verified?”
     - If yes → automatically approve (or reduce friction).
     - If no → fall back to traditional 2FA / password.

3. **Backend / Broker (P-MFA Service)**
   - Manages user accounts and device registrations.
   - Stores public keys and device associations (never private keys).
   - Issues signed assertions/tokens to compatible apps/sites:
     - “This login is being made from a device that is physically near the user’s trusted phone and has passed the cryptographic check.”

---

## 5. What Makes This Special / Patent-Worthy (Conceptual)

- **Proximity as the second factor:**
  Instead of requiring **user interaction** on a second device (entering a code / tapping approve), P-MFA uses **verified physical proximity** as the second factor.

- **Continuous proximity awareness (optional):**
  Not only at login – sessions can be strengthened by:
  - Auto-locking when the phone leaves the proximity zone.
  - Elevating trust when the phone remains nearby over time.

- **Protocol-level design:**
  The focus is on a **generic protocol** that apps, browsers, and operating systems can integrate, not just a one-off app.
  The novelty is in:
  - How proximity is measured and verified.
  - How the BLE + crypto handshake is bound to login events.
  - How trust assertions are issued and validated across different services.

- **User experience as core:**
  Authentication happens “invisibly” most of the time, with minimal user action, while improving security instead of weakening it.

> Goal: A patent around “proximity-verified, device-bound multi-factor authentication for login and session management.”

(Technical IP depth will be expanded in `patent-draft.md`.)

---

## 6. Target Users & Use Cases

### Primary users (early adopters):
- Developers, engineers, tech workers logging into many tools daily.
- Founders and operators who care about security but hate friction.
- Power users on laptops who use password managers, 2FA, etc.

### Longer-term:
- General consumer users across browsers (Chrome, Safari, Edge) and OS (macOS, Windows, Linux).
- Teams and companies who want better security UX for employees.

### Example use cases:
- Logging into web apps (e.g. email, banking, dev tools, SaaS dashboards).
- Unlocking a desktop app when the user returns to the machine.
- Silent “presence” factor for high-risk actions (changing password, viewing sensitive data, large transactions).

---

## 7. MVP Scope

The MVP is not a full standard yet. It is a **working demo** that proves:

> “When my phone is near my laptop, my login is frictionless. When it’s not, I can’t log in (or it’s more strict).”

### MVP components:

1. **Desktop Listener (macOS first)**
   - Basic Electron/Node app.
   - Listens for BLE advertisement from the P-MFA mobile app.
   - Performs a simple shared-key or public-key handshake.

2. **Mobile App (iOS first)**
   - Generates a keypair on first setup.
   - Pairs with the desktop client (QR code, pairing code, etc.).
   - Broadcasts a BLE “I’m here” signal when active/unlocked.

3. **Demo Web App**
   - Example “secure dashboard” or simple login page.
   - Integrates with the desktop listener via localhost API or browser extension.
   - On login:
     - If proximity is verified → allow instant login.
     - If not → show fallback (password or blocked).

4. **Backend (optional for MVP, but likely helpful)**
   - Simple API to store:
     - User ID
     - Device public keys
     - Pairing events
   - Issue signed JWT-like tokens stating:
     > “User X is physically near trusted device Y at time T.”

---

## 8. Non-Goals for MVP

To keep scope clean, the MVP is **not**:

- A full browser-integrated WebAuthn replacement.
- A production-ready security product for enterprises.
- A cross-platform, battle-tested BLE library.

Instead, the MVP is a **proof-of-concept** that validates:

- Can we reliably detect a trusted phone nearby?
- Can we make the login experience feel magical?
- Can this be turned into a repeatable protocol?

---

## 9. Security & Design Principles

- **Device-bound trust:**
  Trust is tied to a physical phone device, not just a user account.

- **Opt-out, not forced:**
  Users can disable proximity logins or require explicit approval on the phone.

- **No shared secrets in plain text:**
  Use public/private key cryptography. Private keys never leave devices.

- **Proximity ≠ alone:**
  Proximity is layered with:
  - Device trust
  - Session metadata
  - Optional user gestures for sensitive actions

- **Graceful degradation:**
  If proximity is unavailable (phone off, BLE disabled, etc.), the system falls back to classic 2FA/password flows.

---

## 10. Success Metrics (Early Stage)

For early testing and validation:

- Time saved per login vs. traditional 2FA.
- Percentage of login attempts where proximity flow works on first try.
- User sentiment:
  - “This feels like magic.”
  - “This is more convenient than codes/emails.”
- Technical stability:
  - BLE connection reliability in realistic environments.
  - False positives/negatives on proximity.

---

## 11. Roadmap (High-Level)

### Phase 0 — Concept & Spec
- Write vision, architecture notes, patent reasoning.
- Map out flows for:
  - Onboarding
  - Pairing
  - Login with proximity
  - Fallback login

### Phase 1 — Prototype (Local, Single User)
- macOS desktop client + iOS app.
- Local pairing and proximity handshake.
- Demo web app using localhost integration.

### Phase 2 — Hosted Service (Early Alpha)
- Backend service to store device public keys and attestations.
- Simple developer API for apps to request “proximity verification tokens.”

### Phase 3 — Developer SDKs
- SDKs for:
  - Web (JavaScript)
  - Node/Rails backend
  - Browser extension integration

### Phase 4 — Standardization & Partnerships
- Work toward standardizing the protocol.
- Explore browser vendor and OS-level integration.
- Business model: B2B SaaS, developer-first pricing, possibly consumer tier.

---

## 12. Project Philosophy

P-MFA is built on a simple idea:

> Security should feel invisible when everything is normal,
> and only get in your way when something is wrong.

If we can make logging in feel as smooth as opening a car with keyless entry — while **increasing** security — we’ve created something genuinely new and defensible.
