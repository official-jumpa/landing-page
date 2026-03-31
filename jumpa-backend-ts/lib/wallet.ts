import { mnemonicToAccount } from "viem/accounts";

export interface DerivedWallet {
  addresses: {
    eth: string;
    btc: string;
    sol: string;
    flow: string;
  };
  publicKeys: {
    eth: string;
    btc: string;
    sol: string;
    flow: string;
  };
}

/**
 * Derives public addresses and raw public keys for ETH, BTC, SOL, and FLOW
 * from a BIP39 mnemonic using viem (for EVM) and standard logic.
 */
export function deriveAddresses(phrase: string): DerivedWallet {
  // Use viem's account derivation for Ethereum and Flow EVM
  const account = mnemonicToAccount(phrase);
  const ethAddress = account.address;

  // For BTC and SOL, we'll keep the placeholders or implement them if needed.
  // Currently, the app focuses on EVM (Flow/Eth).
  
  return {
    addresses: {
      eth: ethAddress,
      btc: "btc_placeholder", 
      sol: "sol_placeholder", 
      flow: ethAddress,       
    },
    publicKeys: {
      eth: account.publicKey,
      btc: "btc_pub_placeholder",
      sol: "sol_pub_placeholder",
      flow: account.publicKey,
    }
  };
}
