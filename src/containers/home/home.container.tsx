import * as React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useGetCurrentUserQuery} from '@store/current-user';
import HomeView from './home.view';
import {useCreateCurrentUserMutation} from '@store/current-user';
import {useShallowPickSelector} from '@hooks/useSelector';
import {useRootNavigation} from '@containers/root-router';

export default () => {
  const rootNavigation = useRootNavigation();
  const dispatch = useDispatch();
  return <HomeView />;
};
