import React, {useState, useEffect} from 'react';
import type {FC} from 'react';
import {useDispatch} from 'react-redux';
import {
  currentUserActions,
  useUpsertVerificationMutation,
} from '@store/current-user';
import {useShallowPickSelector} from '@hooks/useSelector';
import type {RootRouterProps} from '@containers/root.router';
import {LoginView} from './login.view';

export const LoginContainer: FC<RootRouterProps<'login'>> = ({navigation}) => {
  const [isCountryCodeModalVisible, setIsCountryCodeModalVisible] =
    useState<boolean>(false);

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

  const [upsertVerification, {isLoading, isSuccess, data}] =
    useUpsertVerificationMutation();

  const onLoginPress = () => {
    upsertVerification({
      countryCode,
      mobile,
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      navigation.navigate('verification', {isUserNew: data.isUserNew});
    }
  }, [isSuccess, data]);

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
