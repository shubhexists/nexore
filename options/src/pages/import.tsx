/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIP39, Utils } from '@/shared';
import { KeyIcon, LockIcon } from 'lucide-react';
import React from 'react';

const InitialSlide = React.lazy(() => import('@/components/_importWallet/initialScreen'));
const RecoveryPhraseInput = React.lazy(() => import('@/components/_importWallet/recoveryPhase'));
const PrivateKeyInputProps = React.lazy(() => import('@/components/_importWallet/privateKeyOne'));
const PasswordSetup = React.lazy(() => import('@/components/_importWallet/privateKeyTwo'));
const ImportWallets = React.lazy(() => import('@/components/_importWallet/recoveryPhaseTwo'));
const PhasePasswordSetup = React.lazy(() => import('@/components/_importWallet/recoveryPhaseThree'));

const SetupComplete = React.lazy(() => import('@/components/finalScreen'));

const importMethods = [
  {
    name: 'Import secret recovery phrase',
    icon: KeyIcon,
    description: 'Import accounts from another wallet',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Import private key',
    icon: LockIcon,
    description: 'Import a single-chain account',
    color: 'from-blue-500 to-teal-500',
  },
];

const blockchains = [
  { name: 'Solana', icon: '◎', value: 'solana' },
  { name: 'Ethereum', icon: '♦', value: 'ethereum' },
  { name: 'Polygon', icon: '⬡', value: 'polygon' },
];

