import { DefaultTheme } from "react-native-paper";
import { INITIAL_FONT_SIZE } from "./utils/common.styles";
import { IColorProps, IColorShade } from "./utils/interfaces";

declare global {
  namespace ReactNativePaper {
    interface Theme {
      spacing: number;
      fontSize: number;
    }
    interface ThemeFonts {
      bold: ThemeFont;
    }
    interface ThemeColors {
      palette: {
        accent: string;
        common: {
          black: string;
          white: string;
        };
        primary: IColorProps;
        secondary: IColorProps;
        error: IColorProps;
        warning: IColorProps;
        info: IColorProps;
        success: IColorProps;
        grey: IColorShade;
        text: {
          primary: string;
          secondary: string;
          disabled: string;
          hint: string;
        };
        divider: string;
        background: {
          paper: string;
          default: string;
        };
        action: {
          active: string;
          hover: string;
          hoverOpacity: number;
          selected: string;
          disabled: string;
          disabledBackground: string;
        };
      };
    }
  }
}

const fontConfig: ReactNativePaper.ThemeFonts = {
  light: {
    fontFamily: "Raleway_300Light",
    fontWeight: "300",
  },
  medium: {
    fontFamily: "Raleway_500Medium",
    fontWeight: "500",
  },
  regular: {
    fontFamily: "Raleway_400Regular",
    fontWeight: "400",
  },
  bold: {
    fontFamily: "Raleway_700Bold",
    fontWeight: "700",
  },
  thin: {
    fontFamily: "Raleway_100Thin",
    fontWeight: "100",
  },
};

const theme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  fonts: fontConfig,
  fontSize: INITIAL_FONT_SIZE,
  spacing: INITIAL_FONT_SIZE / 2,
  colors: {
    ...DefaultTheme.colors,
    palette: {
      accent: "#e8f5e9",
      common: {
        black: "#000",
        white: "#fff",
      },
      primary: {
        light: "#33ab9f",
        main: "#009688",
        dark: "#00695f",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff4081",
        main: "#f50057",
        dark: "#c51162",
        contrastText: "#fff",
      },
      error: {
        light: "#e57373",
        main: "#f44336",
        dark: "#d32f2f",
        contrastText: "#fff",
      },
      warning: {
        light: "#ffef62",
        main: "#ffeb3b",
        dark: "#b2a429",
        contrastText: "#fff",
      },
      info: {
        light: "#03a9f4",
        main: "#0288d1",
        dark: "#01579b",
        contrastText: "#fff",
      },
      success: {
        light: "#4caf50",
        main: "#2e7d32",
        dark: "#1b5e20",
        contrastText: "#fff",
      },
      grey: {
        "50": "#fafafa",
        "100": "#f5f5f5",
        "200": "#eeeeee",
        "300": "#e0e0e0",
        "400": "#bdbdbd",
        "500": "#9e9e9e",
        "600": "#757575",
        "700": "#616161",
        "800": "#424242",
        "900": "#212121",
        A100: "#d5d5d5",
        A200: "#aaaaaa",
        A400: "#303030",
        A700: "#616161",
      },
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.54)",
        disabled: "rgba(0, 0, 0, 0.38)",
        hint: "rgba(0, 0, 0, 0.38)",
      },
      divider: "rgba(0, 0, 0, 0.12)",
      background: {
        paper: "#fff",
        default: "#fafafa",
      },
      action: {
        active: "rgba(0, 0, 0, 0.54)",
        hover: "rgba(0, 0, 0, 0.08)",
        hoverOpacity: 0.08,
        selected: "rgba(0, 0, 0, 0.14)",
        disabled: "rgba(0, 0, 0, 0.26)",
        disabledBackground: "rgba(0, 0, 0, 0.12)",
      },
    },
  },
};
export default theme;
