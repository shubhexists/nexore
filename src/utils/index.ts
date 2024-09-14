import { IS_FIRST_TIME } from '@/constants';
import { PersistentStorage } from '@/services/storage/persistentStorage';

export * from './getHeaderName';

export async function isFirstTime() {
  const storage = new PersistentStorage<boolean>();
  const isFirstTime = await storage.getItem(IS_FIRST_TIME);
  if (typeof isFirstTime === 'undefined') {
    chrome.tabs.create({ url: 'contents.html' });
    window.close();
  }
}
