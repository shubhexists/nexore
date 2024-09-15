import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, Wallet, LayoutGrid, Clock, Menu, Check } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { AccountSelector } from '@/components/WalletDropDown';
import { NavButton } from '@/components/NavButton';
import { renderTabContent } from '@/components/renderTabs';
import { isFirstTime } from './utils';

export default function WalletComponent() {
  const [activeAccount, setActiveAccount] = useState('Account 1');
  const [activeTab, setActiveTab] = useState('wallet');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const accounts = [
    'Account 1',
    'Account 2',
    'Account 3',
    'Account 4',
    'Account 5',
    'Account 6',
    'Account 7',
    'Account 8',
  ];

  useEffect(() => {
    isFirstTime();
  }, []);

  return (
    <div className="w-[360px] h-[600px] bg-gray-900 text-white flex">
      <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-6">
        <AccountSelector activeAccount={activeAccount} />
        <NavButton
          icon={<Wallet className="h-5 w-5" />}
          isActive={activeTab === 'wallet'}
          onClick={() => setActiveTab('wallet')}
        />
        <NavButton
          icon={<LayoutGrid className="h-5 w-5" />}
          isActive={activeTab === 'nfts'}
          onClick={() => setActiveTab('nfts')}
        />
        <NavButton
          icon={<Clock className="h-5 w-5" />}
          isActive={activeTab === 'activity'}
          onClick={() => setActiveTab('activity')}
        />
        <div className="mt-auto">
          <NavButton
            icon={<Settings className="h-5 w-5" />}
            isActive={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">{activeAccount}</h1>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gray-800 text-white p-0">
              <SheetHeader className="p-4 border-b border-gray-700">
                <SheetTitle className="text-white text-2xl font-bold">Accounts</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-80px)] px-4">
                <div className="py-4 space-y-2">
                  {accounts.map((account) => (
                    <Button
                      key={account}
                      variant="ghost"
                      className={`w-full justify-start text-left py-3 px-4 rounded-lg transition-colors duration-200 ${
                        activeAccount === account
                          ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-500'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                      onClick={() => {
                        setActiveAccount(account);
                        setIsSheetOpen(false);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        {' '}
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center">
                          {' '}
                          {account[0]}
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">{account}</p>
                        </div>
                        {activeAccount === account && <Check className="h-5 w-5 text-blue-400 ml-2" />}
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </header>

        <div className="flex-1 overflow-hidden flex flex-col">{renderTabContent(activeTab)}</div>
      </div>
    </div>
  );
}
