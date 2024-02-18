/**
 * @file 与歌曲有关的数据信息
 */

import { StateCreator } from 'zustand';

import { recommend_daily, recommend_new, getLikeSong } from 'service/index';
import { Song } from '../../@types';
import { Store } from '..';

export interface SongSlice {
  /**
   * @description 每日推荐歌曲
   * */
  dailyRecommend: Song[];
  dailyRecommendUpdate: number;
  getDailyRecommend: () => any;
  /**
   * @description 推荐新歌曲
   * */
  newRecommend: Song[];
  newRecommendUpdate: number;
  getNewRecommend: () => any;
  /**
   * @description 喜欢的音乐列表
   * */
  likeSongID: number[];
  /**
   * @description 更新喜欢的音乐列表
   * */
  updateLikeSongID: () => void;
}

export const createSongSlice: StateCreator<SongSlice> = (set, get: () => Store) => ({
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
  likeSongID: [],
  updateLikeSongID: async () => {
    set({ likeSongID: (await getLikeSong(get().netease.id)).data });
  },
});
