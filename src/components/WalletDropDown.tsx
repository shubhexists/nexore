import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy, Check } from 'lucide-react';
import { WalletInfo } from '@/@types';

const wallets: WalletInfo[] = [
  { name: 'Solana', icon: '◎', address: 'epG7...2Pzw' },
  { name: 'Ethereum', icon: 'Ξ', address: '0x6870...d19A' },
  { name: 'Polygon', icon: '⏣', address: '0x6870...d19P' },
  { name: 'Bitcoin', icon: '₿', address: 'bc1q...l0t5' },
];

export function AccountSelector({ activeAccount }: { activeAccount: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="w-12 h-12 rounded-full bg-blue-500 text-white font-bold text-xl p-0 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        {activeAccount[0]}
      </Button>
      {isOpen && (
        <Card
          ref={dropdownRef}
          className="absolute top-full mt-2 left-0 w-64 bg-gray-800 border-gray-700 text-white p-2 space-y-2 z-10 before:content-[''] before:absolute before:top-[-10px] before:left-4 before:border-l-[10px] before:border-r-[10px] before:border-b-[10px] before:border-b-white before:border-l-transparent before:border-r-transparent before:after:content-[''] before:after:absolute before:after:top-[2px] before:after:left-[8px] before:after:border-l-[8px] before:after:border-r-[8px] before:after:border-b-[8px] before:after:border-b-gray-800 before:after:border-l-transparent before:after:border-r-transparent"
        >
          {wallets.map((wallet) => (
            <div key={wallet.name} className="flex items-center justify-between p-2 hover:bg-gray-700 rounded">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{wallet.icon}</span>
                <div>
                  <p className="font-medium">{wallet.name}</p>
                  <p className="text-xs text-gray-400">{wallet.address}</p>
                </div>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 rounded-md bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200 ${
                        copiedAddress === wallet.address ? 'bg-green-600' : ''
                      } shadow-md`}
                      onClick={() => copyToClipboard(wallet.address)}
                    >
                      {copiedAddress === wallet.address ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copiedAddress === wallet.address ? 'Copied!' : 'Copy address'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
