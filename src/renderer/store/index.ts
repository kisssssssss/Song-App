import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';

import { createUserSlice, User } from './module/user';
import { createSettingSlice, Setting } from './module/setting';
import { createSongSlice, Song } from './module/song';
import { createPlaySlice, Play } from './module/play';

export type Store = User & Setting & Song & Play;

const useMiddleware = (
  f: StateCreator<Store, [['zustand/immer', never], ['zustand/persist', Store], ['zustand/devtools', never]], [], Store>,
) =>
  immer(
    persist(devtools(f), {
      name: 'store',
    }),
  );

export default create<Store>()(
  useMiddleware((...args) => ({
    ...createUserSlice(...args),
    ...createSettingSlice(...args),
    ...createSongSlice(...args),
    ...createPlaySlice(...args),
  })),
);

export { User, Setting, Song, Play };
