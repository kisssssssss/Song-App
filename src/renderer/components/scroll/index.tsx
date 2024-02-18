import React, { forwardRef, memo, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import BScroll, { Options, BScrollInstance } from '@better-scroll/core';
import MouseWheel, { MouseWheelOptions } from '@better-scroll/mouse-wheel';
import ScrollBar, { ScrollbarOptions } from '@better-scroll/scroll-bar';
import Pullup, { PullUpLoadOptions } from '@better-scroll/pull-up';
import ObserveDOM from '@better-scroll/observe-dom';

/**
 * @description Scroll组件props
 */
type ScrollProps = Partial<{
  config: configType;
  className: string;
  children: React.ReactNode;
}>;

/**
 * @description BScroll配置和自定义配置
 * */
type configType = {
  /**
   * @description BScroll配置
   * */
  scrollConfig?: Options & ScrollbarOptions & MouseWheelOptions & PullUpLoadOptions;
  /**
   * @description 自定义配置
   * */
  customConfig?: Partial<{
    // 是否使用基础的class
    useBaseClass: boolean;
    // 是否隐藏滚动条
    showScrollBar: boolean;
    // 是否开启内容上下边缘遮罩
    useMask: boolean;
    // 滚动条高度
    scrollHeight: string;
    // 滑块高度
    thumbHeight: string;
    // 是否开启拖动样式
    isDrag: boolean;
    // scrollConfig 需配置 pullUpLoad
    pullingUpHandler: (instance: BScrollInstance) => void;
  }>;
};

type ScrollRef = {
  getY: () => any;
};

// 添加插件
BScroll.use(MouseWheel);
BScroll.use(ScrollBar);
BScroll.use(ObserveDOM);
BScroll.use(Pullup);

/**
 * @param config 配置,包含两部分，一部分是scroll组件配置，另一部分是自定义配置
 * */
const Scroll = forwardRef<ScrollRef, ScrollProps>(({ config, className, children }, ref) => {
  if (!config) config = {};

  // 容器Ref
  const wrapperRef = useRef<HTMLDivElement>(null);
  // 自定义滚动条Ref
  const trackRef = useRef<HTMLDivElement>(null);

  // 创建 bs 实例
  const bs = useRef<BScrollInstance>();
  useEffect(() => {
    // 合并BScroll配置
    const finalConfig: configType = _.defaultsDeep(config.scrollConfig || {}, {
      mouseWheel: true,
      observeDOM: true,
      scrollbar: {
        fade: false,
        customElements: [trackRef.current],
      },
    } as Options);

    // 创建实例
    const instance = new BScroll(wrapperRef.current, finalConfig);
    bs.current = instance;

    // 上拉加载事件
    if (config.scrollConfig.pullUpLoad && config.customConfig.pullingUpHandler) {
      instance.on('pullingUp', () => {
        config.customConfig.pullingUpHandler(instance);
        instance.finishPullUp();
      });
    }

    return () => {
      // 销毁实例
      instance.destroy();
    };
  }, [config]);

  // 暴露给父组件的属性
  useImperativeHandle(ref, () => ({
    getY: () => (bs.current ? bs.current.y : 0),
  }));

  // 自定义配置
  const custom = config.customConfig || {};

  // Scroll样式(包括默认样式)
  // tip: useMask 暂时仅作用于菜单，其它地方不适合使用，因为类 scroll-mask 是针对菜单编写的
  const scrollClass = classNames(className, {
    'relative overflow-hidden z-10': custom.useBaseClass ?? true,
    'scroll-mask': custom.useMask,
  });
  // 轨道样式
  const trackClass = classNames('absolute bottom-0.5 right-0 top-0.5 z-50 block w-1 transition-[width]', {
    'hover:w-1.5 active:w-1.5': custom.isDrag,
  });
  // 滑块样式
  const thumbClass = classNames('absolute box-border w-full rounded-md bg-default-400/60', {
    'hover:bg-default-400/80 active:bg-default-400/80 cursor-pointer': custom.isDrag,
    invisible: custom.showScrollBar,
  });

  return (
    // wrapper
    <div ref={wrapperRef} className={scrollClass} style={{ height: custom.scrollHeight || '100%' }}>
      {children}
      <div ref={trackRef} className={trackClass}>
        <div className={thumbClass} style={{ height: custom.thumbHeight || '35%', minHeight: '15%' }}></div>
      </div>
    </div>
  );
});

export default memo(Scroll);

export { ScrollProps, configType, ScrollRef, Options, ScrollbarOptions, MouseWheelOptions };
