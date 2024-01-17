import { memo, useEffect, useState, useRef } from "react";
import classNames from "classnames";
import _ from "lodash";

import ObserveDOM from "@better-scroll/observe-dom";
import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
import ScrollBar from "@better-scroll/scroll-bar";

import { ScrollProps, configType, Options } from "./type";

// 添加插件
BScroll.use(MouseWheel);
BScroll.use(ScrollBar);
BScroll.use(ObserveDOM);

export default memo(({ config, className, children }: ScrollProps) => {
  // BScroll实例
  const [bs, setBs] = useState(null);
  // 容器Ref
  const wrapperRef = useRef<HTMLDivElement>(null);
  // 自定义滚动条Ref
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 合并BScroll配置
    const finalConfig: configType = _.defaultsDeep(config.scrollConfig, {
      mouseWheel: true,
      scrollbar: {
        fade: false,
        customElements: [thumbRef.current],
      },
      observeDOM: true,
    } as Options);

    // 创建实例
    const instance = new BScroll(wrapperRef.current, finalConfig);

    // 存储实例
    setBs(instance);

    return () => {
      bs && bs.destroy();
    };
  }, [config.scrollConfig]);

  const { useDefaultClass, scrollHeight, showScrollBar, thumbHeight, useMask } = config.customConfig;
  // Scroll样式(包括默认样式)
  const scrollClass = classNames(className, { "relative overflow-hidden": useDefaultClass ?? true, "scroll-mask": useMask ?? true });
  // 滑块样式
  const thumbClass = classNames("absolute box-border w-full cursor-pointer rounded-md bg-default-400/60 hover:bg-default-400/80", {
    invisible: showScrollBar,
  });

  return (
    // wrapper
    <div ref={wrapperRef} className={scrollClass} style={{ height: scrollHeight || "100%" }}>
      {/* container */}
      {children}
      {/* 滑块 */}
      <div ref={thumbRef} className="absolute bottom-0.5 right-0 top-0.5 z-50 block w-1">
        <div className={thumbClass} style={{ height: thumbHeight || "35%" }}></div>
      </div>
    </div>
  );
});
