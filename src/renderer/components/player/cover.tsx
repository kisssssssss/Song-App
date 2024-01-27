import { memo } from "react";
import classNames from "classnames";

import { Image } from "@nextui-org/react";
import Icon from "assets/icon";

export default memo<{ mask: boolean }>(({ mask }) => {
  return (
    <div className="group/play relative max-w-fit">
      <Image isBlurred radius="sm" src="https://picsum.photos/64/64" className="ml-1.5 mt-2 h-12 lg:h-16 xl:h-20" />
      <div
        className={classNames(
          "group absolute left-1.5 top-0 z-10 hidden h-12 w-12 cursor-pointer rounded-small bg-zinc-500/30 lg:h-16 lg:w-16 xl:h-20 xl:w-20",
          { "group-hover/play:block": mask },
        )}
      >
        <Icon name="play" width={36} height={36} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:fill-primary-500" />
      </div>
    </div>
  );
});
