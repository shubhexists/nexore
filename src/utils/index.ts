import { NOT_HAS_CIPHER, PersistentStorage } from '@/shared';
import { LOCK_TIME } from '@/shared';

export * from './getHeaderName';

export async function isFirstTime() {
  const storage = new PersistentStorage<boolean>();
  const notHasCipher = await storage.getItem(NOT_HAS_CIPHER);
  if (typeof notHasCipher === 'undefined') {
    chrome.tabs.create({ url: 'contents.html' });
    window.close();
  }
}

export async function isLocked() {
  const storage = new PersistentStorage<number>();
  const isLocked = await storage.getItem(LOCK_TIME);
  if (isLocked) {
    const currentTime = Date.now();
    if (isLocked > currentTime) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
