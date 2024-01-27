import { StateCreator } from "zustand";
import { login_cellphone, getQrKey } from "../../service";

export interface User {
  /** @description 网易云用户信息 */
  netease: {
    /** @description 是否登录 */
    isLogin: boolean;
    /** @description 用户ID */
    id: string;
    /** @description 用户名 */
    name: string;
    /** @description 登录cookie */
    cookie: string;
    /** @description 手机号 */
    phone: string;
    /** @description 手机号密码 */
    phonePassword: string;
  };
  /** @description 初始化用户信息 */
  initUserProfile: () => void;
  /** @description 手机号登录 */
  usePhoneLogin: (phone: string, password: string) => Promise<boolean>;
  /** @description 邮箱登录 */
  useEmailLogin: (phone: string, password: string) => Promise<boolean>;
  /** @description 二维码登录 */
  saveCookie: (cookie: string) => void;
}

export const createUserSlice: StateCreator<User> = (set, get) => ({
  netease: {
    isLogin: false,
    id: "",
    name: "",
    cookie: "",
    phone: "",
    phonePassword: "",
  },
  initUserProfile: () => {
    if (get().netease.cookie.length > 0) {
      // 初始化用户信息
    }
  },
  usePhoneLogin: async (phone: string, password: string) => {
    const { ok, data } = await login_cellphone(phone, password);
    const { id, name, cookie } = data;
    if (!ok) return false;
    // 保存用户信息
    set((draft: User): any => {
      draft.netease.isLogin = true;
      draft.netease.id = id;
      draft.netease.name = name;
      draft.netease.cookie = cookie;
      draft.netease.phone = phone;
      draft.netease.phonePassword = password;
    });
    return true;
  },
  useEmailLogin: async (email: string, password: string) => {
    return false;
  },
  saveCookie: async (cookie: string) => {
    set((draft: User): any => {
      draft.netease.isLogin = true;
      draft.netease.cookie = cookie;
    });
    get().initUserProfile();
  },
});
