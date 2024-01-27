import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

import { createUserSlice, User } from "./module/user";
import { createDataSlice, Data } from "./module/data";
import { createSongSlice, Song } from "./module/song";

type Store = User & Data & Song;

const useMiddleware = (f: StateCreator<Store>) => immer(persist(devtools(f), { name: "store" }));

export default create<Store>()(
  useMiddleware((...args) => ({
    ...createUserSlice(...args),
    ...createDataSlice(...args),
    ...createSongSlice(...args),
  })),
);

export { User, Data, Song };
