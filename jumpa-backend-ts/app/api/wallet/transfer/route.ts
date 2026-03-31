import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, createWalletClient, http, parseEther, formatEther, defineChain } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { mnemonicToAccount } from "viem/accounts";
import { withAuth } from "@/lib/withAuth";
import { Wallet as WalletModel } from "@/models/Wallet";
import { Transaction as TransactionModel } from "@/models/Transaction";
import { decryptMnemonic } from "@/lib/crypto";

const flowTestnet = defineChain({
  id: 545, // testnet
  name: 'Flow EVM Testnet',
  network: 'flow-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Flow',
    symbol: 'FLOW',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.evm.nodes.onflow.org'],
    },
    public: {
      http: ['https://testnet.evm.nodes.onflow.org'],
    },
  },
  blockExplorers: {
    default: { name: 'FlowScan', url: 'https://evm-testnet.flowscan.io' },
  },
  testnet: true,
});


const ethPublicClient = createPublicClient({
  chain: mainnet,
  transport: http("https://eth.llamarpc.com"),
});

const flowPublicClient = createPublicClient({
  chain: flowTestnet,
  transport: http(),
});

const ethWalletClient = createWalletClient({
  chain: mainnet,
  transport: http("https://eth.llamarpc.com"),
});

const flowWalletClient = createWalletClient({
  chain: flowTestnet,
  transport: http(),
});

/**
 * POST /api/wallet/transfer
 * Body: { to, amount, token, pin }
 */
export const POST = withAuth(async (req, { address }) => {
  console.log(`[Transfer] Initiating request for address: ${address}`);

  try {
    const body = await req.json();
    const { to, amount, token, pin } = body;

    if (!to || !amount || !token || !pin) {
      console.error("[Transfer] Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const wallet = await WalletModel.findOne({ address });
    if (!wallet) {
      console.error(`[Transfer] Wallet NOT found for address: ${address}`);
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    let mnemonic: string;
    try {
      mnemonic = decryptMnemonic(wallet.encryptedMnemonic, wallet.iv, wallet.salt, pin);
    } catch (err: any) {
      console.error("[Transfer] Mnemonic decryption FAILED:", err.message);
      return NextResponse.json({ error: "Incorrect PIN" }, { status: 401 });
    }

    const account = mnemonicToAccount(mnemonic as `0x${string}`);
    const isFlow = token.toUpperCase() === "FLOW";
    const publicClient = isFlow ? flowPublicClient : ethPublicClient;
    console.log(`[Transfer] Using ${isFlow ? "Flow" : "Ethereum"} client. From: ${account.address}`);

    const amountWei = parseEther(amount);

    const balance = await publicClient.getBalance({ address: account.address });

    if (balance < amountWei) {
      console.error(`[Transfer] Insufficient balance: Need ${amount}, Have ${formatEther(balance)}`);
      return NextResponse.json({
        error: `Insufficient ${token} balance. Have ${formatEther(balance)}, need ${amount}.`
      }, { status: 400 });
    }

    let hash: `0x${string}`;
    if (isFlow) {
      hash = await flowWalletClient.sendTransaction({
        account,
        to: to as `0x${string}`,
        value: amountWei,
      });
    } else {
      hash = await ethWalletClient.sendTransaction({
        account,
        to: to as `0x${string}`,
        value: amountWei,
      });
    }
    console.log(`[Transfer] Transaction sent! Hash: ${hash}`);

    try {
      await TransactionModel.create({
        userId: wallet.id,
        fromAddress: account.address,
        toAddress: to,
        amount,
        token: token.toUpperCase(),
        hash,
        chain: isFlow ? "flow" : "eth",
        status: "pending",
      });
    } catch (dbErr: any) {
      if (dbErr.code === 11000) {
        console.warn("[Transfer] Duplicate transaction hash detected - returning success for existing hash");
      } else {
        throw dbErr;
      }
    }

    return NextResponse.json({
      success: true,
      hash,
      message: "Transaction sent successfully",
    });

  } catch (err: any) {
    console.error("[Transfer Error]", err);
    return NextResponse.json({
      error: err.message || "Failed to execute transfer"
    }, { status: 500 });
  }
});
