import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import SplashView from './splash.view';
import {currentUserActions} from '@store/current-user';
import {useShallowPickSelector} from '@hooks/useSelector';
import {RootRouterProps} from '@containers/root.router';

export default ({navigation}: RootRouterProps<'splash'>) => {
  const dispatch = useDispatch();
  const {token} = useShallowPickSelector('currentUser', ['token']);
  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        dispatch(currentUserActions.setToken(token));
      } else {
        navigation.navigate('login');
      }
    });
  }, []);

  useEffect(() => {
    if (token) navigation.navigate('tabs');
  }, [token]);

  return <SplashView />;
};
