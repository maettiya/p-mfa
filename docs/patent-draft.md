_Inventor: Matthew Robert McLuckie_
_Date: 17th November 2025_

⸻

# Title of Invention

System and Method for Passive Proximity-Based Multi-Factor Authentication Using a Mobile
Device

⸻

# Technical Field

The present invention relates to computer security and user authentication. More specifically, it
relates to methods and systems for authenticating users to web applications, native applications,
and operating systems using the proximity of a trusted mobile device as a passive multi-factor
authentication signal.
⸻

# Background

Conventional authentication mechanisms for online services and applications largely rely on
passwords, one-time codes, hardware tokens, biometrics, or combinations of these factors. Even
with password managers and modern standards such as WebAuthn and FIDO2, users are
frequently required to interact explicitly with authentication prompts, enter codes, approve push
notifications, or click “Sign in” buttons.

These explicit interactions create friction, especially for users who log in to multiple services
repeatedly throughout the day. In addition, password reuse and phishing attacks remain
persistent security threats despite the availability of more secure credential-less methods.
Modern devices such as smartphones and wearables include secure hardware enclaves,
biometric sensors, and short-range wireless capabilities such as Bluetooth Low Energy (BLE), Wi-
Fi, and ultra-wideband (UWB). Some systems, such as car keyless entry or smart locks, already
use proximity of a device as part of the unlocking experience. However, these proximity
approaches are not generalized and standardized as a passive factor for web authentication
sessions across different services and browsers.

There is therefore a need for a system and method that allows a user’s presence and proximity,
as represented by a trusted mobile device, to act as a passive authentication factor for web
sessions and other applications, without requiring the user to manually enter credentials or
repeatedly approve prompts. Such a system should be compatible with existing identity and
session standards (e.g. OAuth2, OpenID Connect, WebAuthn) while reducing friction and
improving usability.

⸻

# Summary of the Invention

The invention provides a system and method for passive proximity-based multi-factor
authentication (P-MFA) that uses a user’s mobile device as a secure proximity token.
In one embodiment, the system comprises:

1. A mobile application running on a smartphone or similar device that maintains a
cryptographic key pair and can respond to proximity and authentication challenges.

2. A desktop or laptop agent that discovers and monitors nearby registered mobile devices
using a short-range wireless protocol such as BLE.

3. A browser extension or browser-integrated component that communicates with the desktop
agent and with a remote identity provider.

4. A remote authentication/identity server that verifies proximity assertions from the desktop
agent and mobile device, generates authentication tokens, and provides those tokens to web
applications and services.

When the user’s registered mobile device is detected within a defined proximity threshold of the
desktop or laptop device, a secure cryptographic handshake is performed between the mobile
application and the desktop agent. If verification is successful, the desktop agent and browser
extension cooperate to obtain an authentication token from the identity server and inject or
apply it to relevant web sessions. This enables automatic log-in or session continuation without
requiring the user to manually enter passwords or click additional prompts.
The system may also support automatic locking or session termination when the mobile device
moves beyond a defined distance, providing both improved security and convenience.
The invention extends existing authentication standards by introducing proximity of a trusted
personal device as a passive factor that can trigger secure log-in or re-authentication flows.

⸻

# Brief Description of the Drawings

• Figure 1: System architecture overview showing the mobile device, desktop/laptop agent,
browser extension, and identity server, along with communication channels (BLE, local IPC,
HTTPS).
• Figure 2: Flow diagram of the proximity detection and authentication handshake.
• Figure 3: Sequence diagram for automatic web session log-in using proximity-based P-MFA.
• Figure 4: Example user interface states in the browser extension (e.g. “P-MFA active,” “device
not nearby,” “session locked”).

⸻

# Detailed Description of the Invention

