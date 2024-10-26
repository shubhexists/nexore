/* eslint-disable @typescript-eslint/no-explicit-any */
import { Send, Plus, CreditCard, Sparkles, Circle as SwapHorizontal, TrendingUp, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Component({
  balance,
  isDarkMode = false,
}: {
  balance?: { sol: number; usd: number };
  isDarkMode?: boolean;
}) {
  const [openSheet, setOpenSheet] = useState<string | null>(null);

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <WalletContent balance={balance} isDarkMode={isDarkMode} setOpenSheet={setOpenSheet} />
      <FullScreenBottomSheet open={openSheet} onOpenChange={setOpenSheet} isDarkMode={isDarkMode} />
    </div>
  );
}

function WalletContent({ balance, isDarkMode, setOpenSheet }: any) {
  return (
    <div className="py-6 space-y-6">
      <motion.div
        className="grid grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ActionButton icon={<Plus />} label="Buy" isDarkMode={isDarkMode} onClick={() => setOpenSheet('buy')} />
        <ActionButton icon={<Send />} label="Send" isDarkMode={isDarkMode} onClick={() => setOpenSheet('send')} />
        <ActionButton
          icon={<SwapHorizontal />}
          label="Swap"
          isDarkMode={isDarkMode}
          onClick={() => setOpenSheet('swap')}
        />
        <ActionButton icon={<CreditCard />} label="Card" isDarkMode={isDarkMode} onClick={() => setOpenSheet('card')} />
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

function ActionButton({ icon, label, isDarkMode, onClick }: any) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={`w-full h-20 flex flex-col items-center justify-center space-y-1 rounded-xl ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
      } transition-colors duration-300`}
      onClick={onClick}
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

function FullScreenBottomSheet({
  open,
  onOpenChange,
  isDarkMode,
}: {
  open: string | null;
  onOpenChange: (value: string | null) => void;
  isDarkMode: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed inset-0 z-50 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          <div className="h-full overflow-y-auto">
            <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">{open.charAt(0).toUpperCase() + open.slice(1)}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(null)}
                className="rounded-full"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="p-4">
              {open === 'buy' && <BuyContent />}
              {open === 'send' && <SendContent />}
              {open === 'swap' && <SwapContent />}
              {open === 'card' && <CardContent />}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BuyContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-4">Buy Crypto</h3>
      <p>Select a cryptocurrency to buy:</p>
    </motion.div>
  );
}

function SendContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-4">Send Crypto</h3>
      <p>Enter recipient's address and amount:</p>
    </motion.div>
  );
}

function SwapContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-4">Swap Crypto</h3>
      <p>Choose cryptocurrencies to swap:</p>
    </motion.div>
  );
}

function CardContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-4">Crypto Card</h3>
      <p>Manage your crypto card:</p>
    </motion.div>
  );
}
