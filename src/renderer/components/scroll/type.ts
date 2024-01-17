import React from "react";
import { Options } from "@better-scroll/core";
import { MouseWheelOptions } from "@better-scroll/mouse-wheel";
import { ScrollbarOptions } from "@better-scroll/scroll-bar";

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
    // 是否使用默认class
    useDefaultClass: boolean;
    // 是否隐藏滚动条
    showScrollBar: boolean;
    // 是否开启内容上下边缘遮罩
    useMask: boolean;
    // 滚动条高度
    scrollHeight: string;
    // 滑块高度
    thumbHeight: string;
  }>;
};

export { ScrollProps, configType, Options, ScrollbarOptions, MouseWheelOptions };
