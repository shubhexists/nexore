import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Menu, ChevronRight, Twitter, MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AccountType,
  EncryptedData,
  KEYRING_STORE,
  PBKDF2Crypto,
  PersistentStorage,
  PRIVATE_KEYRING_STORE,
} from '@/shared';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [openSheet, setOpenSheet] = useState<'menu' | 'forgotPassword' | null>(null);
  const [password, setPassword] = useState<string>('');

  const togglePassword = () => setShowPassword(!showPassword);

  const handleTryMorePasswords = () => {
    setOpenSheet(null);
  };

  const handleLoginClick = async () => {
    const storage = new PersistentStorage<EncryptedData>();
    const data = await storage.getItem(KEYRING_STORE);
    const pbkdf = new PBKDF2Crypto();
    if (data) {
      const decrypt = await pbkdf.decrypt(password, data);
      console.log(decrypt);
    } else {
      const privatekeystorage = new PersistentStorage<AccountType.PrivateKeyRingStoreType>();
      privatekeystorage.getItem(PRIVATE_KEYRING_STORE);
    }
  };

  const slideAnimation = {
    initial: {
      x: 300,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
    exit: {
      x: 300,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const bottomSheetAnimation = {
    initial: {
      y: '100%',
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white flex flex-col items-center justify-center relative w-[360px] h-[600px]">
      <Sheet open={openSheet === 'menu'} onOpenChange={(open) => setOpenSheet(open ? 'menu' : null)}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 p-2">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#1E1E1E]">
          <AnimatePresence>
            <motion.div variants={slideAnimation} initial="initial" animate="animate" exit="exit">
              <div className="space-y-4 mt-5">
                <MenuItem icon={<ChevronRight />} text="Reset Nexore" />
                <MenuItem icon={<ChevronRight />} text="Nexore" />
                <MenuItem icon={<Twitter />} text="Twitter" />
                <MenuItem icon={<MessageCircle />} text="Need help? Hop into Discord" />
              </div>
            </motion.div>
          </AnimatePresence>
        </SheetContent>
      </Sheet>

      <div className="w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-8">
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
          <h1 className="text-2xl font-bold">Nexore</h1>
        </div>

        <div className="mb-4 relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#1E1E1E] text-white placeholder-gray-500 border-none"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={togglePassword}
          >
            {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
          </Button>
        </div>

        <Button className="w-full bg-white text-black hover:bg-gray-200 mb-4" onClick={handleLoginClick}>
          Unlock
        </Button>

        <Sheet
          open={openSheet === 'forgotPassword'}
          onOpenChange={(open) => setOpenSheet(open ? 'forgotPassword' : null)}
        >
          <SheetTrigger asChild>
            <Button variant="link" className="text-gray-500 text-sm hover:text-white">
              Forgot password
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="bg-[#1E1E1E]">
            <AnimatePresence>
              <motion.div
                variants={bottomSheetAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed inset-x-0 bottom-0 bg-[#1E1E1E] p-6 rounded-t-2xl shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">?</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-white">Forgot your password?</h2>
                  <p className="text-gray-400 mb-6">
                    We can't recover your password as it is only stored on your computer. You can try more passwords or
                    reset your wallet with the secret recovery phrase.
                  </p>
                  <Button
                    className="w-full bg-[#2C2C2C] text-white font-semibold py-3 rounded-md mb-3 hover:bg-[#3C3C3C] transition-colors"
                    onClick={handleTryMorePasswords}
                  >
                    Try more Passwords
                  </Button>
                  <Button
                    className="w-full bg-[#E53935] text-white font-semibold py-3 rounded-md hover:bg-[#D32F2F] transition-colors"
                    onClick={handleLoginClick}
                  >
                    Reset Nexore
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

function MenuItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
      {icon}
      <span>{text}</span>
    </div>
  );
}
