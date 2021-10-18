import React from 'react';
import type {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {Icon} from '@components/atoms';
import type {RootRouterProps} from '@containers/root.router';
import {HomeScreen} from './home';
import {WriteScreen} from './write';
import {ProfileScreen} from './profile';

export type TabsRouterParams = {
  home: {};
  write: {};
  profile: {};
};

const Tab = createBottomTabNavigator<TabsRouterParams>();

export interface RouteProps<
  T extends Record<string, object | undefined>,
  K extends keyof T,
> {
  navigation: BottomTabNavigationProp<T, K>;
  route: RouteProp<T, K>;
}

export interface TabsRouterProps<K extends keyof TabsRouterParams>
  extends RouteProps<TabsRouterParams, K> {}

export const TabsRouter: FC<RootRouterProps<'tabs'>> = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          const ICONS = {home: 'home', write: 'edit', profile: 'person'};
          return (
            <Icon
              name={ICONS[route.name]}
              size={focused ? size + 8 : size}
              color={color}
            />
          );
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="write" component={WriteScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const useTabsNavigation = <K extends keyof TabsRouterParams>() =>
  useNavigation<BottomTabNavigationProp<TabsRouterParams, K>>();
