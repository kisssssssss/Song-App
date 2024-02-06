/**
 * @file 与歌曲有关的数据信息
 */

import { StateCreator } from "zustand";

import { recommend_daily, recommend_new } from "service/index";

export interface Song {
  /**
   * @description 每日推荐歌曲
   * */
  dailyRecommend: any[];
  dailyRecommendUpdate: number;
  getDailyRecommend: () => any;
  /**
   * @description 推荐新歌曲
   * */
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
      const { data } = await recommend_daily();
      if (data.length > 0) {
        set({ dailyRecommend: data, dailyRecommendUpdate: new Date().getTime() });
        return data;
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
