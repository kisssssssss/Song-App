/**
 * @file 存放所有设置
 */

import { StateCreator } from 'zustand';

export interface Setting {
  /**
   * @description 主题
   * */
  theme: 'light' | 'dark' | 'gray' | '';
  /**
   * @description 更改主题
   * */
  changeTheme: (theme: Setting['theme']) => void;
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
  setIsMenuFolded: (isMenuFolded: Setting['isMenuFolded']) => void;
  /**
   * @description 播放器是否折叠
   * */
  isPlayerFolded: boolean;
  /**
   * @description 改变播放器是否折叠
   * */
  setIsPlayerFolded: (isPlayerFolded: Setting['isPlayerFolded']) => void;
  /**
   * @description 点击音乐时是否自动播放音乐
   * */
  autoPlay: boolean;
  /**
   * @description 设置是否自动播放音乐
   * */
  setAutoPlay: (val: boolean) => void;
}

export const createSettingSlice: StateCreator<Setting> = (set, get) => ({
  theme: '',
  changeTheme: (theme: Setting['theme']) => {
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
  setIsMenuFolded: (isMenuFolded: Setting['isMenuFolded']) => {
    set({ isMenuFolded });
  },
  isPlayerFolded: false,
  setIsPlayerFolded: (isPlayerFolded: Setting['isPlayerFolded']) => {
    set({ isPlayerFolded });
  },
  autoPlay: true,
  setAutoPlay: (autoPlay) => {
    set({ autoPlay });
  },
});
