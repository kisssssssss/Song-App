import { memo, useEffect } from 'react';
import useStore from 'store/index';

export default memo(() => {
  const [url, autoPlay, pause] = useStore((state) => [state.playData.url, state.autoPlay, state.pause]);

  useEffect(() => {
    pause();
  }, []);

  return <audio id="audio" src={url} preload="auto" autoPlay={autoPlay} />;
});
