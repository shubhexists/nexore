import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface SlideOneProps {
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  termsAccepted: boolean;
  setTermsAccepted: (accepted: boolean) => void;
  setCurrentSlide: (slide: number) => void;
}

const SlideOne: React.FC<SlideOneProps> = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  termsAccepted,
  setTermsAccepted,
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
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked: boolean) => setTermsAccepted(checked as boolean)}
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
        onClick={() => setCurrentSlide(1)}
        disabled={password !== confirmPassword || password.length === 0 || !termsAccepted}
        className="w-full mt-6 bg-white text-gray-900 hover:bg-gray-200"
      >
        Continue
      </Button>
    </>
  );
};

export default SlideOne;
