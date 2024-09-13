import { BaseStorage } from '@/services/storage/baseStorage';

export class SessionStorage<T> extends BaseStorage<T> {
  constructor() {
    const storage =
      typeof browser !== 'undefined' && browser.storage
        ? browser.storage.session
        : typeof chrome !== 'undefined' && chrome.storage
        ? chrome.storage.session
        : undefined;

    if (!storage) {
      throw new Error('No compatible storage API found.');
    }

    super(storage);
  }
}
