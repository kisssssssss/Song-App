import { memo } from 'react';
import classNames from 'classnames';

import useStore from 'store/index';
import { cut } from '../../utils';

import Icon from 'components/icon';
import { Image } from '@nextui-org/react';

export default memo(() => {
  const [isMenuFolded, isPlayerFolded, cover, playing, setPlayStatus] = useStore((state) => [
    state.isMenuFolded,
    state.isPlayerFolded,
    state.playData.song.cover,
    state.playData.playing,
    state.setPlayStatus,
  ]);

  const sizeClass = 'h-[54px] w-[54px] lg:h-16 lg:w-16 xl:h-20 xl:w-20';

  const MaskClass = classNames('group absolute left-0 top-0 z-10 hidden cursor-pointer rounded-small bg-zinc-500/30', sizeClass, {
    'group-hover/play:block': isPlayerFolded && isMenuFolded,
  });

  return (
    <div className="group/play relative ml-[9px] mt-[3px] max-w-fit lg:ml-1 lg:mt-2 xl:ml-2 xl:mt-2">
      <Image isBlurred radius="sm" src={cut(cover, 96)} className={sizeClass} />
      <div className={MaskClass}>
        <Icon
          size={[36, 36]}
          name={playing ? 'play' : 'pause'}
          onClick={() => setPlayStatus(!playing)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:fill-primary-500"
        />
      </div>
    </div>
  );
});
