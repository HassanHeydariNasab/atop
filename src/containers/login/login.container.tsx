import * as React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  currentUserActions,
  useCreateCurrentUserMutation,
} from '@store/current-user';
import LoginView from './login.view';
import {useShallowPickSelector} from '@hooks/useSelector';
import {useRootNavigation} from '@containers/root-router';

export default () => {
  const [isCountryCodeModalVisible, setIsCountryCodeModalVisible] =
    useState<boolean>(false);

  const rootNavigation = useRootNavigation();
  const dispatch = useDispatch();
  const {countryCode, mobile} = useShallowPickSelector('currentUser', [
    'countryCode',
    'mobile',
  ]);

  const onCountryCodeFieldPress = () => {
    setIsCountryCodeModalVisible(true);
  };

  const hideCountryCodeModal = () => {
    setIsCountryCodeModalVisible(false);
  };

  const onCountryCodeItemPress = (_countryCode: string) => {
    dispatch(currentUserActions.setCountryCode(_countryCode));
    setIsCountryCodeModalVisible(false);
  };

  const onMobileChangeText = (_mobile: string) => {
    dispatch(currentUserActions.setMobile(_mobile));
  };

  const [createCurrentUser, {isLoading, isSuccess}] =
    useCreateCurrentUserMutation();

  const onLoginPress = () => {
    createCurrentUser({
      countryCode,
      mobile,
    });
  };

  useEffect(() => {
    if (isSuccess) rootNavigation.navigate('verification');
  }, [isSuccess]);

  return (
    <LoginView
      countryCode={countryCode}
      onCountryCodeFieldPress={onCountryCodeFieldPress}
      hideCountryCodeModal={hideCountryCodeModal}
      isCountryCodeModalVisible={isCountryCodeModalVisible}
      onCountryCodeItemPress={onCountryCodeItemPress}
      mobile={mobile}
      onMobileChangeText={onMobileChangeText}
      onLoginPress={onLoginPress}
      isLoading={isLoading}
    />
  );
};
