import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useStore from 'store/index';
import classNames from 'classnames';

import Context from './context';
import { configType } from '../scroll';

import Scroll, { ScrollRef } from '../scroll';
import Menu from './menu';
import Icon from 'components/icon';

export default memo(() => {
  // 获取路由
  const location = useLocation();

  // 跳转实现
  const navigate = useNavigate();
  const to = useCallback((event: any, url: string) => {
    navigate(url);
    setStartY(scrollRef.current.getY());
  }, []);

  // 侧边栏 Ref
  const sideBarRef = useRef<HTMLDivElement>();
  // 折叠
  const [isMenuFolded, setIsMenuFolded] = useStore((state) => [state.isMenuFolded, state.setIsMenuFolded]);

  // 滚动条 Ref，用于保存滚动位置
  const scrollRef = useRef<ScrollRef>();
  const [startY, setStartY] = useState(0);
  // 滚动配置
  const config: configType = {
    scrollConfig: { bounce: false, startY },
    customConfig: { showScrollBar: isMenuFolded, useMask: true },
  };

  return (
    // 上下文，用于提供跳转函数，当前路由
    <Context.Provider value={{ to, currentRoute: location.pathname }}>
      {/* 目录 */}
      <div
        ref={sideBarRef}
        className={classNames(
          'menu-base-width menu-height relative flex-none rounded-r-lg bg-side-back pb-11 pt-6 transition-all duration-400',
          {
            'md:w-48 lg:w-52 xl:w-56': !isMenuFolded,
          },
        )}
      >
        <Scroll ref={scrollRef} config={config} className="h-full px-3">
          <Menu />
        </Scroll>
        {/* 折叠按钮 */}
        <Icon
          name={isMenuFolded ? 'menuUnfold' : 'menuFold'}
          size={[24, 24]}
          className="absolute bottom-3 left-[33.5px] cursor-pointer hover:fill-primary-400 xl:left-[45.5px]"
          onClick={() => setIsMenuFolded(!isMenuFolded)}
        />
      </div>
    </Context.Provider>
  );
});
