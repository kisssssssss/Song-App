import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

import { createUserSlice, User } from "./module/user";
import { createDataSlice, Data } from "./module/data";

const useMiddleware = (f: StateCreator<User & Data>) => immer(persist(devtools(f), { name: "store" }));

export default create<User & Data>()(
  useMiddleware((...args) => ({
    ...createUserSlice(...args),
    ...createDataSlice(...args),
  })),
);

export {
  User,
  Data,
}