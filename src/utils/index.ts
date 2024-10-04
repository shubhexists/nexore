import { NOT_HAS_CIPHER, PersistentStorage } from '@/shared';

export * from './getHeaderName';

export async function isFirstTime() {
  const storage = new PersistentStorage<boolean>();
  const notHasCipher = await storage.getItem(NOT_HAS_CIPHER);
  if (typeof notHasCipher === 'undefined') {
    chrome.tabs.create({ url: 'contents.html' });
    window.close();
  }
}
