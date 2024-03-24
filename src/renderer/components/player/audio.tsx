import { memo, useEffect, useRef } from 'react';
import useStore from 'store/index';

export default memo(() => {
  const [url, autoPlay, pause, setCurrentTime] = useStore((state) => [
    state.playData.url,
    state.autoPlay,
    state.pause,
    state.setCurrentTime,
  ]);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    pause();
    if (audioRef?.current) {
      audioRef.current.addEventListener('timeupdate', () => {
        // 更新存储于store的播放时间
        setCurrentTime(Math.floor(audioRef.current.currentTime));
      });
    }
  }, []);

  return <audio ref={audioRef} id="audio" src={url} preload="auto" autoPlay={autoPlay} />;
});
