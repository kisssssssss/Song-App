type Config<T = any> = {
  init?: RequestInit;
  responseHandle?: (res: any) => T;
};

export type defaultReturn = {
  ok: boolean;
  data: any;
  msg?: any;
};

export const NETEASE_BASEURL = "https://netease-cloud-music-api-bice-five.vercel.app";

export const NETEASE = <Response = any>(url: string, config?: Config<Response>): Promise<{ ok: boolean; data: Response }> => {
  return (
    fetch(NETEASE_BASEURL + url, { ...config?.init, credentials: "include" })
      // 判断网络请求是否成功
      .then((res) => {
        if (!res.ok) {
          // throw new Error(`🤨网络请求错误❌,检查网络是否有误;\n🔗url:${url};\n📄status:${res.status}`);
        }
        return res.json();
      })
      // 判断网易云API请求是否成功
      .then((res) => {
        if (res.code !== 200) {
          // throw new Error(`🤨网易云API请求错误❌,检查请求参数是否有误;\n🔗url:${url};\n📄code:${res.code}`);
        }
        return res;
      })
      // 请求结果处理
      .then(config?.responseHandle || ((res) => res))
      // 添加请求成功字段
      .then((res) => ({ ok: true, data: res }))
      // 处理错误
      .catch((error) => {
        console.error(error);
        return { ok: false, data: null };
      })
  );
};

export const TEST_BASEURL = "https://httpbin.org";

export const TEST = <Response = any>(url: string, config?: Config): Promise<Response | undefined> => {
  return fetch(TEST_BASEURL + url, config?.init)
    .then((res) => {
      if (!res.ok) {
        console.error("Err->url:", url);
        console.error("Err->status:", res.status);
        throw new Error();
      }
      return res.json();
    })
    .then((res) => ({
      ok: true,
      ...res,
    }))
    .then(config?.responseHandle || ((res) => res))
    .catch(() => ({ ok: false }));
};
