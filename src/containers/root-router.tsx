import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {Login} from '@containers/login';
import {Verification} from '@containers/verification';
import {Splash} from '@containers/splash';
import {Home} from '@containers/home';
import {useGetCurrentUserQuery} from '@store/current-user';
import {useShallowPickSelector} from '@hooks/useSelector';

export type RootRouterParams = {
  splash: {};
  login: {};
  verification: {};
  home: {};
};

const Stack = createNativeStackNavigator<RootRouterParams>();

const Router = () => {
  const {token} = useShallowPickSelector('currentUser', ['token']);
  const {data, error, isLoading} = useGetCurrentUserQuery();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        {isLoading ? (
          <Stack.Screen
            name="splash"
            component={Splash}
            options={{title: 'atop'}}
          />
        ) : data?.token ? (
          <Stack.Screen
            name="home"
            component={Home}
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
