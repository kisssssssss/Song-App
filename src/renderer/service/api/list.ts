import { NETEASE } from '../fetch';

import type { List, Song } from '../../@types';

/**
 * @param id 用户id
 * @description 获取用户歌单
 * */
export function getList(id: string) {
  return NETEASE<List[]>(`/user/playlist?uid=${id}`, {
    responseHandle(res) {
      return res.playlist.map((list: any): List => {
        return {
          id: list.id,
          title: list.name,
          cover: list.coverImgUrl,
          subscribed: list.subscribed,
          creator: {
            id: list.creator.userId,
            name: list.creator.nickname,
            avatar: list.creator.avatarUrl,
          },
          trackCount: list.trackCount,
          updatedTime: list.trackNumberUpdateTime,
        };
      });
    },
  });
}

/**
 * @param id 歌单id
 * @param limit 获取歌曲条数
 * @param offset 偏移量
 * @description 获取歌单第 offset ~ offset+limit 条歌曲
 * */
export function getListSong(id: number, limit: number, offset: number) {
  return NETEASE<{ songs: Song[]; more: boolean }>(`/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`, {
    responseHandle(res) {
      return {
        songs: res.songs.map((song: any) => ({
          id: song.id,
          name: song.name,
          cover: song.al.picUrl,
          duration: song.dt,
          artist: song.ar,
          album: song.al,
        })),
        more: res.songs.length >= limit,
      };
    },
  });
}
