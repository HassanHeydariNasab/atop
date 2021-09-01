import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Home} from './home';
import {Write} from './write';
import {Profile} from './profile';

export type TabsRouterParams = {
  home: {};
  write: {};
  profile: {};
};

const Tab = createBottomTabNavigator<TabsRouterParams>();

export default () => {
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
      })}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="write" component={Write} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

export const useTabsNavigation = <K extends keyof TabsRouterParams>() =>
  useNavigation<BottomTabNavigationProp<TabsRouterParams, K>>();
