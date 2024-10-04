/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LoadingBars from '../loadingAnimations';
import { getNextEthPolPaths, getNextSolPaths } from '@/lib/utils';
import { BIP39, EthMainNet, HDKeys, PolygonMainnet, SolanaMainnet } from '@/shared';

interface FundedWallet {
  key: string;
  balance: string;
}

interface FundedWalletsState {
  solana: FundedWallet[];
  ethereum: FundedWallet[];
  polygon: FundedWallet[];
}

interface ImportWalletsInputProps {
  recoveryPhase: string[];
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
}

const ImportWallets: FC<ImportWalletsInputProps> = ({ currentSlide, setCurrentSlide, recoveryPhase }) => {
  const [selectedWallet, setSelectedWallet] = useState('Funded Addresses');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const walletOptions = ['Funded Addresses', 'Custom', 'Ledger'];

  const [isLoading, setIsLoading] = useState(true);

  const [fundedWallets, setFundedWallets] = useState<FundedWalletsState>({
    solana: [],
    ethereum: [],
    polygon: [],
  });

  useEffect(() => {
    const fetchBalances = async () => {
      const solPaths = getNextSolPaths();
      console.log(solPaths);
      const ethPolPath = getNextEthPolPaths();
      console.log(ethPolPath);
      const seedBuffer = new BIP39().mnemonicToSeed(recoveryPhase.join(' '));

      const solanaPromises = solPaths.map(async (i) => {
        const solKey = new HDKeys(seedBuffer, i).generateSolanaPublicKey();
        const solana = new SolanaMainnet();
        const bal = await solana.getBalance(solKey);
        if (bal !== '0') {
          return { key: solKey, balance: bal };
        }
        return null;
      });

      const polygonPromises = ethPolPath.map(async (i) => {
        const polKey = new HDKeys(seedBuffer, i).generatePolygonPublicKey();
        const polygon = new PolygonMainnet();
        const bal = await polygon.getBalance(polKey);
        if (bal !== '0') {
          return { key: polKey, balance: bal };
        }
        return null;
      });

      const ethereumPromises = ethPolPath.map(async (i) => {
        const ethKey = new HDKeys(seedBuffer, i).generateEthereumPublicKey();
        const ethereum = new EthMainNet();
        const bal = await ethereum.getBalance(ethKey);
        if (bal !== '0') {
          return { key: ethKey, balance: bal };
        }
        return null;
      });

      const [solanaResults, polygonResults, ethereumResults] = await Promise.all([
        Promise.all(solanaPromises),
        Promise.all(polygonPromises),
        Promise.all(ethereumPromises),
      ]);

      const fundedSolana = solanaResults.filter((result) => result !== null) as FundedWallet[];
      const fundedPolygon = polygonResults.filter((result) => result !== null) as FundedWallet[];
      const fundedEthereum = ethereumResults.filter((result) => result !== null) as FundedWallet[];

      setFundedWallets((prevState) => ({
        solana: [...prevState.solana, ...fundedSolana],
        ethereum: [...prevState.ethereum, ...fundedEthereum],
        polygon: [...prevState.polygon, ...fundedPolygon],
      }));

      setIsLoading(false);
    };

    fetchBalances();
  }, []);

  console.log(fundedWallets);

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

      {isLoading ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded flex flex-col items-center justify-center mb-6"
        >
          <LoadingBars size={45} />
        </motion.div>
      ) : (
        <div>
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
        </div>
      )}

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
