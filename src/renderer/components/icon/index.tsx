import React, { memo, useEffect, useState, forwardRef } from "react";
import type IconName from "./type";

type sizeType = [string | number, string | number];

type customProps = {
  // svg文件名
  name: IconName;
  // svg的大小,size=[x,y]
  size?: number[] | string[];
};

const Icon = (props: React.SVGProps<SVGSVGElement> & customProps, ref: React.ForwardedRef<SVGSVGElement>) => {
  const { name, size, ...svgProps } = props;

  // 默认填充颜色
  svgProps.className = `fill-default-500 min-w-fit ${svgProps.className}`;

  // 默认宽高 [x,y]
  let svgSizeArray: sizeType = [18, 18];
  if (size) {
    size[0] && (svgSizeArray[0] = size[0]);
    size[1] && (svgSizeArray[1] = size[1]);
  }

  // 获取svgId
  const [svgId, setSvgId] = useState<string>();
  const getSvgId = async () => {
    setSvgId(`#${(await import(`../../assets/svg/${name}.svg`)).default.id}`);
  };
  useEffect(() => {
    getSvgId();
  }, [props]);

  return (
    <svg ref={ref} width={svgSizeArray[0]} height={svgSizeArray[1]} {...svgProps}>
      <use xlinkHref={svgId} />
    </svg>
  );
};

export { IconName };

export default memo(forwardRef(Icon));
