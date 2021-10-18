import React from 'react';
import type {FC} from 'react';
import {useDispatch} from 'react-redux';
import {useGetCurrentUserQuery} from '@store/current-user';
import type {TabsRouterProps} from '../tabs.router';
import {ProfileView} from './profile.view';
import {persistor} from '@store/index';

export const ProfileContainer: FC<TabsRouterProps<'profile'>> = () => {
  const dispatch = useDispatch();
  const {isLoading, data} = useGetCurrentUserQuery();
  const onPressLogout = () => {
    persistor.purge();
  };
  return <ProfileView {...{isLoading, user: data, onPressLogout}} />;
};
