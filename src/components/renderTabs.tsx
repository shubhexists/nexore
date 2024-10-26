import { ActivityContent } from '@/pages/activity';
import { NFTsContent } from '@/pages';
import { SettingsContent } from '@/pages/settings';
import WalletContent from '@/pages/wallet';

interface RenderTabContentProps {
  activeTab: string;
  isDarkMode: boolean;
}

export function renderTabContent({ activeTab, isDarkMode }: RenderTabContentProps) {
  switch (activeTab) {
    case 'wallet':
      return <WalletContent isDarkMode={isDarkMode} />;
    case 'nfts':
      return <NFTsContent isDarkMode={isDarkMode} />;
    case 'activity':
      return <ActivityContent isDarkMode={isDarkMode} />;
    case 'settings':
      return <SettingsContent isDarkMode={isDarkMode} />;
    default:
      return <WalletContent isDarkMode={isDarkMode} />;
  }
}
