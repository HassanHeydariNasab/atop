import {StyleSheet} from 'react-native';
import {SCALE_64, SCALE_24} from '@styles/spacing';

export const styles = StyleSheet.create({
  container: {
    padding: SCALE_24,
    justifyContent: 'center',
    flex: 1,
  },
  verificationCodeTextInput: {
    flex: 1,
    borderTopLeftRadius: 0,
  },
  verifyButton: {
    marginTop: SCALE_64,
  },
  verifyButtonContent: {
    height: SCALE_64,
  },
});
