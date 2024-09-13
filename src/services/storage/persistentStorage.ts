import { BaseStorage } from '@/services/storage/baseStorage';

export class PersistentStorage<T> extends BaseStorage<T> {
  constructor() {
    const storage =
      typeof browser !== 'undefined' && browser.storage
        ? browser.storage.local
        : typeof chrome !== 'undefined' && chrome.storage
        ? chrome.storage.local
        : undefined;

    if (!storage) {
      throw new Error('No compatible storage API found.');
    }

    super(storage);
  }
}