1. System Components
1.1 Mobile Device Component
The mobile device component is typically a smartphone running iOS, Android, or another
mobile operating system. A dedicated mobile application is installed which:
• Stores a private cryptographic key in a secure storage mechanism (e.g. Secure Enclave,
KeyStore).
• Advertises its presence to nearby devices via a short-range wireless protocol such as
Bluetooth Low Energy (BLE), Wi-Fi Direct, or UWB.
• Responds to cryptographic challenges from a paired desktop agent.
• Optionally requires user verification via biometrics or device unlock before authorizing
responses.
• Can be paired with one or more desktop or laptop devices and with the identity server.
1.2 Desktop/Laptop Agent
The desktop agent is a background process or application running on a user’s computer, such
as a macOS, Windows, or Linux device. The desktop agent:
• Scans for and detects nearby registered mobile devices using supported wireless protocols.
• Maintains a pairing relationship and device identifier for the user’s mobile device.
• Initiates and verifies cryptographic challenge–response handshakes with the mobile
application.
• Determines whether the mobile device is within a configured proximity threshold (e.g. based
on RSSI, distance estimate, or UWB ranging).
• Exposes a local communication interface (e.g. WebSocket, local HTTP, native messaging) that
allows a browser extension or local applications to query the current authentication/proximity
status.
1.3 Browser Extension or Browser Integration
A browser extension or integrated browser component communicates with the desktop agent
to:
• Determine whether the user’s registered mobile device is present and authenticated.
• Initiate authentication flows with a remote identity server (e.g. via OAuth2 / OpenID
Connect).
• Receive and manage authentication tokens, such as ID tokens, access tokens, or session
cookies.
• Inject tokens or apply them in the context of specific web origins or web applications,
enabling automatic login or session resumption.
1.4 Identity and Authentication Server
A remote identity server provides:
• Registration and management of user accounts and associated devices.
• Storage and/or verification of public keys corresponding to mobile device key pairs.
• APIs or endpoints for validating proximity assertions from the desktop agent and mobile
device.
• Token issuance using established protocols such as OAuth2, OpenID Connect, and/or
WebAuthn.
• Optional integration with third-party services or enterprise identity providers (e.g. SAML,
SCIM, or other single sign-on systems).

⸻

2. Proximity Detection and Authentication Flow
In one embodiment, the method operates as follows:
1. Device Registration
• The user installs the mobile application and desktop agent.
• The mobile application generates a public/private key pair and registers with the identity
server, providing the public key.
• The desktop agent is paired with the mobile device and registered under the user’s account.
2. Proximity Monitoring
• The desktop agent continuously or periodically scans for BLE advertisements or similar
signals emitted by the mobile application.
• When a signal is detected, the desktop agent estimates proximity (e.g. using RSSI, signal
strength, time-of-flight, or UWB distance) and determines whether the mobile device is within a
configured threshold.
3. Cryptographic Challenge–Response
• When the mobile device is within the threshold distance, the desktop agent sends a
cryptographic challenge to the mobile application via an established wireless connection.
• The mobile application signs the challenge or generates a response using the private key
stored on the device.
• The desktop agent verifies the response using the corresponding public key, either locally (if
cached) or via the identity server.
4. Proximity Assertion and Token Request
• Upon successful verification, the desktop agent generates a proximity assertion that
indicates:
• The user’s device ID
• A timestamp or validity period
• The computed proximity status
• A signature or MAC from the desktop agent.
• The browser extension uses this proximity assertion to call the identity server and request an
authentication or session token for a particular web application or origin.
5. Token Issuance and Session Establishment
• The identity server validates the proximity assertion and checks user account status and
device registration.
• If valid, it issues an authentication token (e.g. JWT, session cookie, or other protocol-specific
token).
• The browser extension receives the token and injects it into the context of the target website,
thereby logging the user in or refreshing their authenticated session automatically.
6. Session Continuity and Locking
• The desktop agent continues to monitor proximity. If the mobile device moves beyond the
threshold or is no longer detected, the system may:
• Lock the user’s session
• Require re-authentication
• Invalidate or refresh tokens according to security policy.
• Additional signals, such as device idle time or OS lock state, may be combined with proximity
to determine session state.

