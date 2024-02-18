import { NETEASE } from '../fetch';

/**
 * @param phone 手机号码
 * @param password 密码
 * @description 手机登录
 * */
export function login_cellphone(phone: string, password: string) {
  return NETEASE<{ id: string; name: string; cookie: string; avatar: string }>('/login/cellphone', {
    init: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        phone,
        password,
      }),
    },
    responseHandle(res) {
      return {
        id: res.profile.userId,
        name: res.profile.nickname,
        avatar: res.profile.avatarUrl,
        cookie: res.cookie,
      };
    },
  });
}

/**
 * @description 获取二维码 key
 * */
export function getQrKey() {
  return NETEASE<string>(`/login/qr/key?time=${new Date().getTime()}`, {
    responseHandle(res) {
      return res.data.unikey;
    },
  });
}

/**
 * @description 获取二维码 base64
 * */
export function getQrBase64(key: string) {
  return NETEASE(`/login/qr/create?key=${key}&qrimg=true&time=${new Date().getTime()}`, {
    responseHandle(res) {
      return {
        img: res.data.qrimg,
      };
    },
  });
}

/**
 * @description 检查二维码状态
 * */
export function checkQrStatus(key: string) {
  return NETEASE(`/login/qr/check?key=${key}&time=${new Date().getTime()}`, { init: { method: 'POST' } });
}
