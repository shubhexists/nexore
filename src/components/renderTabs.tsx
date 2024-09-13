import { ActivityContent } from '@/pages/activity';
import { NftsContent } from '@/pages/nfts';
import { SettingsContent } from '@/pages/settings';
import { WalletContent } from '@/pages/wallet';

export function renderTabContent(activeTab: string) {
  switch (activeTab) {
    case 'wallet':
      return <WalletContent />;
    case 'nfts':
      return <NftsContent />;
    case 'activity':
      return <ActivityContent />;
    case 'settings':
      return <SettingsContent />;
    default:
      return <WalletContent />;
  }
}
