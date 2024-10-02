import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SlideTwoProps {
  phraseWarningAcknowledged: boolean;
  setPhraseWarningAcknowledged: (value: boolean) => void;
  setCurrentSlide: (slide: number) => void;
}

const SlideTwo: React.FC<SlideTwoProps> = ({
  phraseWarningAcknowledged,
  setPhraseWarningAcknowledged,
  setCurrentSlide,
}) => {
  return (
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
              This is the <strong>ONLY</strong> way to recover your account if you lose access to your device or
              password.
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="flex items-center p-4">
            <Lock className="text-white mr-2" />
            <p className="text-sm text-white">
              Write it down, store it in a safe place, and NEVER share it with anyone.
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center space-x-2 mt-6"
      >
        <Checkbox
          id="understand"
          checked={phraseWarningAcknowledged}
          onCheckedChange={(checked: boolean) => setPhraseWarningAcknowledged(checked as boolean)}
          className="border-white"
        />
        <label
          htmlFor="understand"
          className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I understand that I am responsible for saving my secret recovery phrase, and that it is the only way to
          recover my wallet.
        </label>
      </motion.div>
      <Button
        onClick={() => setCurrentSlide(2)}
        disabled={!phraseWarningAcknowledged}
        className="w-full mt-6 bg-white text-gray-900 hover:bg-gray-200"
      >
        Show Secret Recovery Phrase
      </Button>
    </>
  );
};

export default SlideTwo;
