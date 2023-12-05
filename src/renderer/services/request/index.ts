const BASEURL = "https://netease-cloud-music-api-bice-five.vercel.app";

export const Netease = async (url: string, option?: RequestInit) => {
  const response = await fetch(BASEURL + url, option);
  const result = await response.json();
  return result;
};
