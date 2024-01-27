import { NETEASE } from "../fetch";

export type Song = { id: number; name: string; cover: string; duration: number; artist: any[]; album: any[] };

export function recommend_daily() {
  return NETEASE<Song[]>("/recommend/songs", {
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
  return NETEASE<Song[]>("/personalized/newsong", {
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
