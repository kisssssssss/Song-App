import { memo } from 'react';
import classNames from 'classnames';
import useStore from 'store/index';

import Cover from './cover';
import Audio from './audio';
import FoldButton from './foldButton';
import Control from './control';

export default memo(() => {
  const [isMenuFolded, isPlayerFolded,] = useStore((state) => [state.isMenuFolded, state.isPlayerFolded]);

  const playerClass = classNames(
    'absolute bottom-0 left-0 right-0 z-10 h-16 lg:h-20 xl:h-24 rounded-r-lg border-t-1 border-divider bg-content2 transition-all duration-400',
    {
      'w-full': !isPlayerFolded,
      'md:w-40 lg:w-44 xl:w-48': isPlayerFolded && !isMenuFolded,
      'player-base-width border-r-1': isPlayerFolded && isMenuFolded,
    },
  );

  return (
    <div className={playerClass}>
      {/* 歌曲封面 */}
      <Cover />
      {/* 控制组件 */}
      <Control />
      {/* 折叠按钮 */}
      <FoldButton />
      <Audio />
    </div>
  );
});
