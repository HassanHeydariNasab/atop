import {extendTheme, theme as defaultTheme} from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: defaultTheme.colors.teal,
    lightBackground: defaultTheme.colors.white,
    darkBackground: defaultTheme.colors.gray[900],
  },
});
