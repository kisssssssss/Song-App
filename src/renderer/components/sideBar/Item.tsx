import React, { memo, useContext, useEffect, useRef } from "react";
import { Tooltip } from "@nextui-org/react";
import Icon, { IconName } from "assets/icon";
import classNames from "classnames";

import Context from "./context";

export type ItemProps = {
  icon?: IconName;
  title?: string;
  url?: string;
};

const Item: React.FC<ItemProps> = memo(({ icon, title, url }) => {
  const { folded, to, currentRoute } = useContext(Context);

  // 匹配当前路由时高亮
  const isSelected = currentRoute === url;
  const iconClass = classNames("transition-all group-hover:fill-primary-400 mx-2 xl:mx-3", { "fill-primary-400": isSelected });
  const titleClass = classNames("truncate text-lg transition-all group-hover:text-primary-400", { "text-primary-400": isSelected, hidden: folded });

  let result: React.ReactNode = (
    <div onClick={(e) => to(e, url)} className="group my-0.5 flex w-full cursor-pointer items-center rounded-lg py-2 text-default-500 hover:bg-primary-400/10">
      {icon && <Icon name={icon} size={[30, 30]} className={iconClass} />}
      <span className={titleClass}>{title}</span>
    </div>
  );

  // 侧边栏收缩时显示提示
  if (folded) {
    result = (
      <Tooltip content={title} placement="right" offset={20} delay={200} className="rounded-md bg-default-200/90">
        {result}
      </Tooltip>
    );
  }

  return result;
});

export const getItem = ({ icon, title, url }: ItemProps) => <Item icon={icon} title={title} url={url} key={url} />;

export default Item;
