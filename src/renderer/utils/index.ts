// 图片裁剪
export function cut(url: string, size: number | [number, number]): string {
  let param: string = "";
  if (typeof size === "number") {
    param = `param=${size}y${size}`;
  } else if (Array.isArray(size)) {
    return `param=${size[0]}x${size[1]}`;
  }
  return `${url}${url.includes('?') ? "&" : "?"}${param}`;
}

export function formatDuration(milliseconds: number): string {
  // 确保输入是非负数
  if (milliseconds < 0) {
    return "00:00";
  }

  // 计算分钟和秒数
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // 格式化成 "xx:xx"
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
