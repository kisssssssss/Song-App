import { memo, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';

import useStore from 'store/index';
import { formatSecondTime, formatMillisecondTime } from 'utils/index';

import Icon from 'components/icon';
import { Slider } from '@nextui-org/react';

const buttonClass = 'cursor-pointer rounded-lg hover:bg-primary-200/20 hover:fill-primary-400/80 active:fill-primary-500 px-0.5 my-0.5 mx-1';

export default memo(() => {
  const [isMenuFolded, isPlayerFolded, playData, setPlayStatus, setAudioCurrentTime] = useStore((state) => [
    state.isMenuFolded,
    state.isPlayerFolded,
    state.playData,
    state.setPlayStatus,
    state.setAudioCurrentTime,
  ]);

  // 歌曲当前已播放时间
  const currentTime = useStore((state) => state.currentTime);
  // 当前播放进度
  const [sliderValue, setSliderValue] = useState<number>(currentTime);
  // 当前播放进度条是否处于拖动中
  const isSliderDrag = useRef<boolean>(false);

  useEffect(() => {
    if (!isSliderDrag.current) {
      setSliderValue(currentTime);
    }
  }, [currentTime]);

  let renderResult = null;

  if (isPlayerFolded && !isMenuFolded) {
    renderResult = (
      <Icon
        name={playData.playing ? 'play' : 'pause'}
        onClick={() => setPlayStatus(!playData.playing)}
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
            <Icon size={[36, 36]} name={playData.playing ? 'play' : 'pause'} onClick={() => setPlayStatus(!playData.playing)} className={buttonClass} />
          </div>
          <div className="active:scale-90">
            <Icon size={[36, 36]} name="next" className={buttonClass} />
          </div>
          <div className="mx-4 flex h-full w-64 flex-grow flex-col">
            <span className="mt-0.5 truncate text-center text-sm lg:my-1 xl:my-2" title={playData.song.name}>
              {playData.song.name}
            </span>
            <Slider
              size="sm"
              aria-label="progress"
              color="foreground"
              value={sliderValue}
              minValue={0}
              maxValue={Math.floor(playData.duration / 1000)}
              onChange={(values: number) => {
                isSliderDrag.current = true;
                setSliderValue(values);
              }}
              onChangeEnd={(values: number) => {
                isSliderDrag.current = false;
                setAudioCurrentTime(values);
              }}
              classNames={{
                filler: 'rounded-lg',
                track: 'bg-default-500/30 w-full track lg:h-1.5 xl:h-2',
                thumb: 'w-2 h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 after:w-2 after:h-2 after:bg-foreground before:w-3 before:h-3',
              }}
            />
            <span className="text-center text-[12px]">
              {formatSecondTime(sliderValue)}/{formatMillisecondTime(playData.song.duration)}
            </span>
          </div>
          <div>
            <Icon size={[20, 20]} name="fullScreenEnter" className="cursor-pointer hover:fill-primary-500/80" />
          </div>
        </div>
      </div>
    );
  }

  return renderResult;
});
