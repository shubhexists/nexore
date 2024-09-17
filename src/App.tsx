/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Wallet,
  Grid,
  Clock,
  Settings,
  Moon,
  Sun,
  Menu,
  Send,
  Plus,
  CreditCard,
  Sparkles,
  TrendingUp,
  Circle as SwapHorizontal,
  Edit,
} from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { motion, AnimatePresence } from 'framer-motion';
import { isFirstTime } from './utils';

export default function Component() {
  const [activeAccount, setActiveAccount] = useState('Main Wallet');
  const [activeTab, setActiveTab] = useState('wallet');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const accounts = ['Main Wallet', 'Trading Wallet', 'Savings Wallet', 'NFT Wallet'];
  const [balance, setBalance] = useState({ usd: 1234.56, sol: 12.5 });

  useEffect(() => {
    isFirstTime();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((prev) => ({
        usd: +(prev.usd + (Math.random() - 0.5) * 10).toFixed(2),
        sol: +(prev.sol + (Math.random() - 0.5) * 0.1).toFixed(2),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const accentColor = isDarkMode ? 'bg-blue-600' : 'bg-blue-500';
  const secondaryBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';

  return (
    <div
      className={`w-[360px] h-[600px] ${bgColor} ${textColor} flex flex-col overflow-hidden shadow-2xl font-sans relative`}
    >
      <header
        className={`${accentColor} p-6 flex justify-between items-start rounded-b-3xl shadow-lg relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 opacity-50"></div>
        <Button
          variant="ghost"
          className="text-white hover:bg-white/10 p-1 rounded-full transition-colors duration-300 z-10"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white">${balance.usd.toFixed(2)}</h2>
          <p className="text-sm text-blue-100 mt-1">{balance.sol.toFixed(2)} SOL</p>
        </motion.div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 rounded-full transition-colors duration-300 z-10"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`flex-1 overflow-hidden flex flex-col ${bgColor}`}
        >
          <ScrollArea className="flex-1 px-4">
            <WalletContent balance={balance} isDarkMode={isDarkMode} />
          </ScrollArea>
        </motion.div>
      </AnimatePresence>

      <nav
        className={`${secondaryBgColor} border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        } flex justify-around py-3 rounded-t-3xl shadow-lg`}
      >
        <NavButton
          icon={<Wallet />}
          label="Wallet"
          isActive={activeTab === 'wallet'}
          onClick={() => setActiveTab('wallet')}
          isDarkMode={isDarkMode}
        />
        <NavButton
          icon={<Grid />}
          label="NFTs"
          isActive={activeTab === 'nfts'}
          onClick={() => setActiveTab('nfts')}
          isDarkMode={isDarkMode}
        />
        <NavButton
          icon={<Clock />}
          label="Activity"
          isActive={activeTab === 'activity'}
          onClick={() => setActiveTab('activity')}
          isDarkMode={isDarkMode}
        />
        <NavButton
          icon={<Settings />}
          label="Settings"
          isActive={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
          isDarkMode={isDarkMode}
        />
      </nav>

      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent
          side="left"
          className={`${
            isDarkMode ? 'bg-black' : 'bg-white'
          } ${textColor} p-0 w-[80px] shadow-lg transition-transform duration-300 ease-in-out transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } overflow-visible`}
        >
          <div className="flex flex-col h-full justify-between py-4 px-2">
            {/* Scrollable Accounts List without Scrollbar */}
            <div className="flex-grow overflow-y-auto space-y-4 relative scrollbar-none">
              {' '}
              {/* Hide scrollbar */}
              {accounts.map((account, index) => (
                <motion.div
                  key={account}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex flex-col items-center justify-center relative group"
                >
                  <Button
                    variant="ghost"
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeAccount === account
                        ? 'bg-purple-500 text-white'
                        : isDarkMode
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                    onClick={() => {
                      setActiveAccount(account);
                      setIsSidebarOpen(false);
                    }}
                  >
                    {account[0]}
                  </Button>
                  <span className="mt-1 text-xs text-center truncate w-full">{account}</span>

                  {/* Hover Popup with Account Info outside the Sheet */}
                  <div className="absolute left-[90px] top-0 z-50 hidden group-hover:flex flex-col w-[200px] bg-gray-900 text-white p-4 rounded-lg shadow-lg">
                    <span className="font-bold mb-2">{account}</span>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Solana</span>
                      <span className="text-sm">0 SOL</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Ethereum</span>
                      <span className="text-sm">0 ETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Polygon</span>
                      <span className="text-sm">0 MATIC</span>
                    </div>
                    {/* Add more account details as needed */}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Separator Line */}
            <hr className="my-4 border-gray-300" />

            {/* Bottom Buttons in Column Layout with Close Gap */}
            <div className="flex flex-col space-y-2 items-center">
              <Button
                variant="ghost"
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                <Plus className="h-6 w-6 text-gray-600" />
              </Button>
              <Button
                variant="ghost"
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                <Edit className="h-6 w-6 text-gray-600" />
              </Button>
              <Button
                variant="ghost"
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                <Settings className="h-6 w-6 text-gray-600" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function NavButton({ icon, label, isActive, onClick, isDarkMode }: any) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`flex flex-col items-center justify-center h-14 w-14 rounded-lg transition-all duration-300 ${
        isActive
          ? `${isDarkMode ? 'text-blue-400' : 'text-blue-600'} scale-110`
          : isDarkMode
            ? 'text-gray-400 hover:text-black'
            : 'text-gray-500 hover:text-gray-900'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Button>
  );
}

function WalletContent({ balance, isDarkMode }: any) {
  return (
    <div className="py-6 space-y-6">
      <motion.div
        className="grid grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ActionButton icon={<Plus />} label="Buy" isDarkMode={isDarkMode} />
        <ActionButton icon={<Send />} label="Send" isDarkMode={isDarkMode} />
        <ActionButton icon={<SwapHorizontal />} label="Swap" isDarkMode={isDarkMode} />
        <ActionButton icon={<CreditCard />} label="Card" isDarkMode={isDarkMode} />
      </motion.div>
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold flex items-center">
          <Sparkles className={`h-5 w-5 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          Your Assets
        </h3>
        <TokenItem
          name="Solana"
          symbol="SOL"
          amount={balance.sol.toFixed(2)}
          value={balance.usd.toFixed(2)}
          change="+5.2%"
          isDarkMode={isDarkMode}
        />
        <TokenItem name="Ethereum" symbol="ETH" amount="0.1" value="234.56" change="-2.1%" isDarkMode={isDarkMode} />
        <TokenItem name="USDC" symbol="USDC" amount="100" value="100.00" change="0.0%" isDarkMode={isDarkMode} />
      </motion.div>
    </div>
  );
}

function ActionButton({ icon, label, isDarkMode }: any) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={`w-full h-20 flex flex-col items-center justify-center space-y-1 rounded-xl ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
      } transition-colors duration-300`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Button>
  );
}

function TokenItem({ name, symbol, amount, value, change, isDarkMode }: any) {
  const isPositive = change.startsWith('+');
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <motion.div
      className={`p-3 rounded-xl ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
      } shadow-md transition-colors duration-300`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center text-white font-bold text-sm`}
          >
            {symbol[0]}
          </div>
          <div>
            <h4 className="font-semibold text-sm">{name}</h4>
            <p className="text-xs text-gray-500">{symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-sm">
            {amount} {symbol}
          </p>
          <p className="text-xs text-gray-500">${value}</p>
          <p className={`text-xs ${changeColor} flex items-center justify-end`}>
            <TrendingUp className={`h-3 w-3 mr-1 ${isPositive ? '' : 'transform rotate-180'}`} />
            {change}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
