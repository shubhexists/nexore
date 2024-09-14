import { HDNodeWallet, Wallet } from 'ethers';
import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import { BIP39 } from '../bip39/bip39';
import nacl from 'tweetnacl';

export class HDKeys {
  private seed: Buffer;
  private seedHex: string;
  private path: string;

  constructor(seed: Buffer, path: string) {
    this.seed = seed;
    this.seedHex = new BIP39().seedToHex(seed);
    this.path = path;
  }

  public generateSolanaPublicKey(): string {
    const derivedSeed = derivePath(this.path, this.seedHex).key;
    const privateKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    return Keypair.fromSecretKey(privateKey).publicKey.toBase58();
  }

  public getSolanaKeyPair(): Keypair {
    const derivedSeed = derivePath(this.path, this.seedHex).key;
    const privateKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    return Keypair.fromSecretKey(privateKey);
  }

  public generateEthereumPublicKey(): string {
    const hdNode = HDNodeWallet.fromSeed(this.seed);
    const privateKey = hdNode.derivePath(this.path).privateKey;
    return new Wallet(privateKey).address;
  }

  public getEthereumWallet(): Wallet {
    const hdNode = HDNodeWallet.fromSeed(this.seed);
    const privateKey = hdNode.derivePath(this.path).privateKey;
    return new Wallet(privateKey);
  }

  public generatePolygonPublicKey(): string {
    const hdNode = HDNodeWallet.fromSeed(this.seed);
    const privateKey = hdNode.derivePath(this.path).privateKey;
    return new Wallet(privateKey).address;
  }

  public getPolygonWallet(): Wallet {
    const hdNode = HDNodeWallet.fromSeed(this.seed);
    const privateKey = hdNode.derivePath(this.path).privateKey;
    return new Wallet(privateKey);
  }
}
