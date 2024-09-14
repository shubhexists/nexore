import * as bip39 from 'bip39';

export class BIP39 {
  private wordlist?: string[];

  constructor(wordlist?: string[]) {
    if (wordlist) {
      this.wordlist = wordlist;
    }
  }

  generateMnemonic(strength: number = 128): string[] {
    if (this.wordlist) {
      return bip39.generateMnemonic(strength, undefined, this.wordlist).split(' ');
    }
    return bip39.generateMnemonic(strength).split(' ');
  }

  mnemonicToSeed(mnemonic: string, passphrase: string = ''): Buffer {
    return bip39.mnemonicToSeedSync(mnemonic, passphrase);
  }

  mnemonicToSeedHex(mnemonic: string, passphrase: string = ''): string {
    const seedBuffer = this.mnemonicToSeed(mnemonic, passphrase);
    return seedBuffer.toString('hex');
  }

  seedToHex(seed: Buffer): string {
    return seed.toString('hex');
  }
}
