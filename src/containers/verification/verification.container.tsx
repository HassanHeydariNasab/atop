import * as React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  currentUserActions,
  useEditCurrentUserMutation,
} from '@store/current-user';
import VerificationView from './verification.view';
import {useShallowPickSelector} from '@hooks/useSelector';
import {useRootNavigation} from '@containers/root-router';

export default () => {
  const rootNavigation = useRootNavigation();
  const dispatch = useDispatch();
  const {countryCode, mobile, verificationCode} = useShallowPickSelector(
    'currentUser',
    ['countryCode', 'mobile', 'verificationCode'],
  );

  const onVerificationCodeChangeText = (_verificationCode: string) => {
    dispatch(currentUserActions.setVerificationCode(_verificationCode));
  };

  const [editCurrentUser, {isLoading, isSuccess}] =
    useEditCurrentUserMutation();

  const onVerifyPress = () => {
    if (verificationCode)
      editCurrentUser({
        countryCode,
        mobile,
        verificationCode,
      });
  };

  useEffect(() => {
    if (isSuccess) rootNavigation.navigate('home');
  }, [isSuccess]);

  return (
    <VerificationView
      verificationCode={verificationCode as string}
      onVerificationCodeChangeText={onVerificationCodeChangeText}
      onVerifyPress={onVerifyPress}
      isLoading={isLoading}
    />
  );
};
