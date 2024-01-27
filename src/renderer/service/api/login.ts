import { NETEASE } from "../fetch";

export function login_cellphone(phone: string, password: string) {
  return NETEASE<{ id: string; name: string; cookie: string }>("/login/cellphone", {
    init: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        phone,
        password,
      }),
    },
    responseHandle(res) {
      return {
        id: res.profile.userId,
        name: res.profile.nickname,
        cookie: res.cookie,
      };
    },
  });
}

export function getQrKey() {
  return NETEASE<{ key?: string }>(`/login/qr/key?time=${new Date().getTime()}`, {
    responseHandle(res) {
      return {
        key: res.data.unikey,
      };
    },
  });
}

export function getQrBase64(key: string) {
  return NETEASE(`/login/qr/create?key=${key}&qrimg=true&time=${new Date().getTime()}`, {
    responseHandle(res) {
      return {
        img: res.data.qrimg,
      };
    },
  });
}

export function checkQrStatus(key: string) {
  return NETEASE(`/login/qr/check?key=${key}&time=${new Date().getTime()}`, { init: { method: "POST" } });
}
