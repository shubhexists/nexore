import { AccountDetailsType } from '@/@types';
import { getHeader } from '@/utils';
import { createContext, ReactNode, useState } from 'react';

type AccountDetailsContextType = AccountDetailsType & {
  setName: React.Dispatch<React.SetStateAction<string>>;
};

export const AccountContext = createContext<AccountDetailsContextType | undefined>(undefined);

export const AccountContextProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>('');
  const header = getHeader(name);
  const contextValue = { name, setName, header };

  return <AccountContext.Provider value={contextValue}>{children}</AccountContext.Provider>;
};
