/**
 * Minimal localStorage-backed wallet state.
 * Stores the user's wallet address after creation/import —
 * the backend session is managed by session cookies.
 */

const WALLET_ADDRESS_KEY = "jumpa_wallet_address";
const WALLET_ADDRESSES_KEY = "jumpa_wallet_addresses";

export interface StoredWallet {
  address: string;
  addresses: {
    eth: string;
    btc: string;
    sol: string;
    flow: string;
  };
}

export function saveWalletLocally(wallet: StoredWallet): void {
  localStorage.setItem(WALLET_ADDRESS_KEY, wallet.address);
  localStorage.setItem(WALLET_ADDRESSES_KEY, JSON.stringify(wallet.addresses));
  console.log("[WalletStore] Wallet saved locally:", wallet.address);
}

export function getStoredWallet(): StoredWallet | null {
  const address = localStorage.getItem(WALLET_ADDRESS_KEY);
  const addressesRaw = localStorage.getItem(WALLET_ADDRESSES_KEY);

  if (!address || !addressesRaw) {
    console.log("[WalletStore] No wallet found in localStorage");
    return null;
  }

  try {
    const addresses = JSON.parse(addressesRaw) as StoredWallet["addresses"];
    console.log("[WalletStore] Loaded wallet from localStorage:", address);
    return { address, addresses };
  } catch {
    console.error("[WalletStore] Failed to parse stored wallet addresses");
    return null;
  }
}

export function clearWalletLocally(): void {
  localStorage.removeItem(WALLET_ADDRESS_KEY);
  localStorage.removeItem(WALLET_ADDRESSES_KEY);
  console.log("[WalletStore] Wallet cleared from localStorage");
}

/** Returns true if a wallet has been set up on this device */
export function hasWallet(): boolean {
  return !!localStorage.getItem(WALLET_ADDRESS_KEY);
}
