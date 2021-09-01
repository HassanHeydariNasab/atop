import * as React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useGetCurrentUserQuery} from '@store/current-user';
import ProfileView from './profile.view';
import {useTabsNavigation} from '../tabs.router';

export default () => {
  const tabsNavigation = useTabsNavigation();
  const dispatch = useDispatch();
  const {isLoading, data} = useGetCurrentUserQuery();
  return <ProfileView isLoading={isLoading} user={data} />;
};
