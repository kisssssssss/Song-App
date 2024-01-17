const { nextui } = require("@nextui-org/react");
const colors = require("tailwindcss/colors");

const utilLightColor = {
  border: {
    darker: "#CDD0D6",
    dark: "#D4D7DE",
    base: "#DCDFE6",
    light: "#E4E7ED",
    lighter: "#EBEEF5",
  },
  fill: {
    darker: "#E6E8EB",
    dark: "#EBEDF0",
    base: "#F0F2F5",
    light: "#F5F7FA",
    lighter: "#FAFAFA",
    extraLight: "#FAFCFF",
  },
};
const utilDarkColor = {
  border: {
    darker: "#636466",
    dark: "#58585B",
    base: "#4C4D4F",
    light: "#414243",
    lighter: "#363637",
  },
  fill: {
    darker: "#424243",
    dark: "#39393A",
    base: "#303030",
    light: "#262727",
    lighter: "#1D1D1D",
    extraLight: "#191919",
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      rotate: {
        360: "360deg",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      // defaultTheme: "dark",
      themes: {
        light: {
          colors: {
            background: "#F2F3F5",
            foreground: "#303133",
            primary: {
              ...colors.indigo,
              DEFAULT: colors.indigo["500"],
              foreground: "#303133",
            },
            text: {
              primary: "#303133",
              regular: "#606266",
              secondary: "#909399",
              placeholder: "#A8ABB2",
              disabled: "#C0C4CC",
            },
            // 侧边栏
            side: {
              back: "#E6E8EB",
            },
          },
        },
        dark: {
          colors: {
            background: "#0a0a0a",
            foreground: "#E5EAF3",
            primary: {
              ...colors.indigo,
              DEFAULT: colors.indigo["500"],
            },
            text: {
              primary: "#303133",
              regular: "#606266",
              secondary: "#909399",
              placeholder: "#A8ABB2",
              disabled: "#C0C4CC",
            },
            side: {
              back: "#191919",
            },
          },
        },
        gray: {
          extend: "dark",
          colors: {
            background: "#2a2a2acc",
            foreground: "#E5EAF3",
            primary: {
              ...colors.indigo,
              DEFAULT: colors.indigo["500"],
              foreground: "#E5EAF3",
            },
            side: {
              back: "#424243",
            },
          },
        },
      },
    }),
  ],
};
