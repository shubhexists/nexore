import { useContext } from 'react';
import { AccountContext } from './account.context';

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (context === null) {
    throw new Error('useAccountContext must be used within a AccountProvider');
  }
  return context;
};

export * from './account.context';
