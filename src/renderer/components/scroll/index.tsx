import React, { memo, useEffect, useState, useRef } from "react";
import classNames from "classnames";
import _ from "lodash";

import ObserveDOM from "@better-scroll/observe-dom";
import BScroll, { Options } from "@better-scroll/core";
import MouseWheel, { MouseWheelOptions } from "@better-scroll/mouse-wheel";
import ScrollBar, { ScrollbarOptions } from "@better-scroll/scroll-bar";

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
  scrollConfig?: Options & ScrollbarOptions & MouseWheelOptions;
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
  }>;
};

// 添加插件
BScroll.use(MouseWheel);
BScroll.use(ScrollBar);
BScroll.use(ObserveDOM);

/**
 * @param config 配置,包含两部分，一部分是scroll组件配置，另一部分是自定义配置
 * */
export default memo(({ config, className, children }: ScrollProps) => {
  if (!config) config = {};

  // BScroll实例
  const [bs, setBs] = useState(null);
  // 容器Ref
  const wrapperRef = useRef<HTMLDivElement>(null);
  // 自定义滚动条Ref
  const trackRef = useRef<HTMLDivElement>(null);

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

    // 存储实例
    setBs(instance);

    return () => {
      bs && bs.destroy();
    };
  }, [config.scrollConfig]);

  // 自定义配置
  const custom = config.customConfig || {};

  // Scroll样式(包括默认样式)
  // tip: useMask 暂时仅作用于菜单，其它地方不适合使用
  const scrollClass = classNames(className, { "relative overflow-hidden z-10": custom.useBaseClass ?? true, "scroll-mask": custom.useMask });
  // 轨道样式
  const trackClass = classNames("absolute bottom-0.5 right-0 top-0.5 z-50 block w-1 transition-[width]", { "hover:w-1.5 active:w-1.5": custom.isDrag });
  // 滑块样式
  const thumbClass = classNames("absolute box-border w-full rounded-md bg-default-400/60", {
    "hover:bg-default-400/80 active:bg-default-400/80 cursor-pointer": custom.isDrag,
    invisible: custom.showScrollBar,
  });

  return (
    // wrapper
    <div ref={wrapperRef} className={scrollClass} style={{ height: custom.scrollHeight || "100%" }}>
      {children}
      <div ref={trackRef} className={trackClass}>
        <div className={thumbClass} style={{ height: custom.thumbHeight || "35%" }}></div>
      </div>
    </div>
  );
});

export { ScrollProps, configType, Options, ScrollbarOptions, MouseWheelOptions };
