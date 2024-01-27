import { StateCreator } from "zustand";

export interface Data {
  /**
   * @description 主题
   * */
  theme: "light" | "dark" | "gray" | "";
  /**
   * @description 更改主题
   * */
  changeTheme: (theme: Data["theme"]) => void;
  /**
   * @description 初始化主题
   * */
  initTheme: () => void;
  /**
   * @description 菜单是否折叠
   * */
  isMenuFolded: boolean;
  /**
   * @description 改变菜单是否折叠
   * */
  setIsMenuFolded: (isMenuFolded: Data["isMenuFolded"]) => void;
  /**
   * @description 播放器是否折叠
   * */
  isPlayerFolded: boolean;
  /**
   * @description 改变播放器是否折叠
   * */
  setIsPlayerFolded: (isPlayerFolded: Data["isPlayerFolded"]) => void;
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
  isMenuFolded: false,
  setIsMenuFolded: (isMenuFolded: Data["isMenuFolded"]) => {
    set({ isMenuFolded });
  },
  isPlayerFolded: false,
  setIsPlayerFolded: (isPlayerFolded: Data["isPlayerFolded"]) => {
    set({ isPlayerFolded });
  },
});
