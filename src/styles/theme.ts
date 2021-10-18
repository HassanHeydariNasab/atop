import {extendTheme, theme as defaultTheme} from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: defaultTheme.colors.teal,
    lightBackground: defaultTheme.colors.white,
    darkBackground: defaultTheme.colors.gray[900],
    grayText: defaultTheme.colors.gray[300],
  },
  fontConfig: {
    heading: 'Vazir-Bold',
    body: 'Vazir-Regular',
  },
});
