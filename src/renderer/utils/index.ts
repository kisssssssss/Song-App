// 图片裁剪
export function cut(url: string, size: number | [number, number]): string {
  if (url.length === 0) return '';

  let param: string = '';
  if (typeof size === 'number') {
    param = `param=${size}y${size}`;
  } else if (Array.isArray(size)) {
    return `param=${size[0]}x${size[1]}`;
  }
  return `${url}${url.includes('?') ? '&' : '?'}${param}`;
}

// 格式化当前时间为 MM:SS
export function formatSecondTime(secondTime: number) {
  let minute = String(Math.floor(secondTime / 60)).padStart(2, '0');
  let second = String(secondTime % 60).padStart(2, '0');
  return minute + ':' + second;
}
export function formatMillisecondTime(milliseconds: number): string {
  return formatSecondTime(Math.floor(milliseconds / 1000));
}

// 提取歌手名字，以字符串返回
export function getArtistNameString(artists: any[], separator?: string): string {
  return artists.map((artist: any) => artist.name).join(separator || ' / ');
}
