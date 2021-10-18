import React, {useEffect} from 'react';
import type {FC} from 'react';
import {batch, useDispatch} from 'react-redux';
import {
  currentUserActions,
  useGetCurrentUserQuery,
  useUpsertUserMutation,
} from '@store/current-user';
import {useShallowPickSelector} from '@hooks/useSelector';
import {RootRouterProps} from '@containers/root.router';
import {VerificationView} from './verification.view';

export const VerificationContainer: FC<RootRouterProps<'verification'>> = ({
  navigation,
  route: {
    params: {isUserNew},
  },
}) => {
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
      batch(() => {
        dispatch(currentUserActions.setToken(data.token));
        dispatch(currentUserActions.setVerificationCode(''));
        dispatch(currentUserActions.setName(''));
        dispatch(currentUserActions.setMobile(''));
      });
      navigation.reset({
        index: 0,
        routes: [{name: 'tabs'}],
      });
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
