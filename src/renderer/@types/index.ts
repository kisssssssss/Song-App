/**
 * id : 歌曲id
 * name : 歌曲名
 * cover : 歌曲封面
 * duration : 歌曲时长 (时间戳)
 * artist : 歌曲歌手
 * album : 歌曲专辑
 * */
export type Song = { id: number; name: string; cover: string; duration: number; artist: any[]; album: any[] };

/**
 * id : 歌单id
 * title : 歌单名
 * cover : 歌单封面
 * subscribed : 歌单是否订阅, true: 订阅歌单, false:自己创建的歌单
 * creator : 歌单创建者
 * trackCount : 歌单歌曲数量 (时间戳)
 * updatedTime : 歌单更新时间 (时间戳)
 * */
export type List = {
  id: number;
  title: string;
  cover: string;
  subscribed: boolean;
  creator: {
    id: number;
    name: string;
    avatar: string;
  };
  trackCount: number;
  updatedTime: number;
};
