import { themeType } from "../style/theme";

declare module "styled-components" {
  export interface DefaultTheme extends themeType {}
}
