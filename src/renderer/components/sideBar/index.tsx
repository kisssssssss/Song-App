import { memo, useCallback, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Divider } from "@nextui-org/react";

import Context from "./context";

import Scroll from "../scroll";
import Icon from "assets/icon";
import { getItem, ItemProps } from "./Item";
import { SONGS, LISTS, ALBUM } from "../../routes/url";

import { configType } from "../scroll";

export default memo(() => {
  // 跳转
  const navigate = useNavigate();
  const to = useCallback((event: any, url: string) => {
    navigate(url);
  }, []);

  // 获取路由
  const location = useLocation();

  // 侧边栏Ref
  const sideBarRef = useRef<HTMLDivElement>();
  // 折叠
  const [folded, setFolded] = useState<boolean>(false);
  useEffect(() => {
    // 通过增加宽度控制侧边栏是否折叠，以及设置基本宽度
    if (folded) {
      sideBarRef.current.classList.remove("md:w-40", "lg:w-44", "xl:w-48");
    } else {
      sideBarRef.current.classList.add("md:w-40", "lg:w-44", "xl:w-48");
    }
  }, [folded]);

  // 菜单选项
  const Items: ItemProps[] = [
    { icon: "song", title: "song", url: SONGS },
    { icon: "list", title: "list", url: LISTS },
    { icon: "album", title: "album", url: ALBUM },
  ];

  // 滚动配置
  const config: configType = { customConfig: { showScrollBar: folded, useMask: true }, scrollConfig: { bounce: false } };

  return (
    // 上下文，用于提供跳转函数，折叠状态，当前路由
    <Context.Provider value={{ to, folded, currentRoute: location.pathname }}>
      {/* 目录 */}
      <div
        ref={sideBarRef}
        className="menu-base-width menu-height relative flex-none rounded-r-lg bg-side-back pb-11 pt-6 transition-all md:w-40 lg:w-44 xl:w-48"
      >
        {/* 为了让滚动条在目录最右边而不是选项最右边，因此添加一层div */}
        <Scroll config={config} className="h-full px-3">
          <div>
            {Items.map((item) => getItem(item))}
            <Divider className="my-4" />
          </div>
        </Scroll>
        {/* 折叠按钮 */}
        <Icon
          name={folded ? "menuUnfold" : "menuFold"}
          size={[24, 24]}
          className="absolute bottom-3 left-6 cursor-pointer hover:fill-primary-400"
          onClick={() => setFolded(!folded)}
        />
      </div>
    </Context.Provider>
  );
});
