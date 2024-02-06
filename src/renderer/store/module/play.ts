/**
 * @file 当前与播放器有关的功能及信息
 */
import { StateCreator } from 'zustand';

import { getSongUrl } from '../../service';

import type { Song } from '../../@types';
import type { Store } from '../index';

export interface Play {
  /**
   * @description audi标签id
   * */
  audioId: string;
  /**
   * @example getAudio((audio) => audio.play())
   * @example getAudio().play()
   * @description 获取播放器DOM元素
   * */
  getAudio: (f?: (audio: HTMLAudioElement) => void) => HTMLAudioElement;
  /**
   * @description 播放信息
   * */
  playData: {
    // 播放器是否播放, true: 播放, false: 暂停
    playing: boolean;
    // 当前播放的歌曲
    song: Song | null;
    // 歌曲url
    url: string;
    // 歌词
    lyric: string[];
  };
  /**
   * @description 设置播放状态
   * */
  setPlaying: (val: boolean) => void;
  /**
   * @description 开始播放, 若传入歌曲则播放歌曲, 否则播放当前歌曲
   * */
  play: (song?: Song) => void;
  /**
   * @description 暂停播放
   * */
  pause: () => void;
  /**
   * @description 简化了播放和暂停功能, 内部调用 play 和 pause, 传入 true 播放, false 暂停
   * */
  setPlayStatus: (status: boolean) => void;
}

export const createPlaySlice: StateCreator<Play, [['zustand/immer', never]]> = (set, get: () => Store) => ({
  audioId: 'audio',
  getAudio: () => {
    return document.getElementById(get().audioId) as HTMLAudioElement;
  },
  playData: {
    playing: false,
    song: {
      id: 0,
      name: '',
      cover: '',
      duration: 0,
      artist: [],
      album: [],
    },
    url: '',
    lyric: [],
  },
  setPlaying: (val) => {
    set((draft) => {
      if (draft.playData.playing !== val) {
        draft.playData.playing = val;
      }
    });
  },
  play: (song) => {
    const { playData, getAudio, setPlaying, autoPlay } = get();
    // 播放指定歌曲
    if (song) {
      // 优先显示歌曲信息
      set((draft) => {
        draft.playData.song = song;
        draft.playData.playing = autoPlay;
        draft.playData.url = '';
        draft.playData.lyric = [];
      });
      // 获取歌曲url不阻塞歌曲信息显示
      getSongUrl(song.id).then(({ data }) => {
        set((draft) => {
          draft.playData.url = data;
        });
      });
      return;
    }
    // 播放当前歌曲
    if (playData.url && !playData.playing) {
      getAudio()
        .play()
        .then(() => setPlaying(true));
    }
  },
  pause: () => {
    const { getAudio, setPlaying } = get();
    getAudio().pause();
    setPlaying(false);
  },
  setPlayStatus: (status) => {
    const { play, pause } = get();
    status ? play() : pause();
  },
});
