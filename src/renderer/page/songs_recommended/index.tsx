import { memo, useEffect, useState } from "react";

import useStore from "store/index";

import Recommender from "components/recommender/song";
import Scroll from "components/scroll";

const Songs = memo(() => {
  const [daily, setDaily] = useState([]);
  const [newly, setNewly] = useState([]);
  const [getDaily, getNew] = useStore((state) => [state.getDailyRecommend, state.getNewRecommend]);

  useEffect(() => {
    (async () => {
      setDaily(await getDaily());
      setNewly(await getNew());
    })();
  }, []);

  return (
    <Scroll config={{ scrollConfig: { scrollbar: { interactive: true } }, customConfig: { isDrag: true } }} className="mr-1 flex-grow py-2 pl-3 pr-2">
      <div className="pb-20 pt-4">
        <Recommender title="每日推荐歌曲" data={daily} />
        <Recommender title="推荐新歌曲" data={newly} />
      </div>
    </Scroll>
  );
});

export default Songs;
