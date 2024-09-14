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

  async mnemonicToSeed(mnemonic: string, passphrase: string = ''): Promise<Buffer> {
    return await bip39.mnemonicToSeed(mnemonic, passphrase);
  }

  async mnemonicToSeedHex(mnemonic: string, passphrase: string = ''): Promise<string> {
    const seedBuffer = await this.mnemonicToSeed(mnemonic, passphrase);
    return seedBuffer.toString('hex');
  }
}
