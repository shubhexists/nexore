/* eslint-disable @typescript-eslint/no-unused-vars */
import CryptoJS from 'crypto-js';
import { PersistentStorage } from '../storage/persistentStorage';
import { PBKDF2_ITERATIONS } from '../../constants/constants';

export class EncryptedData {
  public ciphertext: string;
  public digest: 'sha256';
  public iterations: number;
  public kdf: 'pbkdf2';
  public nonce: string;
  public salt: string;

  constructor(ciphertext: string, digest: 'sha256', iterations: number, kdf: 'pbkdf2', nonce: string, salt: string) {
    this.ciphertext = ciphertext;
    this.digest = digest;
    this.iterations = iterations;
    this.kdf = kdf;
    this.nonce = nonce;
    this.salt = salt;
  }

  public static encrypt(plaintext: string, password: string): EncryptedData {
    const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
    const key = CryptoJS.PBKDF2(password, CryptoJS.enc.Hex.parse(salt), {
      keySize: 256 / 32,
      iterations: PBKDF2_ITERATIONS,
      hasher: CryptoJS.algo.SHA256,
    });
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const ciphertext = CryptoJS.AES.encrypt(plaintext, key.toString(), { iv }).toString();

    return new EncryptedData(ciphertext, 'sha256', PBKDF2_ITERATIONS, 'pbkdf2', iv.toString(), salt);
  }

  public decrypt(password: string): string {
    const key = CryptoJS.PBKDF2(password, CryptoJS.enc.Hex.parse(this.salt), {
      keySize: 256 / 32,
      iterations: this.iterations,
      hasher: CryptoJS.algo.SHA256,
    });
    const bytes = CryptoJS.AES.decrypt(this.ciphertext, key.toString(), {
      iv: CryptoJS.enc.Hex.parse(this.nonce),
    });
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  public static verifyPassword(password: string, encryptedData: EncryptedData): boolean {
    try {
      const key = CryptoJS.PBKDF2(password, CryptoJS.enc.Hex.parse(encryptedData.salt), {
        keySize: 256 / 32,
        iterations: encryptedData.iterations,
        hasher: CryptoJS.algo.SHA256,
      });

      const testCiphertext = CryptoJS.AES.encrypt('test', key.toString(), {
        iv: CryptoJS.enc.Hex.parse(encryptedData.nonce),
      }).toString();

      const bytes = CryptoJS.AES.decrypt(testCiphertext, key.toString(), {
        iv: CryptoJS.enc.Hex.parse(encryptedData.nonce),
      });
      const decryptedTest = bytes.toString(CryptoJS.enc.Utf8);

      return decryptedTest === 'test';
    } catch (error) {
      return false;
    }
  }

  public static async saveToStorage(
    key: string,
    plaintext: string,
    password: string,
    storage: PersistentStorage<EncryptedData>
  ): Promise<void> {
    const encryptedData = EncryptedData.encrypt(plaintext, password);
    await storage.setItem(key, encryptedData);
  }

  public static async retrieveFromStorage(
    key: string,
    password: string,
    storage: PersistentStorage<EncryptedData>
  ): Promise<string | undefined> {
    try {
      const encryptedData = await storage.getItem(key);
      if (encryptedData) {
        return encryptedData.decrypt(password);
      }
    } catch (error) {
      console.error(`Failed to retrieve or decrypt data: ${error}`);
    }
    return undefined;
  }
}
