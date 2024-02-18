import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

import { resolve } from 'path';

const config: ForgeConfig = {
  packagerConfig: {
    icon: './public/icon.ico',
    name: 'Song',
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    // Windows
    new MakerSquirrel({
      setupExe: 'Song setup.exe',
      setupIcon: resolve(__dirname, './public/icon.ico'),
      iconUrl: resolve(__dirname, './public/icon.ico'),
      loadingGif: resolve(__dirname, './public/loadingGif.gif'),
    }),
    // macOS
    new MakerZIP({}, ['darwin']),
    // Red Hat Linux
    new MakerRpm({}),
    // Debian Linux
    new MakerDeb({}),
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      devContentSecurityPolicy: "connect-src 'self' * 'unsafe-eval'",
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './public/index.html',
            js: './src/renderer/index.tsx',
            name: 'main_window',
            preload: {
              js: './src/electron/preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
