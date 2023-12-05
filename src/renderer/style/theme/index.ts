import { generate } from "@ant-design/colors";

export type themeType = {
  /**
   * @description 主题颜色,color6 为主色,1-10由浅到深
   * */
  themeColor: {
    color1?: string;
    color2?: string;
    color3?: string;
    color4?: string;
    color5?: string;
    color6?: string;
    color7?: string;
    color8?: string;
    color9?: string;
    color10?: string;
  };
  /**
   * @description 中性色
   * */
  neutralColor: {
    gray1: string;
    gray2: string;
    gray3: string;
    gray4: string;
    gray5: string;
    gray6: string;
    gray7: string;
    gray8: string;
    gray9: string;
    gray10: string;
    gray11: string;
    gray12: string;
    gray13: string;
  };
  /**
   * @description 文本颜色
   * */
  textColor: {
    title?: string;
    primary?: string;
    secondly?: string;
    disabled?: string;
  };
  /**
   * @description 边框颜色
   * */
  borderColor: string;
  /**
   * @description 分割线颜色
   * */
  dividerColor: string;
  /**
   * @description 背景颜色
   * */
  backgroundColor: string;
  /**
   * @description 三层阴影,向下
   * */
  shadow: {
    one: string;
    two: string;
    three: string;
  };
  /**
   * @description 居中
   * */
  center: {
    // 使用 position:absolute 居中
    position: string;
  };
  /**
   * @description 滚动条颜色设置
   * */
  scroll: {
    light: string;
    dark: string;
  };
  [key: string]: any;
};

const themeColor = Object.fromEntries(
  generate("#5f5bd6").map((val, index) => [`color${index + 1}`, val])
);

const theme: themeType = {
  themeColor,
  neutralColor: {
    gray1: "#ffffff",
    gray2: "#fafafa",
    gray3: "#f5f5f5",
    gray4: "#f0f0f0",
    gray5: "#d9d9d9",
    gray6: "#bfbfbf",
    gray7: "#8c8c8c",
    gray8: "#595959",
    gray9: "#434343",
    gray10: "#262626",
    gray11: "#1f1f1f",
    gray12: "#141414",
    gray13: "#000000",
  },
  textColor: {
    title: "#000000E0",
    primary: "#000000E0",
    secondly: "#000000A6",
    disabled: "#00000040",
  },
  borderColor: "#D9D9D9FF",
  dividerColor: "#0505050F",
  backgroundColor: "#F5F5F5FF",
  shadow: {
    one: `
      rgba(0, 0, 0, 0.16)	0px, 1px	2px	-2px
      rgba(0, 0, 0, 0.12)	0px, 3px	6px	0px
      rgba(0, 0, 0, 0.09)	0px, 5px	12px	4px
    `,
    two: `
      rgba(0, 0, 0, 0.12)	0px, 3px	6px	-4px
      rgba(8, 8, 8, 0.12)	0px, 6px	16px	0px
      rgba(0, 0, 0, 0.05)	0px, 9px	28px	8px
    `,
    three: `
      rgba(0, 0, 0, 0.08)	0px, 6px	16px	-8px
      rgba(0, 0, 0, 0.05)	0px, 9px	28px	0px
      rgba(0, 0, 0, 0.03)	0px, 12px	48px	16px
    `,
  },
  center: {
    position: `
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `,
  },
  scroll: {
    light: `
      background-color:#909399;
      opacity:0.3;
      &:hover {
        background-color:#909399;
        opacity:0.5;
      }
    `,
    dark: `
      background-color:#a3a6ad;
      opacity:0.5;
      &:hover {
        background-color:#a3a6ad;
        opacity:0.5;
      }
    `,
  },
};
export default theme;
