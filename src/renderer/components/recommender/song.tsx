import { memo, useCallback, useState } from 'react';
import useStore from 'store/index';
import { cut, formatMillisecondTime, getArtistNameString } from 'utils/index';
import type { Song } from '../../@types/index';

import Icon from 'components/icon';

type PropsType = {
  title: string;
  data: Song[];
};

export default memo<PropsType>(({ title, data }) => {
  const [play] = useStore((state) => [state.play]);
  const [currentPlayId] = useStore((state) => [state.playData.song.id]);

  const [page, setPage] = useState<number>(1);
  const addPage = useCallback(() => {
    if (page * 6 < data.length) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
  }, [page, data.length]);

  const decreasePage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(Math.ceil(data.length / 6));
    }
  }, [page, data.length]);

  if (data.length > 0) {
    return (
      <>
        <div className="mx-6 flex items-end justify-between">
          <h1 className="my-3 inline text-3xl font-bold">{title}</h1>
          <div className="flex ">
            <Icon name="left" className="mx-1 cursor-pointer hover:fill-primary-600/60" onClick={decreasePage} />
            <span className="text-sm text-default-400/60">{page}</span>
            <Icon name="right" className="mx-1 cursor-pointer hover:fill-primary-600/60" onClick={addPage} />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {data.slice((page - 1) * 6, page * 6).map((song) => (
            <div
              key={song.id}
              onClick={() => {
                play(song);
              }}
              className="group mx-2 my-2 flex h-16 cursor-pointer items-center overflow-hidden rounded-lg bg-content1 shadow-md transition-all hover:bg-primary-300/10 hover:shadow-lg lg:mx-3 lg:my-3 lg:h-20 xl:mx-4 xl:my-4 xl:h-28"
            >
              <img className="mx-2 h-12 w-12 rounded-lg lg:h-16 lg:w-16 xl:h-24 xl:w-24" src={cut(song.cover, 96)} alt="" />
              <div className="flex max-w-[60%] flex-grow flex-col justify-evenly md:max-w-[55%] xl:max-w-[50%]">
                <span className="truncate text-lg font-bold text-default-800/90 group-hover:text-primary-600 xl:text-2xl">{song.name}</span>
                <span className="ml-1 mt-1 truncate text-xs text-default-600/80">{getArtistNameString(song.artist)}</span>
              </div>
              <div className="flex h-full max-w-[96px] flex-grow flex-row-reverse items-center justify-center transition-all">
                {/* 当播放当前歌曲时，不显示时间，改为显示播放动画 */}
                {currentPlayId === song.id ? (
                  <div className="music">
                    <div className="music-bar 1"></div>
                    <div className="music-bar 2"></div>
                    <div className="music-bar 3"></div>
                  </div>
                ) : (
                  <span className="text-sm text-default-400/80">{formatMillisecondTime(song.duration)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return null;
  }
});
