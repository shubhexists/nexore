import { useState } from 'react';
import { HomeComponent } from './pages/home';
import { ImportComponent } from './pages/import';
import { CreateNewComponent } from './pages/createNewWallet';
import { Pages } from './@types';

export function App() {
  const [page, setPage] = useState<Pages>(Pages.MAIN);

  const renderPage = () => {
    switch (page) {
      case Pages.NEW:
        return <CreateNewComponent />;
      case Pages.IMPORT:
        return <ImportComponent />;
      default:
        return <HomeComponent setPage={setPage} />;
    }
  };

  return renderPage();
}
