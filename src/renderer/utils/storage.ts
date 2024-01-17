class LocalStorage<T extends string> {
  private storage: Storage = window.localStorage;

  /**
   * @description 储存指定数据
   * */
  setItem(key: T, value: string) {
    this.storage.setItem(key, value);
  }

  /**
   * @description 储存多个指定数据
   * */
  setItems(data: { [key in T]?: string }) {
    for (const key in data) {
      this.setItem(key, data[key]!);
    }
  }

  /**
   * @description 获取指定数据
   * */
  getItem(key: T): string | null {
    return this.storage.getItem(key);
  }

  /**
   * @description 获取多个指定数据
   * */
  getItems(...key: T[]): { [key in T]?: string | null } {
    let r: { [key in T]?: string | null } = {};
    key.forEach((k) => {
      r[k] = this.getItem(k);
    });
    return r;
  }

  /**
   * @description 获取localStorage存储的所有数据
   * */
  getAll(): { [key: string]: string | null } {
    let r: { [key: string]: string | null } = {};
    for (const key in this.storage) {
      r[key] = this.storage.getItem(key);
    }
    return r;
  }

  /**
   * @description 删除指定数据
   * */
  removeItem(key: T) {
    this.storage.removeItem(key);
  }

  /**
   * @description 删除多个指定数据
   * */
  removeItems(...keys: T[]) {
    keys.forEach((key) => {
      this.storage.removeItem(key);
    });
  }

  /**
   * @description 删除所有数据
   * */
  removeAll() {
    this.storage.clear();
  }
}
type StorageKey = "cookie";
export default new LocalStorage<StorageKey>();
