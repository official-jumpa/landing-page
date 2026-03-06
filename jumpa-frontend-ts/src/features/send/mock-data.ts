import type { Recipient, Token } from "./types";

export const mockRecipients: Recipient[] = [
  {
    id: "91679078",
    name: "Anita",
    address: "0xB7...BYz9",
    bank: "Opay",
  },
  {
    id: "916945687",
    name: "Anita Bernard",
    address: "0xB7...BYz9",
    avatar: "AB",
    bank: "Opay",
  },
  {
    id: "916934209",
    name: "Lukas",
    address: "0xB7...BYz9",
    avatar: "LU",
    bank: "Opay",
  },
  {
    id: "916901278",
    name: "Manuel",
    address: "0xB7...BYz9",
    avatar: "MA",
    bank: "Opay",
  },
  {
    id: "916902331",
    name: "Nwakaego",
    address: "0xB7...BYz9",
    avatar: "NW",
    bank: "Opay",
  },
];

export const defaultRecipient: Recipient = {
  id: "916945687",
  name: "Anon",
  address: "0xB7...BYz9",
  bank: "Opay",
};

export const mockTokens: Token[] = [
  {
    id: "sol",
    symbol: "Solana",
    name: "Solana",
    balanceText: "0.0192 SOL",
    iconLabel: "S",
    iconColor: "bg-black text-cyan-300",
  },
  {
    id: "usdc-eth",
    symbol: "USDC",
    name: "USD Coin",
    balanceText: "0.0192 USDC",
    iconLabel: "U",
    iconColor: "bg-blue-600 text-white",
    chainBadge: { label: "E", color: "bg-slate-100", textColor: "text-slate-700" },
  },
  {
    id: "usdt-sol",
    symbol: "USDT",
    name: "Tether",
    balanceText: "0.0192 USDT",
    iconLabel: "T",
    iconColor: "bg-emerald-500 text-white",
    chainBadge: { label: "S", color: "bg-slate-100", textColor: "text-slate-700" },
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    balanceText: "0.0192 Eth",
    iconLabel: "E",
    iconColor: "bg-indigo-500 text-white",
  },
  {
    id: "usdc-celo",
    symbol: "USDC",
    name: "USD Coin",
    balanceText: "0.00 USDC",
    iconLabel: "U",
    iconColor: "bg-blue-600 text-white",
    chainBadge: { label: "C", color: "bg-yellow-300", textColor: "text-black" },
  },
];

export const defaultToken: Token = {
  id: "naira",
  symbol: "Naira",
  name: "Naira",
  balanceText: "81.07",
  iconLabel: "N",
  iconColor: "bg-violet-600 text-white",
};
