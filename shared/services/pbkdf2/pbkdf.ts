import * as crypto from 'crypto';
import { PBKDF2_ITERATIONS } from '../../constants/constants';

export interface EncryptedData {
  ciphertext: string;
  iv: string;
  salt: string;
  authTag: string;
  iterations: number;
  keyLength: number;
  digest: string;
}

export class PBKDF2Crypto {
  private readonly iterations: number;
  private readonly keyLength: number;
  private readonly digest: string;

  constructor(iterations: number = PBKDF2_ITERATIONS, keyLength: number = 32, digest: string = 'sha256') {
    this.iterations = iterations;
    this.keyLength = keyLength;
    this.digest = digest;
  }

  private async deriveKey(password: string, salt: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, this.iterations, this.keyLength, this.digest, (err, derivedKey) => {
        if (err) reject(err);
        else resolve(derivedKey);
      });
    });
  }

  async encrypt(password: string, data: string): Promise<EncryptedData> {
    const salt = crypto.randomBytes(16);
    const key = await this.deriveKey(password, salt);
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return {
      ciphertext: encrypted,
      iv: iv.toString('hex'),
      salt: salt.toString('hex'),
      authTag: authTag.toString('hex'),
      iterations: this.iterations,
      keyLength: this.keyLength,
      digest: this.digest,
    };
  }

  async decrypt(password: string, encryptedData: EncryptedData): Promise<string> {
    const { ciphertext, iv, salt, authTag, iterations, keyLength, digest } = encryptedData;

    const key = await new PBKDF2Crypto(iterations, keyLength, digest).deriveKey(password, Buffer.from(salt, 'hex'));

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
