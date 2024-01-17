import { NETEASE, defaultReturn } from "../fetch";

export const login_cellphone = (phone: string, password: string) =>
  NETEASE<{ id: string; name: string; cookie: string }>("/login/cellphone", {
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

export const getQrKey = () =>
  NETEASE<{ key?: string }>(`/login/qr/key?time=${new Date().getTime()}`, {
    responseHandle(res) {
      return {
        key: res.data.unikey,
      };
    },
  });

export const getQrBase64 = (key: string) =>
  NETEASE(`/login/qr/create?key=${key}&qrimg=true&time=${new Date().getTime()}`, {
    responseHandle(res) {
      return {
        img: res.data.qrimg,
      };
    },
  });

export const checkQrStatus = (key: string) => NETEASE(`/login/qr/check?key=${key}&time=${new Date().getTime()}`, { init: { method: "POST" } });
