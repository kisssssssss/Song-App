import { memo } from "react";
import classNames from "classnames";
import useStore from "store/index";

import Icon from "assets/icon";
import Cover from "./cover";

export default memo(() => {
  const [isMenuFolded, isPlayerFolded, setIsPlayerFolded] = useStore((state) => [state.isMenuFolded, state.isPlayerFolded, state.setIsPlayerFolded]);

  const playerClass = classNames(
    "absolute bottom-0 left-0 right-0 z-10 h-16 lg:h-20 xl:h-24 rounded-r-lg border-t-1 border-divider bg-content2 transition-all duration-400",
    { "w-full": !isPlayerFolded, "md:w-40 lg:w-44 xl:w-48": isPlayerFolded && !isMenuFolded, "player-base-width border-r-1": isPlayerFolded && isMenuFolded },
  );
  const foldClass = classNames(
    "group absolute right-0 bottom-0 h-full cursor-pointer rounded-lg border-t-1 border-r-1 border-divider bg-default-200/60 shadow-sm hover:bg-primary-500/30",
    { "-right-[20px]": isPlayerFolded && isMenuFolded },
  );

  return (
    <div className={playerClass}>
      <Cover mask={isPlayerFolded && isMenuFolded} />
      <div className={foldClass} onClick={() => setIsPlayerFolded(!isPlayerFolded)}>
        <Icon name="playerFold" height={20} className="mx-o.5 mt-[22px] group-hover:fill-primary-500 lg:mt-[30px] xl:mt-[38px]"></Icon>
      </div>
    </div>
  );
});
