import React from 'react';
import type {FC} from 'react';
import {useDispatch} from 'react-redux';
import {useGetCurrentUserQuery} from '@store/current-user';
import {useTabsNavigation} from '../tabs.router';
import type {TabsRouterProps} from '../tabs.router';
import {ProfileView} from './profile.view';

export const ProfileContainer: FC<TabsRouterProps<'profile'>> = () => {
  const dispatch = useDispatch();
  const {isLoading, data} = useGetCurrentUserQuery();
  return <ProfileView isLoading={isLoading} user={data} />;
};
