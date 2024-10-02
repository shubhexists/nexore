import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface SlideThreeProps {
  mnemonic: string[];
  handleCopy: () => void;
  copied: boolean;
  phraseSaved: boolean;
  setPhraseSaved: (value: boolean) => void;
  handleFinish: () => Promise<void>;
}

const SlideThree: React.FC<SlideThreeProps> = ({
  mnemonic,
  handleCopy,
  copied,
  phraseSaved,
  setPhraseSaved,
  handleFinish,
}) => {
  return (
    <>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center text-sm text-gray-400 mb-6"
      >
        Save these words in a safe place.
      </motion.p>
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex items-center space-x-2 mt-6"
      >
        <Checkbox
          id="saved"
          checked={phraseSaved}
          onCheckedChange={(checked: boolean) => setPhraseSaved(checked as boolean)}
          className="border-white"
        />
        <label
          htmlFor="saved"
          className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I saved my secret recovery phrase
        </label>
      </motion.div>
      <Button
        onClick={handleFinish}
        disabled={!phraseSaved}
        className="w-full mt-6 bg-white text-gray-900 hover:bg-gray-200"
      >
        Finish
      </Button>
    </>
  );
};

export default SlideThree;
