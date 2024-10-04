import { PATH_GAP } from '@/shared';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNextEthPolPaths() {
  const ethPath = "m/44'/60'/0'/0/";
  const paths = [];
  for (let i = 0; i < PATH_GAP; i++) {
    paths.push(`${ethPath}${i}`);
  }
  return paths;
}

export function getNextSolPaths() {
  const solPath = "m/44'/501'/0'/";
  const paths = [];
  for (let i = 0; i < PATH_GAP; i++) {
    paths.push(`${solPath}${i}'`);
  }
  return paths;
}
