# Jumpa: Autonomous Finance Engine

**Jumpa Backend** is a high-performance Next.js 16 API suite designed for the next generation of **Agent-native systems**. It serves as the bridge between human intent and on-chain execution, specifically optimized for **Flow EVM** and sustainable crypto economies.

Built for the **PL_Genesis: Frontiers of Collaboration** hackathon, Jumpa implements secure, programmable coordination primitives that empower autonomous agents to manage assets, execute swaps, and interact with DeFi protocols via natural language.

---

## 🚀 Track Alignment

- **Crypto & Economic Systems**: Native support for Flow EVM, USDC, and Multi-chain asset derivation.
- **AI & Robotics**: Integrated **Claude 4.5 Sonnet** intent engine for autonomous agent coordination.
- **Infrastructure & Digital Rights**: Sovereign, encrypted key management (AES-256-GCM) ensuring user data remains private and verifiable.

---

## 🛠️ Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 API Routes |
| **Logic/AI** | Anthropic SDK (Claude 3.5 Sonnet) |
| **Blockchain** | `viem` (EVM), `fcl` (Flow), `scure` (Crypto) |
| **Database** | MongoDB Atlas + Mongoose |
| **Auth** | `jose` (HS256 JWT cookie) |
| **Security** | Node.js `crypto` (AES-256-GCM + PBKDF2), `bcryptjs` |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18.17+ or 20.x
- MongoDB Atlas cluster (or local MongoDB)
- Anthropic API Key (for the Intent Engine)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root directory. 

> [!IMPORTANT]
> Next.js reads these values literally. Do **not** wrap them in quotes.

```env
# Database
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/jumpa-pl-genesis

# AI Intent Engine
ANTHROPIC_API_KEY=sk-ant-api03-...

# CORS Allowed Origins (Comma-separated or indexed)
NEXT_PUBLIC_ALLOWED_ORIGIN=http://localhost:5173
NEXT_PUBLIC_ALLOWED_ORIGIN_1=http://localhost:3000
NEXT_PUBLIC_ALLOWED_ORIGIN_2=http://any_other_url

# Auth & Sessions
AUTH_SECRET=<random_64_char_string>
AUTH_URL=http://localhost:3001
```

### 3. Run Development Server
```bash
npm run dev # Starts on port 3001
```

---

## API Endpoints

### System

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/health` | No | Health check → `{ status: 'ok' }` |
| `GET` | `/api/db-check` | No | Verifies MongoDB connection + Wallet indexes |

---

### Auth

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | No | `{ address, password }` → bcrypt verify → issues `jumpa_session` JWT cookie |
| `GET` | `/api/auth/me` | ✅ Session | Returns current session wallet info (`address`, `addresses`) |
| `POST` | `/api/auth/logout` | No | Clears `jumpa_session` cookie |

**Session:** HS256 JWT stored in `httpOnly` cookie (`jumpa_session`), signed with `AUTH_SECRET`, 7-day TTL.

---

### Wallet

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/wallet/phrase` | No | Generate a fresh 12-word BIP39 seed phrase. Stateless — nothing saved. |
| `POST` | `/api/wallet?action=create` | No | Save a new wallet from a freshly generated phrase |
| `POST` | `/api/wallet?action=import` | No | Save a wallet from an existing phrase |

**`POST /api/wallet`** body:
```json
{
  "phrase": "word1 word2 ... word12",
  "password": "min 8 chars",
  "pin": "1234"
}
```

Response `201`:
```json
{
  "message": "Wallet created",
  "address": "0x...",
  "addresses": { "eth": "...", "btc": "...", "sol": "...", "flow": "..." }
}
```

Errors:
- `400` — invalid input / invalid BIP39 phrase
- `409` — wallet with this seed already exists

**Security:**
- Mnemonic encrypted with AES-256-GCM (key = PBKDF2(password, uniqueSalt, 600k iterations))
- Unique `iv` and `salt` generated per wallet — never reused
- Password hashed with `bcrypt` (10 rounds), stored separately from encryption key
- PIN hashed with `bcrypt` (10 rounds), stored separately

---

---

### 🧠 AI Intent Engine (Claude 3.5 Sonnet)

