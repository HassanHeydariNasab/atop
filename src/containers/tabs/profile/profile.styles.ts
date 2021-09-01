import {StyleSheet} from 'react-native';
import {SCALE_64, SCALE_24} from '@styles/spacing';

export const styles = StyleSheet.create({
  container: {
    padding: SCALE_24,
    justifyContent: 'center',
    flex: 1,
  },
  mobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  countryCodeButtonContent: {
    height: 64,
  },
  mobileTextInput: {
    flex: 1,
    borderTopLeftRadius: 0,
  },
  countryCodeModal: {
    backgroundColor: '#fff',
    marginVertical: SCALE_64,
  },
  loginButton: {
    marginTop: SCALE_64,
  },
  loginButtonContent: {
    height: SCALE_64,
  },
});
