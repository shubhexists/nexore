import * as bip39 from 'bip39';

export class BIP39Wrapper {
  private wordlist?: string[];

  constructor(wordlist?: string[]) {
    if (wordlist) {
      this.wordlist = wordlist;
    }
  }

  generateMnemonic(strength: number = 128): string {
    if (this.wordlist) {
      return bip39.generateMnemonic(strength, undefined, this.wordlist);
    }
    return bip39.generateMnemonic(strength);
  }

  async mnemonicToSeed(mnemonic: string, passphrase: string = ''): Promise<Buffer> {
    return await bip39.mnemonicToSeed(mnemonic, passphrase);
  }

  async mnemonicToSeedHex(mnemonic: string, passphrase: string = ''): Promise<string> {
    const seedBuffer = await this.mnemonicToSeed(mnemonic, passphrase);
    return seedBuffer.toString('hex');
  }
}
