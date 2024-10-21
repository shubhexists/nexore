import { FC } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ACCOUNT_METADATA,
  AccountType,
  PersistentStorage,
  RFC_URL,
  SolanaMainnet,
  PolygonMainnet,
  EthMainNet,
  NOT_HAS_CIPHER,
  CURRENT_ACCOUNT_METADATA,
  DEFAULT_LOCK,
  PBKDF2,
  PRIVATE_KEYRING_STORE,
} from '@/shared';
import { v4 as uuidv4 } from 'uuid';

interface PasswordSetupProps {
  password: string;
  privateKey: string;
  walletName: string;
  walletAddress: string;
  selectedBlockchain: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  checked: boolean;
  setChecked: (value: boolean) => void;
  setIsSetupComplete: (value: boolean) => void;
}

const PasswordSetup: FC<PasswordSetupProps> = ({
  privateKey,
  walletAddress,
  selectedBlockchain,
  walletName,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  checked,
  setChecked,
  setIsSetupComplete,
}) => {
  const handleFinish = async () => {
    const crypto = new PBKDF2.PBKDF2Crypto();
    const baseAccountId = uuidv4();
    const blockchain =
      selectedBlockchain === 'solana'
        ? AccountType.SupportedChains.SOLANA
        : selectedBlockchain === 'ethereum'
          ? AccountType.SupportedChains.ETHEREUM
          : AccountType.SupportedChains.POLYGON;

    let blockchainClass;
    if (selectedBlockchain === 'solana') {
      blockchainClass = new SolanaMainnet();
    } else if (selectedBlockchain === 'ethereum') {
      blockchainClass = new EthMainNet();
    } else if (selectedBlockchain === 'polygon') {
      blockchainClass = new PolygonMainnet();
    } else {
      throw new Error('Undefined Blockchain');
    }

    const cipherText = await crypto.encrypt(password, privateKey);
    const balance = await blockchainClass.getBalance(walletAddress);
    const rfcUrl =
      blockchain === AccountType.SupportedChains.SOLANA
        ? RFC_URL.SOLANA_MAIN_URL
        : blockchain === AccountType.SupportedChains.POLYGON
          ? RFC_URL.POLYGON_MAIN_URL
          : RFC_URL.ETH_BASE_URL;

    await new PersistentStorage<AccountType.PrivateKeyRingStoreType>().setItem(PRIVATE_KEYRING_STORE, {
      keys: [{ ...cipherText, id: baseAccountId }],
    });
    await new PersistentStorage<AccountType.Nexore>().setItem(ACCOUNT_METADATA, {
      accounts: [
        {
          cipher: false,
          uuid: baseAccountId,
          developer_mode: false,
          account_name: walletName,
          wallets: {
            active_networks: {
              [blockchain]: {
                public_key: walletAddress,
                amount_in_units: balance,
                rfc_url: rfcUrl,
                
              },
            },
          },
        },
      ],
    });
    await new PersistentStorage<AccountType.CurrentMetadata>().setItem(CURRENT_ACCOUNT_METADATA, {
      account: {
        cipher: false,
        uuid: baseAccountId,
        developer_mode: false,
        account_name: walletName,
        wallets: {
          active_networks: {
            [blockchain]: {
              public_key: walletAddress,
              amount_in_units: balance,
              rfc_url: rfcUrl,
            },
          },
        },
      },
      autolocktime: DEFAULT_LOCK,
      theme: AccountType.Mode.DARK,
    });
    await new PersistentStorage<boolean>().setItem(NOT_HAS_CIPHER, true);
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

export default PasswordSetup;
