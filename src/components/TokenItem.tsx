import { FC } from 'react';
import EthereumIcon from '@/assets/icons/ethereum';
import PolygonIcon from '@/assets/icons/polygon';
import SolanaIcon from '@/assets/icons/solana';

const logoMap: Record<string, FC<React.SVGProps<SVGSVGElement>>> = {
  Solana: SolanaIcon,
  Ethereum: EthereumIcon,
  Polygon: PolygonIcon,
};

type TokenItemProps = {
  name: string;
  symbol: string;
  amount: string;
  value: string;
  change: string;
};

function TokenItem({ name, symbol, amount, value, change }: TokenItemProps) {
  const isPositive = change.startsWith('+');
  const Logo = logoMap[name] || null;

  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center">
          {Logo && <Logo className="w-6 h-6 text-white" />}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-400">
            {amount} {symbol}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">${value}</p>
        <p className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>{change}</p>
      </div>
    </div>
  );
}

export default TokenItem;
