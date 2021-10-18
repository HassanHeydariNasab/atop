import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
  createNavigationContainerRef,
} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StatusBar, useColorMode} from 'native-base';
import {LoginScreen} from '@containers/login';
import {VerificationScreen} from '@containers/verification';
import {SplashScreen} from '@containers/splash';
import {TabsRouter, TabsRouterParams} from '@containers/tabs/tabs.router';
import {theme} from '@styles/theme';

export type RootRouterParams = {
  splash: {};
  login: {};
  verification: {isUserNew: boolean};
  tabs: {};
};

export interface RouteProps<
  T extends Record<string, object | undefined>,
  K extends keyof T,
> {
  navigation: NativeStackNavigationProp<T, K>;
  route: RouteProp<T, K>;
}

export interface RootRouterProps<K extends keyof RootRouterParams>
  extends RouteProps<RootRouterParams, K> {}

const navigationLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary[400],
    background: theme.colors.lightBackground,
    card: theme.colors.lightBackground,
  },
};

const navigationDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: theme.colors.primary[400],
    background: theme.colors.darkBackground,
    card: theme.colors.darkBackground,
  },
};

export const navigationRef = createNavigationContainerRef<
  RootRouterParams & TabsRouterParams
>();

export function navigate(
  name: keyof (RootRouterParams & TabsRouterParams),
  params: object,
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

const Stack = createNativeStackNavigator<RootRouterParams>();

export const RootRouter = () => {
  const {colorMode} = useColorMode();
  return (
    <NavigationContainer
      theme={colorMode === 'light' ? navigationLightTheme : navigationDarkTheme}
      ref={navigationRef}>
      <StatusBar
        backgroundColor={
          colorMode === 'light'
            ? theme.colors.lightBackground
            : theme.colors.darkBackground
        }
        barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'}
      />
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="tabs" component={TabsRouter} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="verification" component={VerificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const useRootNavigation = <K extends keyof RootRouterParams>() =>
  useNavigation<NativeStackNavigationProp<RootRouterParams, K>>();