The core of Jumpa's "Autonomous Finance" vision. This endpoint parses natural language into structured, actionable intents.

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/api/ai/intent` | ✅ Session | Human prompt → Intent (Send/Swap/Balance) |
| `GET` | `/api/ai/history` | ✅ Session | Returns the last 10 turns of persistent chat history |

**`POST /api/ai/intent`** body:
```json
{ "prompt": "Swap 0.1 FLOW for USDC" }
```
Response `200`:
```json
{
  "intent": "SWAP_TOKEN",
  "params": { "fromToken": "FLOW", "toToken": "USDC", "fromAmount": "0.1" },
  "message": "I've prepared a swap of 0.1 FLOW for USDC. Please confirm with your PIN."
}
```

---

### 💸 Intelligent Transactions

Jumpa goes beyond simple transfers, offering a high-performance execution layer for **Flow EVM**.

#### 1. Smart Swaps (PunchSwap V2)
Automatically probes multiple USDC variants on Flow EVM Testnet to find the deepest liquidity.

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/wallet/swap` | ✅ Session | Fetches real-time quote + identifies working token |
| `POST` | `/api/wallet/swap` | ✅ Session | Executes swap via PunchSwap V2 Router |

**`POST /api/wallet/swap`** body:
```json
{
  "fromAmount": "1.0",
  "fromToken": "FLOW",
  "toToken": "USDC",
  "pin": "1234",
  "workingToken": "0x..."
}
```

#### 2. Cross-Chain Ready Transfers
Standardized transfer logic for FLOW and ETH, with unified recipient management.

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/api/wallet/transfer` | ✅ Session | Send FLOW (Flow EVM) or ETH (Mainnet/Placeholder) |
| `GET` | `/api/wallet/recipients`| ✅ Session | Returns top 5 most recently used addresses |

---

---

### 🛡️ PIN Management
Secure operations are protected by a user-defined secondary authentication layer.

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/api/pin/verify` | ✅ Session | Verify 4-digit PIN. Locks after 5 wrong attempts (15 min). |
| `POST` | `/api/pin/change` | ✅ Session | Change PIN — requires current PIN verification first. |

**`POST /api/pin/verify`** Response `401`: `{ "error": "Incorrect PIN. N attempt(s) remaining" }`

---

## 🔒 Security Architecture: Sovereign Key Management

Jumpa is built on the principle of **user sovereignty**. Keys are never stored in plain text and never leave the application backend except for authorized transaction signing.

### 1. Military-Grade Encryption
Our multi-layered encryption scheme ensures that even with database access, your assets remain secure:
- **AES-256-GCM**: Industry-standard symmetric encryption for mnemonics.
- **PBKDF2**: Key derivation with `600,000` iterations to prevent brute-force attacks.
- **Unique Salting**: Every wallet generates a unique IV and Salt, ensuring identical phrases result in different ciphertext.

### 2. Hierarchical Deterministic (HD) Derivation
Jumpa uses industry-standard derivation paths to ensure portability across the global crypto ecosystem:
| Chain | Path | Purpose |
|---|---|---|
| **Ethereum** | `m/44'/60'/0'/0/0` | Primary EVM Assets |
| **Flow** | `m/44'/539'/0'/0/0` | Native Flow & Flow EVM |
| **Bitcoin** | `m/44'/0'/0'/0/0` | BTC  |
| **Solana** | `m/44'/501'/0'/0'` | SOL  |

---

## 🏗️ Data Model

### `wallets` collection

| Field | Type | Role |
|---|---|---|
| `address` | String | Primary identifier (lowercase ETH address) |
| `addresses.*` | Object | Map of derived addresses for FLOW, ETH, BTC, SOL |
| `encryptedMnemonic`| String | AES-256-GCM ciphertext |
| `iv` / `salt` | String | Unique encryption metadata |
| `passwordHash` | String | bcrypt hashed login password |
| `pinHash` | String | bcrypt hashed payment PIN |
| `pinLockedUntil` | Date? | Timestamp for brute-force lockouts |

---

## 🏛️ Architecture: Intent-to-Execution Pipeline

Jumpa operates on a modular "Intent" architecture, separating high-level user desire from low-level blockchain complexity.

1. **Intelligent Interface**: The user provides a natural language prompt (e.g., "Send 10 FLOW to 0x...").
2. **Intent Parsing**: The **Claude 3.5 Sonnet** engine parses the raw text into a structured JSON "Intent" (e.g., `SEND_FUNDS`).
3. **Context Enrichment**: The system fetches live balances and recent recipients to provide the LLM with real-time financial context.
4. **SECURE SIGNING**: Once the user provides their PIN, the backend decrypts the mnemonic in-memory, derives the private key, and signs the transaction.
5. **Flow EVM Settlement**: The signed transaction is broadcasted to the Flow EVM Network via high-speed RPC nodes.

---
