import React, {useEffect} from 'react';
import type {FC} from 'react';
import {useDispatch} from 'react-redux';
import {useShallowPickSelector} from '@hooks/useSelector';
import {RootRouterProps} from '@containers/root.router';
import {SplashView} from './splash.view';

export const SplashContainer: FC<RootRouterProps<'splash'>> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const {token} = useShallowPickSelector('currentUser', ['token']);
  const {rehydrated} = useShallowPickSelector('_persist', ['rehydrated']);
  useEffect(() => {
    if (rehydrated) {
      if (token) {
        navigation.reset({
          index: 0,
          routes: [{name: 'tabs'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'login'}],
        });
      }
    }
  }, [rehydrated, token]);

  return <SplashView />;
};
