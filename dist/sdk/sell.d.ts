import BN from 'bn.js';
import { S as SellBaseInputResult, h as SellQuoteInputResult } from '../sdk-CG0vdPWZ.js';
import '@solana/web3.js';

declare function sellBaseInputInternal(base: BN, // The amount of base tokens the user wants to sell
slippage: number, // e.g. 1 => 1% slippage tolerance
baseReserve: BN, // Current reserve of base tokens in the pool
quoteReserve: BN, // Current reserve of quote tokens in the pool
lpFeeBps: BN, // LP fee in basis points (e.g., 30 => 0.30%)
protocolFeeBps: BN): SellBaseInputResult;
declare function sellQuoteInputInternal(quote: BN, // Desired quote tokens (including fees)
slippage: number, // e.g. 1 => 1% slippage tolerance
baseReserve: BN, // Current reserve of base tokens in the pool
quoteReserve: BN, // Current reserve of quote tokens in the pool
lpFeeBps: BN, // LP fee in basis points (e.g., 30 => 0.30%)
protocolFeeBps: BN): SellQuoteInputResult;

export { sellBaseInputInternal, sellQuoteInputInternal };
