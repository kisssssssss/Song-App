/**
 * @file 与歌曲有关的数据信息
 */

import { StateCreator } from 'zustand';

import { getList } from 'service/index';
import { List } from '../../@types';
import { Store } from '..';

export interface ListSlice {
  /**
   * @description 我的歌单
   * */
  list: List[];
  updateList: () => void;
  getMyList: (listId: number) => List;
}

export const createListSlice: StateCreator<ListSlice> = (set, get: () => Store) => ({
  list: [],
  updateList: async () => {
    set({ list: (await getList(get().netease.id)).data || [] });
  },
  getMyList: (listId: number) => {
    return get().list.find((item) => item.id === listId);
  },
});
