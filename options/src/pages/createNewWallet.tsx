import { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PersistentStorage,
  NOT_HAS_CIPHER,
  BIP39,
  HDKeys,
  PBKDF2,
  KEYRING_STORE,
  AccountType,
  ACCOUNT_METADATA,
  CURRENT_ACCOUNT_METADATA,
  RFC_URL,
  DEFAULT_LOCK,
} from '@/shared';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const SlideOne = React.lazy(() => import('@/components/_createNewWallet/slideOne'));
const SlideTwo = React.lazy(() => import('@/components/_createNewWallet/slideTwo'));
const SlideThree = React.lazy(() => import('@/components/_createNewWallet/slideThree'));

const SetupComplete = React.lazy(() => import('@/components/finalScreen'));

export function CreateNewComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [phraseSaved, setPhraseSaved] = useState(false);
  const [phraseWarningAcknowledged, setPhraseWarningAcknowledged] = useState(false);
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  const ethPath = "m/44'/60'/0'/0/0";
  const polPath = "m/44'/60'/0'/0/0";
  const solPath = "m/44'/501'/0'/0'";

  useEffect(() => {
    const generatedMnemonic = new BIP39().generateMnemonic(128);
    setMnemonic(generatedMnemonic);
  }, []);

  const handleCopy = () => {
    const mnemonicText = mnemonic.join(' ');
    navigator.clipboard.writeText(mnemonicText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleFinish = async () => {
    const seedBuffer = new BIP39().mnemonicToSeed(mnemonic.join(' '));
    const ethKey = new HDKeys(seedBuffer, ethPath).generateEthereumPublicKey();
    const polKey = new HDKeys(seedBuffer, polPath).generatePolygonPublicKey();
    const solKey = new HDKeys(seedBuffer, solPath).generateSolanaPublicKey();
    const crypto = new PBKDF2.PBKDF2Crypto();
    const textMnemonic = mnemonic.join(' ');
    const baseAccountId = uuidv4();
    const cipherText = await crypto.encrypt(password, textMnemonic);
    await new PersistentStorage<PBKDF2.EncryptedData>().setItem(KEYRING_STORE, cipherText);
    await new PersistentStorage<AccountType.Nexore>().setItem(ACCOUNT_METADATA, {
      accounts: [
        {
          cipher: true,
          uuid: baseAccountId,
          developer_mode: false,
          account_name: 'Account 1',
          wallets: {
            active_networks: {
              [AccountType.SupportedChains.ETHEREUM]: {
                public_key: ethKey,
                amount_in_units: '0',
                rfc_url: RFC_URL.ETH_BASE_URL,
                derivation_path: ethPath,
              },
              [AccountType.SupportedChains.POLYGON]: {
                public_key: polKey,
                amount_in_units: '0',
                rfc_url: RFC_URL.POLYGON_MAIN_URL,
                derivation_path: polPath,
              },
              [AccountType.SupportedChains.SOLANA]: {
                public_key: solKey,
                amount_in_units: '0',
                rfc_url: RFC_URL.SOLANA_MAIN_URL,
                derivation_path: solPath,
              },
            },
          },
        },
      ],
    });
    await new PersistentStorage<AccountType.CurrentMetadata>().setItem(CURRENT_ACCOUNT_METADATA, {
      account: {
        cipher: true,
        uuid: baseAccountId,
        developer_mode: false,
        account_name: 'Account 1',
        wallets: {
          active_networks: {
            [AccountType.SupportedChains.ETHEREUM]: {
              public_key: ethKey,
              amount_in_units: '0',
              rfc_url: RFC_URL.ETH_BASE_URL,
              derivation_path: ethPath,
            },
            [AccountType.SupportedChains.POLYGON]: {
              public_key: polKey,
              amount_in_units: '0',
              rfc_url: RFC_URL.POLYGON_MAIN_URL,
              derivation_path: polPath,
            },
            [AccountType.SupportedChains.SOLANA]: {
              public_key: solKey,
              amount_in_units: '0',
              rfc_url: RFC_URL.SOLANA_MAIN_URL,
              derivation_path: solPath,
            },
          },
        },
      },
      autolocktime: DEFAULT_LOCK,
      theme: AccountType.Mode.DARK,
    });
    await new PersistentStorage<boolean>().setItem(NOT_HAS_CIPHER, false);
    setIsSetupComplete(true);
  };

  const slides = [
    {
      title: 'Create a password',
      content: (
        <Suspense>
          <SlideOne
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            setCurrentSlide={setCurrentSlide}
          />
        </Suspense>
      ),
    },
    {
      title: 'Secret Recovery Phrase Warning',
      content: (
        <Suspense>
          <SlideTwo
            phraseWarningAcknowledged={phraseWarningAcknowledged}
            setPhraseWarningAcknowledged={setPhraseWarningAcknowledged}
            setCurrentSlide={setCurrentSlide}
          />
        </Suspense>
      ),
    },
    {
      title: 'Secret Recovery Phrase',
      content: (
        <Suspense>
          <SlideThree
            mnemonic={mnemonic}
            handleCopy={handleCopy}
            copied={copied}
            phraseSaved={phraseSaved}
            setPhraseSaved={setPhraseSaved}
            handleFinish={handleFinish}
          />
        </Suspense>
      ),
    },
  ];

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
        {slides[currentSlide].title}
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
            {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex space-x-2 mt-4"
      >
        {slides.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-700'}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: index === currentSlide ? 1.2 : 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.div>
    </div>
  );
}
