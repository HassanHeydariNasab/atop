import * as React from 'react';
import {
  NavigationContainer,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {Login} from '@containers/login';
import {Verification} from '@containers/verification';
import {Splash} from '@containers/splash';
import TabsRouter from '@containers/tabs/tabs.router';
import {useGetCurrentUserQuery} from '@store/current-user';
import {useShallowPickSelector} from '@hooks/useSelector';

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

const Stack = createNativeStackNavigator<RootRouterParams>();

const Router = () => {
  const {token} = useShallowPickSelector('currentUser', ['token']);
  const {data, error, isLoading, isSuccess} = useGetCurrentUserQuery(
    undefined,
    {skip: !token},
  );
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        {isLoading ? (
          <Stack.Screen
            name="splash"
            component={Splash}
            options={{title: 'atop'}}
          />
        ) : isSuccess ? (
          <Stack.Screen
            name="tabs"
            component={TabsRouter}
            options={{title: 'atop'}}
          />
        ) : (
          <>
            <Stack.Screen
              name="login"
              component={Login}
              options={{title: 'Login'}}
            />
            <Stack.Screen
              name="verification"
              component={Verification}
              options={{title: 'Verification'}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const useRootNavigation = <K extends keyof RootRouterParams>() =>
  useNavigation<NativeStackNavigationProp<RootRouterParams, K>>();

export default Router;
