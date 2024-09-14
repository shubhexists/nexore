import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Lock, Copy } from 'lucide-react';
import { BIP39 } from '@/services/bip39/bip39';
import { SetupComplete } from '@/components/finalScreen';

export function CreateNewComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const slides = [
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
          <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
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
            <Checkbox id="terms" checked={checked} onCheckedChange={() => setChecked(!checked)} className="border-white" />
            <label htmlFor="terms" className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I agree to the <span className="text-white">Terms of Service</span>
            </label>
          </motion.div>
        </>
      ),
    },
    {
      title: 'Secret Recovery Phrase Warning',
      content: (
        <>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-sm text-gray-400 mb-6"
          >
            On the next page, you will receive your secret recovery phrase.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="mb-4 bg-gray-800 border-gray-700">
              <CardContent className="flex items-center p-4">
                <AlertTriangle className="text-red-500 mr-2" />
                <p className="text-sm text-white">
                  This is the <strong>ONLY</strong> way to recover your account if you lose access to your device or password.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="flex items-center p-4">
                <Lock className="text-white mr-2" />
                <p className="text-sm text-white">Write it down, store it in a safe place, and NEVER share it with anyone.</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center space-x-2 mt-6"
          >
            <Checkbox id="understand" checked={checked} onCheckedChange={() => setChecked(!checked)} className="border-white" />
            <label htmlFor="understand" className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I understand that I am responsible for saving my secret recovery phrase, and that it is the only way to recover my wallet.
            </label>
          </motion.div>
        </>
      ),
    },
    {
      title: 'Secret Recovery Phrase',
      content: (
        <>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-sm text-gray-400 mb-6"
          >
            Save these words in a safe place.
          </motion.p>

          {/* Card Component */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
            <Card onClick={handleCopy} className="relative bg-gray-800 border-gray-700 mb-6 cursor-pointer">
              <CardContent className="grid grid-cols-3 gap-2 p-4">
                {mnemonic.map((word, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-gray-400">{index + 1}</span>
                    <span className="text-white">{word}</span>
                  </motion.div>
                ))}
              </CardContent>

              {/* Copy confirmation animation */}
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-90 rounded"
                  >
                    <p className="text-white font-semibold">Copied!</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center text-xs text-gray-400 flex items-center justify-center"
          >
            <Copy className="w-4 h-4 mr-1" />
            Click anywhere on this card to copy
          </motion.p>

          {/* Checkbox for confirmation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex items-center space-x-2 mt-6"
          >
            <Checkbox id="saved" checked={checked} onCheckedChange={() => setChecked(!checked)} className="border-white" />
            <label htmlFor="saved" className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I saved my secret recovery phrase
            </label>
          </motion.div>
        </>
      ),
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1 && isSlideValid()) {
      setCurrentSlide(currentSlide + 1);
      setChecked(false);
    } else if (currentSlide === slides.length - 1) {
      setIsSetupComplete(true);
    }
  };

  const isSlideValid = () => {
    if (currentSlide === 0) {
      return password === confirmPassword && password.length > 0 && checked;
    }
    return checked;
  };

  if (isSetupComplete) {
    return <SetupComplete />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-red-500 mb-6">
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Button onClick={nextSlide} disabled={!isSlideValid()} className="w-full mt-6 bg-white text-gray-900 hover:bg-gray-200">
            {currentSlide === slides.length - 1 ? 'Finish' : 'Continue'}
          </Button>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex space-x-2 mt-4">
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
