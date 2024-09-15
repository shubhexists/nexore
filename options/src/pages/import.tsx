/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Utils } from '@/shared';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { SetupComplete } from '@/components/finalScreen';
import { KeyIcon, LockIcon, ArrowRightIcon } from 'lucide-react';

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
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);

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
          <div className="space-y-4 mt-4">
            {importMethods.map((method) => (
              <motion.div
                key={method.name}
                onClick={() => setSelectedMethod(method.name)}
                className="relative overflow-hidden rounded-lg"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <button
                  className="relative w-full p-4 bg-gray-800 text-left transition-all duration-300 group hover:bg-opacity-80"
                  onMouseEnter={() => setHoveredMethod(method.name)}
                  onMouseLeave={() => setHoveredMethod(null)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <method.icon className="h-8 w-8 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-white group-hover:text-white transition-colors duration-300">
                        {method.name}
                      </h3>
                      <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                        {method.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <ArrowRightIcon
                        className={`h-6 w-6 text-white transition-all duration-300 ${
                          hoveredMethod === method.name ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                        }`}
                      />
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        ),
      },
    ],
    recoveryPhrase: [
      {
        title: 'Secret Recovery Phrase',
        content: (
          <>
            <p className="text-center text-sm text-gray-400 mb-6">Enter or paste your 12 or 24-word phrase.</p>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-sm text-gray-400">Use 24 words</span>
              <Switch
                checked={use24Words}
                onCheckedChange={() => {
                  setUse24Words(!use24Words);
                  setRecoveryPhrase(Array(use24Words ? 12 : 24).fill(''));
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {recoveryPhrase.map((word, index) => (
                <Input
                  key={index}
                  type="text"
                  placeholder={`${index + 1}`}
                  value={word}
                  onChange={(e) => {
                    const newPhrase = [...recoveryPhrase];
                    newPhrase[index] = e.target.value;
                    setRecoveryPhrase(newPhrase);
                  }}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              ))}
            </div>
            <Button
              onClick={() => console.log('Recovery phrase imported')}
              disabled={recoveryPhrase.some((word) => word === '')}
              className="w-full mt-6 bg-white text-gray-900 hover:bg-gray-200"
            >
              Import
            </Button>
          </>
        ),
      },
    ],
    privateKey: [
      {
        title: 'Import Private Key',
        content: (
          <>
            <p className="text-center text-sm text-gray-400 mb-6">Enter your private key.</p>

            <div className="space-y-2">
              <Label htmlFor="blockchain" className="text-white">
                Select Blockchain
              </Label>
              <Select onValueChange={setSelectedBlockchain} value={selectedBlockchain}>
                <SelectTrigger id="blockchain" className="w-full bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select blockchain" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {blockchains.map((blockchain) => (
                    <SelectItem key={blockchain.value} value={blockchain.value} className="text-white">
                      <div className="flex items-center">
                        <span className="mr-2">{blockchain.icon}</span>
                        {blockchain.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Input
              id="walletName"
              placeholder="Enter Wallet Name"
              className="bg-gray-800 border-gray-700 text-white mt-4"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
            />

            <Textarea
              id="privateKey"
              placeholder="Enter private key"
              className={`bg-gray-800 border-gray-700 text-white h-40 resize-none mt-4 ${walletAddress === 'Invalid Format' ? 'border-red-500' : ''}`}
              value={privateKey}
              onChange={(e) => handlePrivateKeyChange(e.target.value)}
            />

            {walletAddress && (
              <div className="mt-4">
                <Label className="text-white">Wallet Address</Label>
                <p className={`mt-1 text-sm ${walletAddress === 'Invalid Format' ? 'text-red-500' : 'text-green-500'}`}>
                  {walletAddress}
                </p>
              </div>
            )}
            <Button
              onClick={() => setCurrentSlide(currentSlide + 1)}
              disabled={!walletName || !walletAddress || walletAddress === 'Invalid Format'}
              className="w-full mt-6 bg-white text-gray-900 hover:bg-gray-200"
            >
              Import
            </Button>
          </>
        ),
      },
      {
        title: 'Create a password',
        content: (
          <>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center text-sm text-gray-400 mb-6"
            >
              You will use this to unlock your wallet.
            </motion.p>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-2 mt-6"
            >
              <Checkbox
                id="terms"
                checked={checked}
                onCheckedChange={() => setChecked(!checked)}
                className="border-white"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the <span className="text-white">Terms of Service</span>
              </label>
            </motion.div>
            <Button
              onClick={() => setIsSetupComplete(true)}
              disabled={!password || password !== confirmPassword || !checked}
              className="w-full mt-6 bg-white text-gray-900 hover:bg-gray-200"
            >
              Finish
            </Button>
          </>
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
