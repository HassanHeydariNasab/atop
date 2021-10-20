import React from 'react';
import type {FC} from 'react';
import {batch, useDispatch} from 'react-redux';
import {useColorMode} from 'native-base';
import {
  currentUserActions,
  currentUserApi,
  currentUserApiUtil,
  useGetCurrentUserQuery,
} from '@store/current-user';
import type {TabsRouterProps} from '../tabs.router';
import {ProfileView} from './profile.view';
import {postApiUtil} from '@store/post';
import {useRootNavigation} from '@containers/root.router';

export const ProfileContainer: FC<TabsRouterProps<'profile'>> = () => {
  const dispatch = useDispatch();
  const rootNavigation = useRootNavigation();
  const {isLoading, data} = useGetCurrentUserQuery();
  const {toggleColorMode} = useColorMode();
  const onToggleTheme = () => {
    toggleColorMode();
  };
  const onPressLogout = () => {
    batch(() => {
      dispatch(postApiUtil.resetApiState());
      dispatch(currentUserApiUtil.resetApiState());
      dispatch(currentUserActions.setToken(''));
    });
    rootNavigation.reset({
      index: 0,
      routes: [{name: 'login'}],
    });
  };
  return (
    <ProfileView {...{isLoading, user: data, onPressLogout, onToggleTheme}} />
  );
};
