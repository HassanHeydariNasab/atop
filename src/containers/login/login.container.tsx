import * as React from 'react';
import {useState} from 'react';
import LoginView from './login.view';

export default () => {
  const [countryCode, setCountryCode] = useState<string>('+98');
  const [mobile, setMobile] = useState<string>('');
  const [isCountryCodeModalVisible, setIsCountryCodeVisible] =
    useState<boolean>(false);
  const [isDoingLogin, setIsDoingLogin] = useState<boolean>(false);
  const onCountryCodeFieldPress = () => {
    setIsCountryCodeVisible(true);
  };
  const hideCountryCodeModal = () => {
    setIsCountryCodeVisible(false);
  };
  const onCountryCodeItemPress = (countryCode: string) => {
    setCountryCode(countryCode);
    setIsCountryCodeVisible(false);
  };
  const onMobileChangeText = (_mobile: string) => {
    setMobile(_mobile);
  };
  const onLoginPress = () => {
    setIsDoingLogin(true);
    console.log({countryCode, mobile});
    setIsDoingLogin(false);
  };
  return (
    <LoginView
      countryCode={countryCode}
      onCountryCodeFieldPress={onCountryCodeFieldPress}
      hideCountryCodeModal={hideCountryCodeModal}
      isCountryCodeModalVisible={isCountryCodeModalVisible}
      onCountryCodeItemPress={onCountryCodeItemPress}
      onMobileChangeText={onMobileChangeText}
      onLoginPress={onLoginPress}
      isDoingLogin={isDoingLogin}
    />
  );
};
