import { FC } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { v4 as uuidv4 } from 'uuid';
import {
  ACCOUNT_METADATA,
  AccountType,
  BIP39,
  CURRENT_ACCOUNT_METADATA,
  DEFAULT_LOCK,
  HDKeys,
  KEYRING_STORE,
  NOT_HAS_CIPHER,
  PBKDF2,
  PersistentStorage,
  RFC_URL,
} from '@/shared';

interface PasswordSetupProps {
  password: string;
  recoveryPhase: string[];
  derivationKey: { solana: string; ethereum: string; polygon: string };
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  checked: boolean;
  setChecked: (value: boolean) => void;
  setIsSetupComplete: (value: boolean) => void;
}

const PhasePasswordSetup: FC<PasswordSetupProps> = ({
  password,
  recoveryPhase,
  derivationKey,
  setIsSetupComplete,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  checked,
  setChecked,
}) => {
  const handleFinish = async () => {
    const seedBuffer = new BIP39().mnemonicToSeed(recoveryPhase.join(' '));
    const textMnemonic = recoveryPhase.join(' ');
    const baseAccountId = uuidv4();
    const crypto = new PBKDF2.PBKDF2Crypto();

    const cipherText = await crypto.encrypt(password, textMnemonic);
    await new PersistentStorage<PBKDF2.EncryptedData>().setItem(KEYRING_STORE, cipherText);

    const activeNetworks: Partial<
      Record<
        AccountType.SupportedChains,
        {
          public_key: string;
          amount_in_units: string;
          rfc_url: string;
          derivation_path: string;
        }
      >
    > = {};

    if (derivationKey.ethereum) {
      const ethKey = new HDKeys(seedBuffer, derivationKey.ethereum).generateEthereumPublicKey();
      activeNetworks[AccountType.SupportedChains.ETHEREUM] = {
        public_key: ethKey,
        amount_in_units: '0',
        rfc_url: RFC_URL.ETH_BASE_URL,
        derivation_path: derivationKey.ethereum,
      };
    }

    if (derivationKey.polygon) {
      const polKey = new HDKeys(seedBuffer, derivationKey.polygon).generatePolygonPublicKey();
      activeNetworks[AccountType.SupportedChains.POLYGON] = {
        public_key: polKey,
        amount_in_units: '0',
        rfc_url: RFC_URL.POLYGON_MAIN_URL,
        derivation_path: derivationKey.polygon,
      };
    }

    if (derivationKey.solana) {
      const solKey = new HDKeys(seedBuffer, derivationKey.solana).generateSolanaPublicKey();
      activeNetworks[AccountType.SupportedChains.SOLANA] = {
        public_key: solKey,
        amount_in_units: '0',
        rfc_url: RFC_URL.SOLANA_MAIN_URL,
        derivation_path: derivationKey.solana,
      };
    }

    await new PersistentStorage<AccountType.Nexore>().setItem(ACCOUNT_METADATA, {
      accounts: [
        {
          cipher: true,
          uuid: baseAccountId,
          developer_mode: false,
          account_name: 'Account 1',
          wallets: {
            active_networks: activeNetworks,
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
          active_networks: activeNetworks,
        },
      },
      autolocktime: DEFAULT_LOCK,
      theme: AccountType.Mode.DARK,
    });
    
    await new PersistentStorage<boolean>().setItem(NOT_HAS_CIPHER, false);
    setIsSetupComplete(true);
  };

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
        <Checkbox id="terms" checked={checked} onCheckedChange={() => setChecked(!checked)} className="border-white" />
        <label
          htmlFor="terms"
          className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the <span className="text-white">Terms of Service</span>
        </label>
      </motion.div>
      <Button
        onClick={() => handleFinish()}
        disabled={!password || password !== confirmPassword || !checked}
        className="w-full mt-6 bg-white text-gray-900 hover:bg-gray-200"
      >
        Finish
      </Button>
    </>
  );
};

export default PhasePasswordSetup;
