import { NOT_HAS_CIPHER, PersistentStorage } from '@/shared';
import { LOCK_TIME } from '@/shared';

export * from '@/utils/getHeaderName';

export async function isFirstTime() {
  const storage = new PersistentStorage<boolean>();
  const notHasCipher = await storage.getItem(NOT_HAS_CIPHER);
  if (typeof notHasCipher === 'undefined') {
    chrome.tabs.create({ url: 'contents.html' });
    window.close();
  }
}

export async function isLocked(setIsLocked: React.Dispatch<React.SetStateAction<boolean>>) {
  const storage = new PersistentStorage<number>();
  const isLocked = await storage.getItem(LOCK_TIME);
  if (isLocked) {
    const currentTime = Date.now();
    if (isLocked > currentTime) {
      setIsLocked(true);
    } else {
      setIsLocked(false);
    }
  } else {
    setIsLocked(false);
  }
}
