import { ActionButton } from '@/components/ActionButton';
import TokenItem from '@/components/TokenItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUp as Send, ArrowDown as Receive, ArrowLeftRight as Swap } from 'lucide-react';

export function WalletContent() {
  return (
    <>
      <div className="p-4 text-center">
        <p className="text-sm text-gray-400">Total Balance</p>
        <h2 className="text-3xl font-bold">$1,234.56</h2>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2">
          <TokenItem name="Solana" symbol="SOL" amount="12.5" value="1000.00" change="+5.2%" />
          <TokenItem name="Bitcoin" symbol="BTC" amount="200" value="200.00" change="0%" />
          <TokenItem name="Ethereum" symbol="ETH" amount="0.1" value="34.56" change="-2.1%" />
          <TokenItem name="Polygon" symbol="POL" amount="0.1" value="34.56" change="-2.1%" />
        </div>
      </ScrollArea>

      <div className="p-4 grid grid-cols-3 gap-2">
        <ActionButton icon={<Send className="h-4 w-4" />} label="Send" />
        <ActionButton icon={<Receive className="h-4 w-4" />} label="Receive" />
        <ActionButton icon={<Swap className="h-4 w-4" />} label="Swap" />
      </div>
    </>
  );
}
