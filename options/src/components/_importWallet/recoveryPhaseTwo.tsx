import { ChangeEvent, FC, useEffect, useState } from 'react';
import { ChevronDown, Search, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LoadingBars from '../loadingAnimations';
import { getNextEthPolPaths, getNextSolPaths } from '@/lib/utils';
import { BIP39, EthMainNet, HDKeys, PolygonMainnet, SolanaMainnet } from '@/shared';

interface FundedWallet {
  key: string;
  derKey: string;
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
  derKey: { solana: string; ethereum: string; polygon: string };
  setDerKey: (value: { solana: string; ethereum: string; polygon: string }) => void;
}

const ImportWallets: FC<ImportWalletsInputProps> = ({
  currentSlide,
  setCurrentSlide,
  recoveryPhase,
  derKey,
  setDerKey,
}) => {
  const [selectedWallet, setSelectedWallet] = useState('Funded Addresses');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPathValid, setIsPathValid] = useState<boolean>(false);
  const [customDerKey, setCustomDerKey] = useState('');
  const walletOptions = ['Funded Addresses', 'Custom', 'Ledger'];

  function isValidDerivationPath(path: string) {
    const derivationRegex = /^m\/44'\/(60|501)'(\/\d+'?){2,3}$/;
    return derivationRegex.test(path);
  }

  const [isLoading, setIsLoading] = useState(true);

  const [fundedWallets, setFundedWallets] = useState<FundedWalletsState>({
    solana: [],
    ethereum: [],
    polygon: [],
  });

  const handleDerivationKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCustomDerKey(newValue);
    setIsPathValid(isValidDerivationPath(newValue));

    if (newValue.startsWith("m/44'/501")) {
      setDerKey({ ...derKey, solana: newValue, ethereum: '', polygon: '' });
    } else if (newValue.startsWith("m/44'/60")) {
      setDerKey({ ...derKey, solana: '', ethereum: newValue, polygon: newValue });
    }
  };

  useEffect(() => {
    const fetchBalances = async () => {
      const solPaths = getNextSolPaths();
      const ethPolPath = getNextEthPolPaths();
      const seedBuffer = new BIP39().mnemonicToSeed(recoveryPhase.join(' '));

      const solanaPromises = solPaths.map(async (i) => {
        const solKey = new HDKeys(seedBuffer, i).generateSolanaPublicKey();
        const solana = new SolanaMainnet();
        const bal = await solana.getBalance(solKey);
        if (bal !== '0') {
          return { key: solKey, balance: bal, derKey: i };
        }
        return null;
      });

      const polygonPromises = ethPolPath.map(async (i) => {
        const polKey = new HDKeys(seedBuffer, i).generatePolygonPublicKey();
        const polygon = new PolygonMainnet();
        const bal = await polygon.getBalance(polKey);
        if (bal !== '0') {
          return { key: polKey, balance: bal, derKey: i };
        }
        return null;
      });

      const ethereumPromises = ethPolPath.map(async (i) => {
        const ethKey = new HDKeys(seedBuffer, i).generateEthereumPublicKey();
        const ethereum = new EthMainNet();
        const bal = await ethereum.getBalance(ethKey);
        if (bal !== '0') {
          return { key: ethKey, balance: bal, derKey: i };
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
        solana: [...prevState.solana, ...fundedSolana].slice(0, 1),
        ethereum: [...prevState.ethereum, ...fundedEthereum].slice(0, 1),
        polygon: [...prevState.polygon, ...fundedPolygon].slice(0, 1),
      }));

      setIsLoading(false);
    };

    fetchBalances();
  }, [recoveryPhase]);

  const renderWalletList = (wallets: FundedWallet[], title: string) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {wallets.map((wallet, index) => (
        <div key={index} className="bg-gray-700 rounded p-3 mb-2">
          <p className="text-sm text-gray-300 break-all">{wallet.key}</p>
          <p className="text-sm text-green-400">Balance: {wallet.balance}</p>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded flex flex-col items-center justify-center mb-6"
        >
          <LoadingBars size={45} />
        </motion.div>
      );
    }

    switch (selectedWallet) {
      case 'Funded Addresses':
        if (
          fundedWallets.solana.length === 0 &&
          fundedWallets.ethereum.length === 0 &&
          fundedWallets.polygon.length === 0
        ) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 border border-gray-700 p-6 rounded flex flex-col items-center justify-center mb-6"
            >
              <Search className="w-8 h-8 text-gray-400 mb-4" />
              <p className="text-lg font-semibold mb-2 text-white">No funded wallets found</p>
              <p className="text-sm text-gray-400 text-center">
                Please select a derivation path from the menu to import your wallets or refresh this page to create a
                new Wallet.
              </p>
            </motion.div>
          );
        }
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 border border-gray-700 p-6 rounded mb-6"
          >
            {fundedWallets.solana.length > 0 && renderWalletList(fundedWallets.solana, 'Solana Wallets')}
            {fundedWallets.ethereum.length > 0 && renderWalletList(fundedWallets.ethereum, 'Ethereum Wallets')}
            {fundedWallets.polygon.length > 0 && renderWalletList(fundedWallets.polygon, 'Polygon Wallets')}
          </motion.div>
        );
      case 'Custom':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 border border-gray-700 p-6 rounded flex flex-col items-center justify-center mb-6"
          >
            <p className="text-lg font-semibold mb-2 text-white">Enter your Derivation Key</p>
            <input
              type="text"
              value={customDerKey}
              onChange={handleDerivationKeyChange}
              placeholder="Enter your derivation key"
              className="bg-gray-700 text-white p-2 rounded w-full mb-4"
            />
            <p className="text-sm text-gray-400 text-center">
              Please enter your derivation key to proceed with the setup.
            </p>
          </motion.div>
        );
      case 'Ledger':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 border border-gray-700 p-6 rounded flex flex-col items-center justify-center mb-6"
          >
            <Wallet className="w-8 h-8 text-gray-400 mb-4" />
            <p className="text-lg font-semibold mb-2 text-white">Ledger Hardware Wallet</p>
            <p className="text-sm text-gray-400 text-center">
              Feature coming soon. You'll be able to connect and import wallets from your Ledger device.
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const handleImport = () => {
    const newDerKey = { ...derKey };

    if (selectedWallet === 'Funded Addresses') {
      if (fundedWallets.solana.length > 0) {
        newDerKey.solana = fundedWallets.solana[0].derKey;
      }

      if (fundedWallets.ethereum.length > 0) {
        newDerKey.ethereum = fundedWallets.ethereum[0].derKey;
      } else if (fundedWallets.polygon.length > 0) {
        newDerKey.polygon = fundedWallets.polygon[0].derKey;
      }
    }

    setDerKey(newDerKey);
    setCurrentSlide(currentSlide + 1);
  };

  const isButtonDisabled = () => {
    if (selectedWallet === 'Funded Addresses') {
      return (
        fundedWallets.solana.length === 0 && fundedWallets.ethereum.length === 0 && fundedWallets.polygon.length === 0
      );
    } else if (selectedWallet === 'Custom') {
      return !isPathValid;
    } else if (selectedWallet === 'Ledger') {
      return true;
    }
    return false;
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <p className="text-center text-sm text-gray-400 mb-6">Select a wallet to import.</p>

      <div className="relative mb-6">
        <motion.button
          whileHover={{ backgroundColor: 'rgba(31, 41, 55, 1)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => !isLoading && setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-gray-800 border border-gray-700 p-2 rounded flex justify-between items-center text-left text-white"
          style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          {selectedWallet}
          <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown />
          </motion.div>
        </motion.button>
        <AnimatePresence>
          {!isLoading && isDropdownOpen && (
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
      {renderContent()}
      <Button
        onClick={handleImport}
        className="w-full bg-white text-gray-900 hover:bg-gray-200"
        disabled={isButtonDisabled()}
      >
        {derKey.solana
          ? 'Import Solana Wallet'
          : derKey.ethereum || derKey.polygon
            ? 'Import ETH/POL Wallet'
            : 'Import Wallet'}
      </Button>
    </div>
  );
};

export default ImportWallets;
