import { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PrivateKeyInputProps {
  blockchains: { value: string; name: string; icon: string }[]; 
  selectedBlockchain: string;
  setSelectedBlockchain: (value: string) => void;
  walletName: string;
  setWalletName: (value: string) => void;
  privateKey: string;
  handlePrivateKeyChange: (value: string) => void;
  walletAddress: string;
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
}

const PrivateKeyInput: FC<PrivateKeyInputProps> = ({
  blockchains,
  selectedBlockchain,
  setSelectedBlockchain,
  walletName,
  setWalletName,
  privateKey,
  handlePrivateKeyChange,
  walletAddress,
  currentSlide,
  setCurrentSlide,
}) => {
  return (
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
  );
};

export default PrivateKeyInput;
