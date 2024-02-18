import { memo } from 'react';
import classNames from 'classnames';

import useStore from 'store/index';

import Icon from 'components/icon';
import { Slider } from '@nextui-org/react';

export default memo(() => {
  const [isMenuFolded, isPlayerFolded, song, playing, setPlayStatus] = useStore((state) => [
    state.isMenuFolded,
    state.isPlayerFolded,
    state.playData.song,
    state.playData.playing,
    state.setPlayStatus,
  ]);

  const buttonClass =
    'cursor-pointer rounded-lg hover:bg-primary-200/20 hover:fill-primary-400/80 active:fill-primary-500 px-0.5 my-0.5 mx-1';

  let renderResult = null;

  if (isPlayerFolded && !isMenuFolded) {
    renderResult = (
      <Icon
        name={playing ? 'play' : 'pause'}
        onClick={() => setPlayStatus(!playing)}
        className={classNames(buttonClass, 'absolute left-20 top-1/2 h-8 w-8 -translate-y-1/2 lg:left-24 lg:h-9 xl:left-28 xl:h-10')}
      />
    );
  }

  if (!isPlayerFolded) {
    renderResult = (
      <div className="control-width absolute left-20 top-0 h-full lg:left-24 xl:left-28">
        <div className="flex h-full items-center">
          <div className="active:scale-90">
            <Icon size={[36, 36]} name="prev" className={buttonClass} />
          </div>
          <div className="active:scale-90">
            <Icon size={[36, 36]} name={playing ? 'play' : 'pause'} onClick={() => setPlayStatus(!playing)} className={buttonClass} />
          </div>
          <div className="active:scale-90">
            <Icon size={[36, 36]} name="next" className={buttonClass} />
          </div>
          <div className="mx-4 flex h-full w-64 flex-grow flex-col">
            <span className="mt-0.5 truncate text-center text-sm lg:my-1 xl:my-2" title={song.name}>
              {song.name}
            </span>
            <Slider
              size="sm"
              aria-label="progress"
              color="foreground"
              classNames={{
                track: 'bg-default-500/30 w-full track lg:h-1.5 xl:h-2',
                filler: 'rounded-lg',
                thumb: 'w-2 h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 after:w-2 after:h-2 after:bg-foreground before:w-3 before:h-3',
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return renderResult;
});
