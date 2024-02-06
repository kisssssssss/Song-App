import { NETEASE } from '../fetch';

import type { Song } from '../../@types';

export function recommend_daily() {
  return NETEASE<Song[]>('/recommend/songs', {
    responseHandle(res) {
      return res.data.dailySongs.map((song: any) => ({
        id: song.id,
        name: song.name,
        cover: song.al.picUrl,
        duration: song.dt,
        artist: song.ar,
        album: song.al,
        source: song,
      }));
    },
  });
}

export function recommend_new() {
  return NETEASE<Song[]>('/personalized/newsong', {
    responseHandle(res) {
      return res.result.map((song: any) => ({
        id: song.id,
        name: song.name,
        cover: song.picUrl,
        duration: song.song.duration,
        artist: song.song.artists,
        album: song.song.album,
      }));
    },
  });
}

export function getSongUrl(id: number, level?: '标准' | '较高' | '极高' | '无损' | 'Hi-Res' | '高清环绕声' | '沉浸环绕声' | '超清母带') {
  const levelMap = {
    标准: 'standard',
    较高: 'higher',
    极高: 'exhigh',
    无损: 'lossless',
    'Hi-Res': 'hires',
    高清环绕声: 'jyeffect',
    沉浸环绕声: 'sky',
    超清母带: 'jymaster',
  };
  return NETEASE(`/song/url/v1?id=${id}&level=${levelMap[level] || 'standard'}`, {
    responseHandle(res) {
      return res.data[0].url;
    },
  });
}
