/* eslint-disable @typescript-eslint/no-explicit-any */
import { Send, Plus, CreditCard, Sparkles, Circle as SwapHorizontal, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function WalletContent({ balance, isDarkMode }: any) {
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
