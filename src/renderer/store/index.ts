import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';

import { createUserSlice, UserSlice } from './module/user';
import { createSettingSlice, SettingSlice } from './module/setting';
import { createSongSlice, SongSlice } from './module/song';
import { createPlaySlice, PlaySlice } from './module/play';
import { createListSlice, ListSlice } from './module/list';

export type Store = UserSlice & SettingSlice & SongSlice & PlaySlice & ListSlice;

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
    ...createListSlice(...args),
  })),
);

export { UserSlice, SettingSlice, SongSlice, PlaySlice };
