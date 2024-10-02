import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, Twitter, MessageCircle } from 'lucide-react';

function SetupComplete() {
  const handleButtonClick = () => {
    window.close();
  };

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold mb-2 text-center text-white">You're all set!</h1>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-400 mb-8 text-center"
      >
        Your wallet is ready to use. Keep your recovery phrase safe!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="grid grid-cols-3 gap-4 mb-8 w-full max-w-md"
      >
        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors duration-300">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Lock className="w-6 h-6 mb-2 text-blue-400" />
            <span className="text-sm text-white">Support</span>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors duration-300">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Twitter className="w-6 h-6 mb-2 text-blue-400" />
            <span className="text-sm text-white">@NexoreWallet</span>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors duration-300">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <MessageCircle className="w-6 h-6 mb-2 text-blue-400" />
            <span className="text-sm text-white">Discord</span>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Button className="w-full mt-6 bg-white text-gray-900 hover:bg-gray-200" onClick={handleButtonClick}>
          Open Wallet
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-gray-400">
          Tip: You can quickly access your wallet with the shortcut
          <br />
          <span className="font-semibold text-white">Shift + Alt + W</span>
        </p>
      </motion.div>
    </div>
  );
}

export default SetupComplete;
