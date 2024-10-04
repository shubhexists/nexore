import { FC, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ImportWalletsInputProps {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
}

const ImportWallets: FC<ImportWalletsInputProps> = ({ currentSlide, setCurrentSlide }) => {
  const [selectedWallet, setSelectedWallet] = useState('Funded Addresses');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const walletOptions = ['Funded Addresses', 'Backpack', 'Backpack Legacy', 'Solana Legacy', 'Ledger Live'];

  return (
    <div className="w-full max-w-sm mx-auto">
      <p className="text-center text-sm text-gray-400 mb-6">Select a wallet to import.</p>

      <div className="relative mb-6">
        <motion.button
          whileHover={{ backgroundColor: 'rgba(31, 41, 55, 1)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded flex justify-between items-center text-left text-white"
        >
          {selectedWallet}
          <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown />
          </motion.div>
        </motion.button>
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute w-full bg-gray-800 mt-1 rounded border border-gray-700 shadow-lg overflow-hidden z-10"
            >
              {walletOptions.map((option) => (
                <motion.button
                  key={option}
                  whileHover={{ backgroundColor: 'rgba(55, 65, 81, 1)' }}
                  onClick={() => {
                    setSelectedWallet(option);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left p-2 transition-colors text-white"
                >
                  {option}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 border border-gray-700 p-6 rounded flex flex-col items-center justify-center mb-6"
      >
        <Search className="w-8 h-8 text-gray-400 mb-4" />
        <p className="text-lg font-semibold mb-2 text-white">No funded wallets found</p>
        <p className="text-sm text-gray-400 text-center">
          Please select a derivation path from the menu to import your wallets.
        </p>
      </motion.div>

      <Button
        onClick={() => setCurrentSlide(currentSlide + 1)}
        className="w-full bg-white text-gray-900 hover:bg-gray-200"
      >
        Import Wallet
      </Button>
    </div>
  );
};

export default ImportWallets;
