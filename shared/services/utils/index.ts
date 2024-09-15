import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { Wallet } from 'ethers';

export function getSolanaPublicKeyFromPrivateKey(privateKey: string): string {
  const decoded_key = bs58.decode(privateKey);
  return Keypair.fromSecretKey(decoded_key).publicKey.toBase58();
}

export function getEthereumPublicKeyFromPrivateKey(privateKey: string): string {
  return new Wallet(privateKey).address;
}

export function getPolygonPublicKeyFromPrivateKey(privateKey: string): string {
  return new Wallet(privateKey).address;
}
