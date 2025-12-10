# P-MFA — Proximity Multi-Factor Authentication

**Your phone is your key. Walk up. Log in. That's it.**

P-MFA is a proximity-based authentication system that uses your phone as a cryptographically secure "key fob" to automatically unlock accounts and devices when you're physically nearby — like keyless entry for your digital life.

---

## The Problem

Authentication today is broken:

- **Slow**: Password → open authenticator app → copy code → paste → hope it hasn't expired
- **Fragmented**: Different apps, different flows, different friction
- **Still vulnerable**: Phishing, social engineering, credential stuffing

Even with 2FA, we've traded security for constant interruption.

## The Solution

**What if logging in worked like unlocking your car?**

> If your key is nearby, the car unlocks. If not, nothing happens.

P-MFA brings this pattern to digital authentication:

- Your **phone** broadcasts a secure, encrypted Bluetooth signal
- Your **laptop** detects it and verifies your identity cryptographically
- **Websites and apps** get a signed proof that you're physically present
- You **just log in** — no codes, no apps, no friction

---

## How It Works

```
┌─────────────────┐         BLE          ┌─────────────────┐
│   Your Phone    │◄────────────────────►│  Desktop Client │
│  (Trusted Key)  │   Encrypted Signal   │   (Listener)    │
└─────────────────┘                      └────────┬────────┘
                                                  │
                                                  │ Localhost API
                                                  ▼
                                         ┌─────────────────┐
                                         │   Website/App   │
                                         │  "Is user here?"│
                                         └────────┬────────┘
                                                  │
                                                  │ Verify Token
                                                  ▼
                                         ┌─────────────────┐
                                         │  P-MFA Backend  │
                                         │ (Token Issuer)  │
                                         └─────────────────┘
```

### Three Components

1. **Mobile App** (iOS/Android) — Your trusted device that broadcasts encrypted BLE presence
2. **Desktop Listener** — Detects your phone, performs cryptographic handshake, exposes local API
3. **Backend Service** — Manages device pairing, issues signed proximity verification tokens

---

## Key Features

- **Zero-friction login** — No codes to type, no apps to open
- **Cryptographically secure** — Ed25519 signatures, X25519 key exchange, AES-GCM encryption
- **Privacy-preserving** — Private keys never leave your devices
- **Relay-resistant** — Rotating BLE IDs, RSSI validation, time-bound challenges
- **Graceful fallback** — Falls back to traditional 2FA when proximity isn't available
- **Auto-lock capable** — Sessions can lock when your phone leaves proximity

---

## Project Status

**Current phase: Prototype**

### What's Built
- [x] Desktop BLE listener (Node.js)
- [x] Local API server for proximity queries
- [x] BLE device scanning and tracking
- [ ] iOS mobile app
- [ ] Device pairing flow
- [ ] Backend token service
- [ ] Browser extension / SDK

---

## Getting Started

### Desktop Listener

```bash
cd src/desktop-listener
npm install
node index.js
```

The listener starts scanning for BLE devices and exposes a local API.

---

## Architecture

See [docs/architecture.md](docs/architecture.md) for the full technical specification including:

- Cryptographic protocols (X25519, Ed25519, AES-GCM)
- BLE advertisement payload structure
- Pairing and authentication flows
- Security model and anti-relay measures

## Vision

See [docs/vision.md](docs/vision.md) for the complete product vision, target users, and roadmap.

---

## Security Model

P-MFA is designed with security as a core principle:

| Layer | Protection |
|-------|------------|
| Device binding | Trust tied to physical phone, not just account |
| Key management | Private keys stored in Secure Enclave, never transmitted |
| BLE security | Rotating IDs every 100-300ms, encrypted payloads |
| Anti-relay | RSSI validation, time-bound challenges, freshness checks |
| Fallback | Graceful degradation to traditional 2FA |

---

## Why This Matters

Authentication should be **invisible when everything is normal** and only get in your way when something is wrong.

P-MFA aims to:
- Make secure login as natural as walking up to your desk
- Eliminate the "security vs. convenience" tradeoff
- Create a protocol that any app, browser, or OS can adopt

---

## License

[To be determined]

---

## Contributing

This project is in early development. Check back for contribution guidelines.

---

*P-MFA: Because the best authentication is the kind you don't notice.*
