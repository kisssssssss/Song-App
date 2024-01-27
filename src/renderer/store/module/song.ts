import { StateCreator } from "zustand";

import { recommend_daily, recommend_new } from "service/index";

export interface Song {
  dailyRecommend: any[];
  dailyRecommendUpdate: number;
  getDailyRecommend: () => any;
  newRecommend: any[];
  newRecommendUpdate: number;
  getNewRecommend: () => any;
}

export const createSongSlice: StateCreator<Song> = (set, get) => ({
  dailyRecommend: [],
  dailyRecommendUpdate: 0,
  getDailyRecommend: async () => {
    // 判断是否距离上次保存的数据是否超过12小时
    if (new Date().getTime() - get().dailyRecommendUpdate > 1000 * 60 * 60 * 12) {
      // 获取新数据
      const { data: songs } = await recommend_daily();
      if (songs.length > 0) {
        set({ dailyRecommend: songs, dailyRecommendUpdate: new Date().getTime() });
        return songs;
      } else {
        return [];
      }
    }
    return get().dailyRecommend;
  },
  newRecommend: [],
  newRecommendUpdate: 0,
  getNewRecommend: async () => {
    if (new Date().getTime() - get().newRecommendUpdate > 1000 * 60 * 60 * 12) {
      // 获取新数据
      const { data: songs } = await recommend_new();
      if (songs.length > 0) {
        set({ newRecommend: songs, newRecommendUpdate: new Date().getTime() });
        return songs;
      } else {
        return [];
      }
    }
    return get().newRecommend;
  },
});
