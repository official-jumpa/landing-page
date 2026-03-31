# Jumpa: Autonomous Finance Ecosystem

> **Jumpa** is a next-generation autonomous finance ecosystem built for the **PL_Genesis: Frontiers of Collaboration** hackathon. It combines the power of **Claude 4.5 Sonnet** with the high-performance **Flow EVM** to create 
a seamless, agent-native financial experience.

---

## Project Architecture

The Jumpa ecosystem is divided into two primary high-performance components:

### [Jumpa Frontend (PWA)](jumpa-frontend-ts/README.md)
An AI-first, mobile-optimized interface built with **React 19**, **Tailwind v4**, and **Framer Motion 12**. 
- Highlights: **3rike AI** chat interface, **PunchSwap V2** integration, and sovereign onboarding flows.

### [Jumpa Backend (Engine)](jumpa-backend-ts/README.md)
A robust TypeScript engine that drives the intelligence and security of the system.
- Highlights: **Claude 4.5 Sonnet** Intent Parsing, **AES-256-GCM** sovereign key management, and **Flow EVM** settlement layer.

---

## 🛰️ PL_Genesis Hackathon Tracks

Jumpa addresses three core frontiers of collaboration:
- **AI & Robotics**: Converting natural language financial intent into autonomous on-chain actions.
- **Crypto & Economic Systems**: Enabling high-efficiency token swaps and multi-chain economy coordination on **Flow**.
- **Infrastructure & Digital Rights**: Ensuring user sovereignty through encrypted, self-custodial key management.

---

## 🚀 Quick Start

To run the entire ecosystem locally:

1. **Start the Backend Engine**:
   ```bash
   cd jumpa-backend-ts && npm install && npm run dev
   # Runs on http://localhost:3001
   ```

2. **Start the Frontend Interface**:
   ```bash
   cd jumpa-frontend-ts && npm install && npm run dev
   # Runs on http://localhost:5173
   ```

---