⸻

3. Alternative Embodiments
• 3.1 Multi-Device Support
The system can support multiple registered mobile devices per user (e.g. phone and
smartwatch). Proximity of any trusted device may satisfy the presence requirement, with different
policies (e.g. stronger requirements for sensitive actions).
• 3.2 Different Wireless Technologies
While BLE is a primary implementation, other technologies such as UWB, NFC, or Wi-Fi RTT can
be used for more precise ranging or better performance in different environments.
• 3.3 OS-Level Integration
In another embodiment, the desktop agent integrates directly with the operating system login
session (e.g. macOS, Windows) to unlock the device when the mobile device is nearby and lock
it when the device departs. The same mechanisms can be extended to web browsers or native
apps.
• 3.4 Enterprise Single Sign-On
The identity server may act as a front-end to enterprise SSO providers (e.g. SAML, OpenID
Connect) and simply add proximity-based P-MFA as an additional factor before granting access
to corporate applications.
• 3.5 Explicit vs. Fully Passive Mode
In some configurations, the user may still be required to approve a notification or biometric
prompt on the mobile device the first time, after which proximity is used to keep sessions alive
without repeated prompts. In other configurations, the system may work fully passively, relying
on device unlock state and other signals.
• 3.6 Browserless or Native Applications
The same proximity and identity mechanisms may be used to authenticate users into native
desktop applications, APIs, or command-line tools, not just web browsers.

⸻

# Advantages

The invention provides several advantages over existing authentication systems:
• Reduced friction: Users do not need to repeatedly type passwords, enter codes, or click
login buttons as long as their trusted device is nearby.
• Improved security: Proximity of a registered device with a securely stored private key is
difficult to phish or replicate remotely.
• Compatibility: The system can be layered on top of existing identity protocols such as
OAuth2, OpenID Connect, WebAuthn, SAML, and others.
• Automatic locking: Sessions can be automatically locked or invalidated when the trusted
device is no longer in proximity.
• User experience: Authentication becomes more analogous to “car key proximity unlock,”
creating a more seamless and intuitive experience.
⸻
Example Claims (Optional – Provisional doesn’t require them, but good to include)
1. A method of authenticating a user to a web application, the method comprising:
• detecting, by a desktop computing device, a registered mobile device within a proximity
threshold using a short-range wireless communication protocol;
• performing a cryptographic challenge–response with an application on the mobile device,
the challenge–response using a private key stored on the mobile device and a corresponding
public key;
• upon successful verification of the challenge–response, generating a proximity assertion;
• transmitting the proximity assertion to an identity server;
• receiving, from the identity server, an authentication token for the web application; and
• applying the authentication token in a web browser to log the user into the web application
without requiring manual entry of credentials.
2. The method of claim 1, wherein the short-range wireless communication protocol comprises
Bluetooth Low Energy (BLE).
3. The method of claim 1 or 2, further comprising monitoring the proximity of the mobile
device and revoking or locking the session when the mobile device moves beyond the proximity
threshold.
4. A system for proximity-based multi-factor authentication, comprising:
• a mobile device configured to store a private cryptographic key and respond to
authentication challenges;
• a desktop agent configured to detect the mobile device via wireless communication and
verify cryptographic challenge–response messages;
• a browser extension configured to request authentication tokens based on proximity
assertions; and
• an identity server configured to validate proximity assertions and issue authentication tokens
for web applications.
5. The system of claim 4, wherein the identity server issues tokens compliant with OAuth2,
OpenID Connect, WebAuthn, or combinations thereof.
6. The system of any of the above claims, wherein the desktop agent additionally controls
locking and unlocking of the desktop operating system based on the proximity of the mobile
device.

# Inventor: Matthew Robert McLuckie
# Date: 17th November 2025
