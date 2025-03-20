import BN from 'bn.js';
import { B as BuyBaseInputResult, g as BuyQuoteInputResult } from '../sdk-CG0vdPWZ.js';
import '@solana/web3.js';

/**
 * Calculates a "buy" in a constant-product AMM with fees.
 * Slippage is handled as a percentage where slippage=1 => 1%.
 *
 * @param base - Base tokens requested (out).
 * @param slippage - Slippage tolerance in % (1 => 1%).
 * @param baseReserve - Reserve of base token in the pool.
 * @param quoteReserve - Reserve of quote token in the pool.
 * @param lpFeeBps - LP fee in basis points (BN).
 * @param protocolFeeBps - Protocol fee in basis points (BN).
 */
declare function buyBaseInputInternal(base: BN, slippage: number, // 1 => 1%
baseReserve: BN, quoteReserve: BN, lpFeeBps: BN, // LP fee in basis points (BN)
protocolFeeBps: BN): BuyBaseInputResult;
/**
 * Calculates a "buy" in a constant-product AMM with fees, where the input is quote tokens.
 * Slippage is handled as a percentage where slippage=1 => 1%.
 *
 * @param quote - Quote tokens provided (in), including fees.
 * @param slippage - Slippage tolerance in % (1 => 1%).
 * @param baseReserve - Reserve of base token in the pool.
 * @param quoteReserve - Reserve of quote token in the pool.
 * @param lpFeeBps - LP fee in basis points (BN).
 * @param protocolFeeBps - Protocol fee in basis points (BN).
 */
declare function buyQuoteInputInternal(quote: BN, slippage: number, // 1 => 1%
baseReserve: BN, quoteReserve: BN, lpFeeBps: BN, // LP fee in basis points (BN)
protocolFeeBps: BN): BuyQuoteInputResult;

export { buyBaseInputInternal, buyQuoteInputInternal };
