/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, ArrowUp as Send, ArrowDown as Receive, ArrowLeftRight as Swap, Wallet, LayoutGrid, Clock, Menu, Check } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function WalletComponent() {
  const [activeAccount, setActiveAccount] = useState('Account 1');
  const [activeTab, setActiveTab] = useState('wallet');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const accounts = ['Account 1', 'Account 2', 'Account 3', 'Account 4', 'Account 5', 'Account 6', 'Account 7', 'Account 8'];

  return (
    <div className="w-[360px] h-[600px] bg-gray-900 text-white flex">
      <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-6">
        <AccountSelector activeAccount={activeAccount} setActiveAccount={setActiveAccount} />
        <NavButton icon={<Wallet className="h-5 w-5" />} isActive={activeTab === 'wallet'} onClick={() => setActiveTab('wallet')} />
        <NavButton icon={<LayoutGrid className="h-5 w-5" />} isActive={activeTab === 'nfts'} onClick={() => setActiveTab('nfts')} />
        <NavButton icon={<Clock className="h-5 w-5" />} isActive={activeTab === 'activity'} onClick={() => setActiveTab('activity')} />
        <div className="mt-auto">
          <NavButton icon={<Settings className="h-5 w-5" />} isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">{getHeaderTitle(activeTab)}</h1>
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
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center"> {account[0]}</div>
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

function AccountSelector({ activeAccount }: any) {
  return (
    <Button variant="ghost" className="w-12 h-12 rounded-full bg-blue-500 text-white font-bold text-xl p-0 relative">
      {activeAccount[0]}
    </Button>
  );
}

function NavButton({ icon, isActive, onClick }: any) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`text-gray-400 hover:text-white hover:bg-gray-700 ${isActive ? 'bg-gray-700 text-white' : ''}`}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}

function renderTabContent(activeTab: string) {
  switch (activeTab) {
    case 'wallet':
      return <WalletContent />;
    case 'nfts':
      return <NftsContent />;
    case 'activity':
      return <ActivityContent />;
    case 'settings':
      return <SettingsContent />;
    default:
      return <WalletContent />;
  }
}

function getHeaderTitle(activeTab: string) {
  switch (activeTab) {
    case 'wallet':
      return 'Wallet';
    case 'nfts':
      return 'NFTs';
    case 'activity':
      return 'Activity';
    case 'settings':
      return 'Settings';
    default:
      return 'Wallet';
  }
}

function WalletContent() {
  return (
    <>
      <div className="p-4 text-center">
        <p className="text-sm text-gray-400">Total Balance</p>
        <h2 className="text-3xl font-bold">$1,234.56</h2>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2">
          <TokenItem name="Solana" symbol="SOL" amount="12.5" value="1000.00" change="+5.2%" />
          <TokenItem name="USD Coin" symbol="USDC" amount="200" value="200.00" change="0%" />
          <TokenItem name="Ethereum" symbol="ETH" amount="0.1" value="34.56" change="-2.1%" />
        </div>
      </ScrollArea>

      <div className="p-4 grid grid-cols-3 gap-2">
        <ActionButton icon={<Send className="h-4 w-4" />} label="Send" />
        <ActionButton icon={<Receive className="h-4 w-4" />} label="Receive" />
        <ActionButton icon={<Swap className="h-4 w-4" />} label="Swap" />
      </div>
    </>
  );
}

function NftsContent() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Your NFTs</h2>
      <p className="text-gray-400">No NFTs available yet.</p>
    </div>
  );
}

function ActivityContent() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Recent Activity</h2>
      <p className="text-gray-400">No recent activity.</p>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      <p className="text-gray-400">Manage your account settings.</p>
    </div>
  );
}

function TokenItem({ name, symbol, amount, value, change }: any) {
  const isPositive = change.startsWith('+');
  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full" />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-400">
            {amount} {symbol}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">${value}</p>
        <p className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>{change}</p>
      </div>
    </div>
  );
}

function ActionButton({ icon, label }: any) {
  return (
    <Button variant="outline" className="flex flex-col items-center justify-center h-16 bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
      {icon}
      <span className="mt-1 text-xs">{label}</span>
    </Button>
  );
}
