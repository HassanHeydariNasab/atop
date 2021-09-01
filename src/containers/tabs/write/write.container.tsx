import * as React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import CreateView from './write.view';
import {useCreatePostMutation} from '@store/post';
import {useShallowPickSelector} from '@hooks/useSelector';
import {useTabsNavigation} from '../tabs.router';

export default () => {
  const tabsNavigation = useTabsNavigation();
  const dispatch = useDispatch();
  return <CreateView />;
};
