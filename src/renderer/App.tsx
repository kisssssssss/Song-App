import { memo, useEffect, useLayoutEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import useStore from './store';
import routes from './routes';

import TitleBar from 'components/titleBar';
import SideBar from 'components/sideBar';
import Player from 'components/player';

const App = memo(() => {
  // 初始化主题
  const [initTheme, updateList] = useStore((state) => [state.initTheme, state.updateList]);

  useLayoutEffect(() => {
    initTheme();
    updateList();
  }, []);

  return (
    <div className="relative flex h-screen w-screen flex-col bg-background text-foreground transition-colors duration-250">
      <header className="region flex h-7 flex-nowrap items-center justify-end px-2 py-5">
        <TitleBar />
      </header>
      <main className="main flex grow">
        <SideBar />
        {useRoutes(routes)}
      </main>
      <Player />
    </div>
  );
});

export default App;
