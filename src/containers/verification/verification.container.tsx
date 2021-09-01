import * as React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  currentUserActions,
  useGetCurrentUserQuery,
  useUpsertUserMutation,
} from '@store/current-user';
import VerificationView from './verification.view';
import {useShallowPickSelector} from '@hooks/useSelector';
import {RootRouterProps, useRootNavigation} from '@containers/root.router';

export default ({
  route: {
    params: {isUserNew},
  },
}: RootRouterProps<'verification'>) => {
  const rootNavigation = useRootNavigation();
  const dispatch = useDispatch();
  const {countryCode, mobile, verificationCode, name, token} =
    useShallowPickSelector('currentUser', [
      'countryCode',
      'mobile',
      'verificationCode',
      'name',
      'token',
    ]);

  const onVerificationCodeChangeText = (_verificationCode: string) => {
    dispatch(currentUserActions.setVerificationCode(_verificationCode));
  };

  const onNameChangeText = (_name: string) => {
    dispatch(currentUserActions.setName(_name));
  };

  const [upsertUser, {isLoading, isSuccess, data}] = useUpsertUserMutation();

  const onVerifyPress = () => {
    if (verificationCode) {
      if (isUserNew) {
        upsertUser({
          countryCode,
          mobile,
          verificationCode,
          name,
        });
      } else {
        upsertUser({
          countryCode,
          mobile,
          verificationCode,
        });
      }
    }
  };

  const {} = useGetCurrentUserQuery(undefined, {skip: !token});

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(currentUserActions.setToken(data.token));
    }
  }, [isSuccess, data]);

  return (
    <VerificationView
      verificationCode={verificationCode as string}
      onVerificationCodeChangeText={onVerificationCodeChangeText}
      isUserNew={isUserNew}
      name={name}
      onNameChangeText={onNameChangeText}
      onVerifyPress={onVerifyPress}
      isLoading={isLoading}
    />
  );
};
