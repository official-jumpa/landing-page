# Jumpa: AI-First Autonomous PWA

> **Jumpa** is a premium, mobile-first autonomous PW. It serves as the primary UX layer for the Jumpa Autonomous Finance Engine, translating complex blockchain interactions into a fluid, human-centric "phone-frame" experience. It combines a crypto multi-wallet, fiat financial services (loans, savings, withdrawals), airtime top-ups, group finance, KYC verification, and an AI-powered assistant (3rike AI) into a single, phone-frame UI.

---

## Table of Contents

1. [PL_Genesis Hackathon Tracks](#-pl_genesis-hackathon-tracks)
2. [Tech Stack: Next-Gen Performance](#-tech-stack-next-gen-performance)
3. [Project Structure](#project-structure)
4. [Architecture Overview](#architecture-overview)
5. [Routing Map](#routing-map)
6. [Features & Pages Walkthrough](#-features--pages-walkthrough)
7. [Component Library](#component-library)
8. [Data Models](#data-models)
9. [Internationalisation (i18n)](#internationalisation-i18n)
10. [Layouts](#layouts)
11. [Static Assets](#static-assets)
12. [Getting Started](#-getting-started)
13. [Scripts](#-scripts)
14. [Architecture & Configuration](#-architecture--configuration)

---

## 🛰️ PL_Genesis Hackathon Tracks

Jumpa is engineered to push the boundaries of high-performance consumer coordination:

- **AI & Robotics**: Features a deeply integrated **3rike AI** assistant powered by **Claude 4.5 Sonnet**. The interface parses natural language into on-chain intents (Sends, Swaps, Balance checks) with multi-turn context.
- **Crypto & Economic Systems**: First-class support for **Flow EVM**. Includes a bespoke **Smart Trade** interface integrated with **PunchSwap V2** for real-time liquidity probing and high-efficiency token swaps.
- **Infrastructure & Digital Rights**: Implements a **Sovereign Onboarding** flow where users maintain total control over their encrypted mnemonic phrases and PIN-secured execution layers.

---

## ⚡ Tech Stack: Next-Gen Performance

| Layer | Technology | Highlights |
|---|---|---|
| **Framework** | **React 19** | Concurrent rendering & optimized state management |
| **Styling** | **Tailwind CSS v4** | Next-generation utility-first CSS |
| **Animations**| **Framer Motion 12** | Fluid micro-interactions and layout transitions |
| **Logic/AI** | **Claude 4.5 Sonnet** | Advanced intent parsing and autonomous coordination |
| **Web3** | **Flow EVM** | High-speed, consumer-ready on-chain settlement |
| **PWA Core** | `vite-plugin-pwa` | Installable mobile experience with offline-first UI |
| **Language** | TypeScript 5.9 | Type-safe development across the stack |
| **UI Kit** | Radix UI | Accessible, unstyled primitives for custom design |

---

## Project Structure

```
jumpa-frontend-ts/
├── public/                     # Static assets (SVG icons, PNGs, locales)
│   ├── locales/                # i18n translation files (en, es, fr)
│   └── coins/                  # Crypto coin icons
├── src/
│   ├── App.tsx                 # Root router — all route declarations
│   ├── main.tsx                # React entry point
│   ├── assets/                 # Bundled image assets (imported at build time)
│   ├── global/
│   │   └── i18n.ts             # i18next initialisation
│   ├── lib/
│   │   └── utils.ts            # Shared utility (cn() for class merging)
│   ├── data/                   # Static typed data / mock fixtures
│   │   ├── wallets.ts          # Wallet & MainWallet type definitions + mock data
│   │   ├── navItems.ts         # Sidebar navigation items
│   │   └── quickTransfers.ts   # Quick-transfer contact fixtures
│   ├── layouts/
│   │   ├── HomeLayout.tsx      # Authenticated app shell with context
│   │   └── HomeLayout.css
│   ├── components/
│   │   ├── ui/                 # Shadcn-style primitive components
│   │   ├── common/             # Shared app-level components (TopBar, FAB)
│   │   ├── modal/              # Overlay/modal/sheet components
│   │   ├── pin/                # PIN entry screen
│   │   └── wallet/             # Private key display screen
│   ├── features/
│   │   └── send/               # Send-money feature module
│   └── pages/
│       ├── index.ts            # Barrel file — all page exports
│       ├── landing/            # Public marketing landing page
│       ├── onboarding/         # New user onboarding flow
│       ├── auth/               # Login & Forgot-password flows
│       ├── send/               # Send-money flow (multi-step)
│       ├── chat/               # AI chat interface
│       ├── no-match/           # 404 page
│       └── home/               # Authenticated area (behind HomeLayout)
│           ├── dashboard/      # Main wallet dashboard
│           ├── 3rikeAi/        # AI assistant dashboard
│           ├── airtime/        # Airtime top-up flow
│           ├── group/          # Group savings/finance flow
│           ├── loan/           # Loan request & management
│           ├── savings/        # Savings plans & targets
│           ├── withdraw/       # Withdrawal (bank & crypto)
│           ├── investment/     # Investment dashboard
│           ├── settings/       # Profile, payment & PIN settings
│           ├── verification/   # KYC identity verification
│           ├── notification/   # Driver/app notification centre
│           ├── create-account/ # Wallet creation & import
│           ├── subpages/       # Inline sub-pages (Trade, DApp)
│           └── components/     # Dashboard-scoped components
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite + Tailwind + path alias config
├── components.json             # Shadcn component config
├── tsconfig*.json              # TypeScript configs
├── eslint.config.js            # ESLint config
└── vercel.json                 # Vercel deployment config
```

---

## Architecture Overview

```
BrowserRouter (App.tsx)
│
├── Public routes (no layout)
│   ├── /                  → Landing (wrapped in <Layout> with Navbar + Footer)
│   ├── /create-account
│   ├── /login, /login-success
│   ├── /forgot-password-email, /verify-email
│   ├── /onboarding
│   ├── /import-options, /save-recovery, /private-keys, /notifications
│   ├── /send              → SendMoneyFlow (multi-screen)
│   ├── /send-screens      → SendScreens (standalone previews)
│   └── /chat              → AiChat
│
└── /home (HomeLayout — authenticated shell)
    ├── index              → JumpaDashboard
    ├── 3rikeAi            → AiDashboard
    ├── airtime            → AirtimeFlow
    ├── group              → GroupFlow
    ├── notification       → DriverNotification
    ├── verification/      → KYC flow (form → success / failed / retry)
    ├── loan/              → LoanDashboard → submitted / notification
    ├── withdraw/          → PIN → bank-details → send-money / crypto / crypto-withdraw
    ├── savings/           → Onboarding → dashboard → target → create-target → summary → notification → success
    ├── investment/        → InvestmentHome
    └── settings/          → Home → profile / payment → change-pin
```

### HomeLayout Context (`useHomeLayout`)

`HomeLayout` is the authenticated shell that wraps all `/home` routes. It owns all global modal/overlay state and exposes it via a React context (`HomeLayoutContext`) so any deeply nested dashboard component can trigger overlays without prop-drilling.

**Exposed actions:**

| Action | Effect |
|---|---|
| `onToggleBalance` | Hides/shows wallet balance |
| `onOpenMenu` | Opens the side drawer |
| `onWalletDropdown` | Opens the wallet list modal |
| `onVirtualAccount` | Opens the virtual account modal |
| `onWithdrawal` | Opens the withdrawal options sheet |
| `onTrade` | Renders the inline Trade sub-page |
| `onDApp` | Renders the inline DApp sub-page |
| `onReceive` | Opens the deposit method sheet |

---

## Routing Map

| Path | Component | Description |
|---|---|---|
| `/` | `Landing` | Public marketing page |
| `/create-account` | `CreateAccountForm` | Wallet creation |
| `/login` | `LoginForm` | Login |
| `/login-success` | `LoginSuccess` | Post-login confirmation |
| `/forgot-password-email` | `ForgotPasswordEmailForm` | Password reset entry |
| `/verify-email` | `VerifyEmail` | Email verification |
| `/onboarding` | `Onboarding` | New user onboarding |
| `/import-options` | `ImportOptions` | Import wallet options |
| `/save-recovery` | `SaveRecoveryPhrase` | Recovery phrase backup |
| `/private-keys` | `ImportPrivateKey` | Private key import |
| `/notifications` | `Notifications` | Notification setup |
| `/send` | `SendMoneyFlow` | Fiat send money |
| `/send-screens` | `SendScreens` | Design preview screens |
| `/chat` | `AiChat` | AI chat interface |
| `/home` | `JumpaDashboard` | Main wallet dashboard |
| `/home/3rikeAi` | `AiDashboard` | AI features dashboard |
| `/home/airtime` | `AirtimeFlow` | Buy airtime |
| `/home/group` | `GroupFlow` | Group finance |
| `/home/notification` | `DriverNotification` | Notifications |
| `/home/verification` | `VerifyAccountForm` | KYC start |
| `/home/verification/success` | `VerificationSuccess` | KYC success |
| `/home/verification/failed` | `VerificationFailed` | KYC failure |
| `/home/verification/retry` | `VerificationFailedForm` | KYC retry |
| `/home/loan` | `LoanDashboard` | Loan overview |
| `/home/loan/submitted` | `LoanRequestSuccess` | Loan submitted |
| `/home/loan/notification` | `LoanNotification` | Loan alerts |
| `/home/withdraw` | `SetPinWithdraw` | Withdrawal PIN |
| `/home/withdraw/bank-details` | `WithdrawBankDetails` | Bank details form |
| `/home/withdraw/send-money` | `WithdrawSendMoney` | Confirm withdrawal |
| `/home/withdraw/crypto` | `SelectCryptoAsset` | Pick crypto for withdrawal |
| `/home/withdraw/crypto-withdraw` | `WithdrawCryptoAsset` | Crypto withdrawal |
| `/home/savings` | `SavingsOnboarding` | Savings intro |
| `/home/savings/dashboard` | `SavingsDashboard` | Savings overview |
| `/home/savings/target` | `SavingsTargetDashboard` | Target savings list |
| `/home/savings/create-target` | `SavingsTargetForm` | Create savings target |
| `/home/savings/summary` | `SavingsSummary` | Target summary |
| `/home/savings/notification` | `SavingsNotification` | Savings alerts |
| `/home/savings/success` | `SavingsTargetSuccess` | Target created |
| `/home/investment` | `InvestmentHome` | Investment dashboard |
| `/home/settings` | `SettingsHome` | Settings overview |
| `/home/settings/profile` | `SettingsProfile` | Profile management |
| `/home/settings/payment` | `PaymentSettings` | Payment preferences |
| `/home/settings/change-pin` | `ChangePaymentPin` | PIN change |
| `*` | `NoMatch` | 404 catch-all |

---

## Features & Pages

### 1. Public Landing Page (`/`)
A high-conversion marketing interface built with **Framer Motion 12** and **Tailwind v4**:
- **Scroll-Reactive Header**: Transparent-to-blur transitions with scroll progress tracking.
- **Bento Grid Services**: High-density feature showcase using modern CSS grid.
- **Security & FAQ**: Built-in trust signals for consumer DeFi.

### 2. Sovereign Onboarding & Auth
Deeply integrated with the Jumpa Backend’s encryption layer:
- **Wallet Creation**: Native BIP39 phrase generation with offline-first "write down" flow.
- **Encrypted Import**: Support for importing existing wallets via private keys or phrases.
- **PIN-Secured UI**: All sensitive operations (revealing keys, confirming trades) are protected by a local-first PIN entry screen.

### 3. Smart Trade: PunchSwap V2
The flagship DeFi feature for the **Crypto & Economic Systems** track:
- **Liquidity Probing**: Real-time quote engine that searches multiple USDC variants on Flow EVM Testnet.
- **Secure Swap**: A multi-step confirmation flow that requires a Payment PIN to decrypt the signing key.
- **Live FlowScan Links**: Instant feedback with direct links to the Flow EVM explorer.

### 4. 3rike AI: Autonomous Agent (`/home/3rikeAi` & `/chat`)
The core of the **AI & Robotics** track integration:
- **Claude 4.5 Sonnet Integration**: Connects to the backend’s LLM engine to parse complex natural language.
- **Intent-based Transactions**: Users can say "Send 5 FLOW to @Ola" or "Swap all my USDC for FLOW", and the AI prepares the transaction data for one-tap execution.
- **Persistent Memory**: Multi-turn chat history synced across sessions via MongoDB.

### 5. Multi-Chain Dashboard (`/home`)
- **Real-time Balances**: Unified view of FLOW, USDC, and ETH assets.
- **Quick Actions**: One-tap access to Send, Receive, and Trade (Swap) flows.
- **DeFi Shortcuts**: Integrated modules for Loans, Savings, and Investments.

### 6. Savings & Financial Goals (`/home/savings`)
- **Target-based Savings**: Full CRUD flow for creating and managing financial targets.
- **Automated Notifications**: Real-time alerts for goal progress and milestones.

---

## Component Library

### `src/components/ui/` — Primitive UI Components

| Component | Notes |
|---|---|
| `button.tsx` | CVA-based polymorphic button with variants |
| `input.tsx` | Styled text input |
| `label.tsx` | Radix Label wrapper |
| `form.tsx` | React Hook Form context wrappers |
| `select.tsx` | Radix Select with custom styling |
| `tabs.tsx` | Radix Tabs |
| `switch.tsx` | Radix Switch |
| `popover.tsx` | Radix Popover |
| `calendar.tsx` | React Day Picker calendar |
| `drawer.tsx` | Vaul drawer |
| `card.tsx` | Card container |
| `pinInput.tsx` | 4/6-digit PIN input component |
| `layout.tsx` | Public layout wrapper (Navbar + Footer + Outlet) |
| `navbar.tsx` | Public site navigation bar |
| `footer.tsx` | Public site footer |
| `SideDrawer.tsx` | Authenticated app side navigation drawer |

### `src/components/common/`

| Component | Notes |
|---|---|
| `TopBar.tsx` | Authenticated screen header bar |
| `FloatingSupportButton.tsx` | Floating action button for support/AI access |

### `src/components/modal/`

| Component | Notes |
|---|---|
| `WalletListModal.tsx` | Lists all user wallets for selection |
| `WalletDetailsModal.tsx` | Wallet detail view with copy address / private key actions |
| `VirtualAccountModal.tsx` | Displays virtual bank account number |
| `DepositMethodSheet.tsx` | Bottom sheet for choosing deposit method |
| `coming-soon.tsx` | Generic "coming soon" placeholder modal |

### `src/components/pin/`
`PinEntryScreen` — full-screen PIN entry overlay, used before revealing private keys.

### `src/components/wallet/`
`PrivateKeyScreen` — full-screen private key display with security warnings.

---

## Data Models

### `Wallet` (`src/data/wallets.ts`)
```ts
interface Wallet {
  id: string;        // e.g. 'btc', 'eth', 'sol', 'ama'
  name: string;
  symbol?: string;
  address: string;   // truncated display address
  fullAddress: string;
  balance: string;
  privateKey: string;
  color: string;     // brand hex colour
}
```
Supported wallets: **BTC**, **ETH**, **SOL**, **AMA** (Jumpa's native token).

### `MainWallet` (`src/data/wallets.ts`)
```ts
interface MainWallet {
  name: string;
  address: string;
  balance: string;
  change: string;             // e.g. '+6.12%'
  changeDirection: 'up' | 'down';
  token: string;              // e.g. 'USDC'
}
```

### `NavItem` (`src/data/navItems.ts`)
```ts
interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  enabled: boolean;
}
```
Navigation items: **Home**, **DApp**, **Trade**.

---

## Internationalisation (i18n)

Configured in `src/global/i18n.ts` using **i18next** with:

- **Supported languages:** `en`, `es`, `fr`
- **Default language:** `en`
- **Namespace:** `public`
- **Translation files:** `public/locales/{lng}/public.json`
- **Language detection:** browser-based via `i18next-browser-languagedetector`
- **Loading:** HTTP backend (`i18next-http-backend`) — translations are loaded lazily at runtime
- **React integration:** `useSuspense: true`

To add a new language, add the locale code to the `languages` array in `i18n.ts` and create the corresponding `public/locales/{lng}/public.json` file.

---

## Layouts

### `Layout` (public — `src/components/ui/layout.tsx`)
Used for the landing page (`/`). Renders `<Navbar>`, `<Outlet>`, and `<Footer>`.

### `HomeLayout` (authenticated — `src/layouts/HomeLayout.tsx`)
Shell for all `/home/**` routes. Responsibilities:
- Renders `<TopBar>` and `<Outlet>` (routed page)
- Manages a `phone-frame` / `jumpa-theme-wrapper` CSS container (mobile viewport simulation)
- Owns all modal/overlay state (wallet list, wallet details, virtual account, deposit sheet, PIN, private key, withdrawal)
- Exposes state and handlers via `HomeLayoutContext` / `useHomeLayout()` hook
- Renders inline sub-pages (`TradePage`, `DAppPage`) based on `currentPage` state rather than routing

---

## Static Assets

All static assets live in `public/` and are referenced by URL path:

| Asset | Purpose |
|---|---|
| `logo.svg` / `logo.jpg` | App logo |
| `large-logo.svg` | Large branding logo |
| `heromain.svg` / `heromain.png` | Landing page hero illustration |
| `bento0.svg`, `bento3.svg` | Bento-grid marketing illustrations |
| `coins/` | Individual crypto coin icons |
| `airtime_bg.svg` | Airtime flow background |
| `airtime_success.svg` | Airtime success illustration |
| `verify-account.svg` | KYC page illustration |
| `notifications.svg` | Notification screen illustration |
| `purple-coin.svg` / `yellow-coin.svg` | Decorative coin assets |
| `avatar_1.svg`, `avatar_2.svg` | User avatar placeholders |
| `airtel.svg`, `mtn.svg`, `glo.svg` | Network operator logos |
| `service1–4.png` | Service card images |
| `locales/` | i18n JSON files |

---

## Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
cd jumpa-frontend-ts
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173` by default. The app renders in a phone-frame simulation for authenticated routes — view at a narrow viewport or use browser DevTools mobile emulation for best results.

### Build

```bash
npm run build
```

Runs TypeScript compilation (`tsc -b`) followed by Vite production build. Output lands in `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Starts the development server with HMR |
| `build` | `tsc -b && vite build` | Type-checks and builds the production bundle |
| `preview` | `vite preview` | Previews the production build locally |
| `lint` | `eslint .` | Runs ESLint for code quality checks |

---

## Architecture & Configuration

### Vite & Tailwind v4
Jumpa utilizes the latest **Vite 7** with the **SWC** transform for lightning-fast builds. Styling is powered by the **Tailwind CSS v4** engine, which is integrated directly as a Vite plugin, eliminating the need for a legacy `tailwind.config.js`.

### PWA Capabilities
Powered by `vite-plugin-pwa`, the app is fully installable on iOS and Android, providing a native-like experience with splash screens and standalone windowing.

### Client-side Routing
Built with **React Router DOM v7**, Jumpa uses a catch-all rewrite strategy (configured in `vercel.json`) to support seamless deep-linking in single-page application environments.

### Type Safety
The project employs a multi-config TypeScript setup:
- `tsconfig.json`: Root orchestration.
- `tsconfig.app.json`: Strict rules for the application source.
- `tsconfig.node.json`: Configuration for build-time tooling.

---

## Evolution of Collaboration
Jumpa was built to demonstrate how **AI Agents** and **High-Performance Blockchains** like **Flow** can converge to create a new frontier of collaborative finance. 
