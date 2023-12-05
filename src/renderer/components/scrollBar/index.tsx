import React, { memo, useEffect, useState, useRef } from "react";
import _ from "lodash"
import ObserveDOM from "@better-scroll/observe-dom";
import BScroll, { Options } from "@better-scroll/core"
import MouseWheel, { MouseWheelOptions } from "@better-scroll/mouse-wheel";
import ScrollBar, { ScrollbarOptions } from "@better-scroll/scroll-bar";


import CustomThumb from "./styled";

BScroll.use(MouseWheel);
BScroll.use(ScrollBar);
BScroll.use(ObserveDOM);

type configType = Options & ScrollbarOptions & MouseWheelOptions;
type ScrollProps = {
  children?: any;
  height?: string;
  className?: string;
  config?: configType;
};

const Scroll: React.FC<ScrollProps> = memo(
  ({ children, height, className, config }) => {
    // BScroll实例
    const [bs, setBs] = useState(null);
    // 容器Ref
    const wrapperRef = useRef<HTMLDivElement>(null);
    // 自定义滚动条Ref
    const customScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // 合并配置
      const finalConfig: configType = _.defaultsDeep(config, {
        mouseWheel: true,
        click: true,
        scrollbar: {
          fade: false,
          interactive: true,
          scrollbarTrackClickable: true,
          customElements: [customScrollRef.current],
        },
        observeDOM: true,
      })
      // 存储实例对象
      setBs(new BScroll(wrapperRef.current, _.defaultsDeep(config, finalConfig)));

      return () => {
        // 销毁
        bs && bs.destroy();
      };
    }, [config]);

    return (
      <div
        ref={wrapperRef}
        className={className}
        style={{
          height: height === undefined ? "100%" : height,
          overflow: "hidden",
          position: "relative",
        }}>
        {children}
        {/* 自定义滚动条 */}
        <CustomThumb ref={customScrollRef}>
          <div className="indicator"></div>
        </CustomThumb>
      </div>
    );
  }
);

export default Scroll;
