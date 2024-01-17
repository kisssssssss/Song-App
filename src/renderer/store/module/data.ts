import { StateCreator } from "zustand";

export interface Data {
  /** @description 主题 */
  theme: "light" | "dark" | "gray" | "";
  /** @description 更改主题 */
  changeTheme: (theme: Data["theme"]) => void;
  /** @description 初始化主题 */
  initTheme: () => void;
}

export const createDataSlice: StateCreator<Data> = (set, get) => ({
  theme: "",
  changeTheme: (theme: Data["theme"]) => {
    document.documentElement.className = theme;
    set({ theme });
  },
  initTheme: () => {
    const storeTheme = get().theme;
    if (document.documentElement.className !== storeTheme) {
      get().changeTheme(storeTheme);
    }
  },
});
