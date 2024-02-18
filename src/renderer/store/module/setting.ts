/**
 * @file 存放所有设置
 */

import { StateCreator } from 'zustand';

export interface SettingSlice {
  /**
   * @description 主题
   * */
  theme: 'light' | 'dark' | 'gray' | '';
  /**
   * @description 更改主题
   * */
  changeTheme: (theme: SettingSlice['theme']) => void;
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
  setIsMenuFolded: (isMenuFolded: boolean) => void;
  /**
   * @description 播放器是否折叠
   * */
  isPlayerFolded: boolean;
  /**
   * @description 改变播放器是否折叠
   * */
  setIsPlayerFolded: (isPlayerFolded: boolean) => void;
  /**
   * @description 点击音乐时是否自动播放音乐
   * */
  autoPlay: boolean;
  /**
   * @description 设置是否自动播放音乐
   * */
  setAutoPlay: (val: boolean) => void;
  /**
   * @description 表格每次请求的歌曲数量
   * */
  requestLimit: number;
  setRequestLimit: (requestLimit: number) => void;
}

export const createSettingSlice: StateCreator<SettingSlice> = (set, get) => ({
  theme: '',
  changeTheme: (theme: SettingSlice['theme']) => {
    document.documentElement.className = theme;
    set({ theme });
  },
  initTheme: () => {
    const { theme, changeTheme } = get();
    if (document.documentElement.className !== theme) {
      changeTheme(theme);
    }
  },
  isMenuFolded: false,
  setIsMenuFolded: (isMenuFolded) => {
    set({ isMenuFolded });
  },
  isPlayerFolded: false,
  setIsPlayerFolded: (isPlayerFolded) => {
    set({ isPlayerFolded });
  },
  autoPlay: true,
  setAutoPlay: (autoPlay) => {
    set({ autoPlay });
  },
  requestLimit: 10,
  setRequestLimit: (requestLimit) => {
    set({ requestLimit });
  },
});