export function ImportComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [recoveryPhrase, setRecoveryPhrase] = useState(Array(12).fill(''));
  const [use24Words, setUse24Words] = useState(false);
  const [selectedBlockchain, setSelectedBlockchain] = useState('solana');
  const [privateKey, setPrivateKey] = useState('');
  const [walletName, setWalletName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [checked, setChecked] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [invalidWords, setInvalidWords] = useState<number[]>([]);
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [derKey, setDerKey] = useState<{ solana: string; ethereum: string; polygon: string }>({
    solana: '',
    ethereum: '',
    polygon: '',
  });

  function makeGoodInputMessage(): string {
    const sortedInvalidWords = invalidWords.sort((a, b) => a - b);
    let outputString = '';

    if (sortedInvalidWords.length === 1) {
      outputString = `Word ${sortedInvalidWords[0] + 1} is incorrect or misspelled.`;
    } else {
      outputString = 'Words ';
      for (let i = 0; i < sortedInvalidWords.length - 1; i++) {
        outputString += `${sortedInvalidWords[i] + 1}, `;
      }
      outputString = outputString.slice(0, -2);
      outputString += ` and ${sortedInvalidWords[sortedInvalidWords.length - 1] + 1} are incorrect or misspelled.`;
    }
    return outputString;
  }

  const handleInputChange = useCallback(
    (index: number, value: string) => {
      setRecoveryPhrase((prev) => {
        const newPhrase = [...prev];
        newPhrase[index] = value.toLowerCase().replace(/[^a-z]/g, '');
        return newPhrase;
      });

      if (value.endsWith(' ') && index < (use24Words ? 23 : 11)) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [use24Words]
  );

  const handlePaste = useCallback(
    (index: number, pastedText: string) => {
      const words = pastedText
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.match(/^[a-z]+$/));
      const maxWords = use24Words ? 24 : 12;

      setRecoveryPhrase((prev) => {
        const newPhrase = [...prev];
        for (let i = 0; i < words.length && index + i < maxWords; i++) {
          newPhrase[index + i] = words[i];
        }
        return newPhrase;
      });
      const focusIndex = Math.min(index + words.length, maxWords - 1);
      setTimeout(() => {
        inputRefs.current[focusIndex]?.focus();
        const input = inputRefs.current[focusIndex];
        if (input) {
          const len = input.value.length;
          input.setSelectionRange(len, len);
        }
      }, 0);
    },
    [use24Words]
  );
  const bip = new BIP39();
  const isWordInBIP39List = useCallback(bip.isWordInBIP39List, []);

  const validateWords = useCallback(() => {
    const newInvalidWords = recoveryPhrase
      .map((word, index) => (word !== '' && !isWordInBIP39List(word) ? index : -1))
      .filter((index) => index !== -1);
    setInvalidWords(newInvalidWords);
  }, [recoveryPhrase, isWordInBIP39List]);

  useEffect(() => {
    validateWords();
  }, [recoveryPhrase, validateWords]);

  const handleSwitchChange = useCallback(() => {
    setUse24Words((prev) => !prev);
    setRecoveryPhrase((prev) => {
      if (prev.length === 12) {
        return [...prev, ...Array(12).fill('')];
      } else {
        return prev.slice(0, 12);
      }
    });
  }, []);

  const handleImport = useCallback(() => {
    const seed = bip.mnemonicToSeed(recoveryPhrase.join(' '));
    console.log(seed);
    setCurrentSlide((prevSlide) => prevSlide + 1);
  }, [recoveryPhrase]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, use24Words ? 24 : 12);
  }, [use24Words]);

  const isImportDisabled = recoveryPhrase.some((word) => word === '') || invalidWords.length > 0;

  const handlePrivateKeyChange = (value: string) => {
    const trimmedValue = value.trim();
    if (selectedBlockchain === 'solana') {
      try {
        const address = Utils.getSolanaPublicKeyFromPrivateKey(trimmedValue);
        setWalletAddress(address);
      } catch (e) {
        setWalletAddress('Invalid Format');
      }
    } else if (selectedBlockchain === 'ethereum') {
      try {
        const address = Utils.getEthereumPublicKeyFromPrivateKey(trimmedValue);
        setWalletAddress(address);
      } catch (e) {
        setWalletAddress('Invalid Format');
      }
    } else {
      try {
        const address = Utils.getPolygonPublicKeyFromPrivateKey(trimmedValue);
        setWalletAddress(address);
      } catch (e) {
        setWalletAddress('Invalid Format');
      }
    }
    setPrivateKey(trimmedValue);
  };

  useEffect(() => {
    if (privateKey) {
      handlePrivateKeyChange(privateKey);
    }
  }, [selectedBlockchain]);

  const slides = {
    initial: [
      {
        title: 'Import your Wallet(s)',
        content: (
          <Suspense>
            <InitialSlide
              importMethods={importMethods}
              hoveredMethod={hoveredMethod}
              setHoveredMethod={setHoveredMethod}
              setSelectedMethod={setSelectedMethod}
            />
          </Suspense>
        ),
      },
    ],
    recoveryPhrase: [
      {
        title: 'Secret Recovery Phrase',
        content: (
          <Suspense>
            <RecoveryPhraseInput
              recoveryPhrase={recoveryPhrase}
              use24Words={use24Words}
              handleImport={handleImport}
              handleInputChange={handleInputChange}
              handlePaste={handlePaste}
              handleSwitchChange={handleSwitchChange}
              invalidWords={invalidWords}
              isImportDisabled={isImportDisabled}
              makeGoodInputMessage={makeGoodInputMessage}
            />
          </Suspense>
        ),
      },
      {
        title: 'Import Wallets',
        content: (
          <Suspense>
            <ImportWallets
              derKey={derKey}
              setDerKey={setDerKey}
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              recoveryPhase={recoveryPhrase}
            />
          </Suspense>
        ),
      },
      {
        title: 'Create a password',
        content: (
          <Suspense>
            <PhasePasswordSetup
              derivationKey={derKey}
              confirmPassword={confirmPassword}
              recoveryPhase={recoveryPhrase}
              setChecked={setChecked}
              setConfirmPassword={setConfirmPassword}
              setIsSetupComplete={setIsSetupComplete}
              password={password}
              setPassword={setPassword}
              checked={checked}
            />
          </Suspense>
        ),
      },
    ],
    privateKey: [
      {
        title: 'Import Private Key',
        content: (
          <Suspense>
            <PrivateKeyInputProps
              walletName={walletName}
              walletAddress={walletAddress}
              selectedBlockchain={selectedBlockchain}
              privateKey={privateKey}
              handlePrivateKeyChange={handlePrivateKeyChange}
              setWalletName={setWalletName}
              currentSlide={currentSlide}
              blockchains={blockchains}
              setCurrentSlide={setCurrentSlide}
              setSelectedBlockchain={setSelectedBlockchain}
            />
          </Suspense>
        ),
      },
      {
        title: 'Create a password',
        content: (
          <Suspense>
            <PasswordSetup
              walletName={walletName}
              walletAddress={walletAddress}
              confirmPassword={confirmPassword}
              privateKey={privateKey}
              selectedBlockchain={selectedBlockchain}
              setChecked={setChecked}
              setConfirmPassword={setConfirmPassword}
              setIsSetupComplete={setIsSetupComplete}
              password={password}
              setPassword={setPassword}
              checked={checked}
            />
          </Suspense>
        ),
      },
    ],
  };

  const currentSlides = selectedMethod
    ? slides[selectedMethod === 'Import secret recovery phrase' ? 'recoveryPhrase' : 'privateKey']
    : slides.initial;

  const showDots = currentSlides.length > 1;

  if (isSetupComplete) {
    return <SetupComplete />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-red-500 mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
          <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 01.878.645 49.17 49.17 0 01.376 5.452.657.657 0 01-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 01-.595 4.845.75.75 0 01-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 01-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 01-.658.643 49.118 49.118 0 01-4.708-.36.75.75 0 01-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 005.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82.75.75 0 01.83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 00.657-.642z" />
        </svg>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold mb-2"
      >
        {selectedMethod ? currentSlides[currentSlide].title : slides.initial[0].title}
      </motion.h1>
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {selectedMethod ? currentSlides[currentSlide].content : slides.initial[0].content}
          </motion.div>
        </AnimatePresence>
        {showDots && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex space-x-2 mt-4 justify-center"
          >
            {currentSlides.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-700'}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: index === currentSlide ? 1.2 : 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
