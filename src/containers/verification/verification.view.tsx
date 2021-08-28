import * as React from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {styles} from './verification.styles';

interface VerificationViewProps {
  verificationCode: string;
  onVerificationCodeChangeText: (_verificationCode: string) => void;
  onVerifyPress: () => void;
  isLoading: boolean;
}
export default ({
  verificationCode,
  onVerificationCodeChangeText,
  onVerifyPress,
  isLoading,
}: VerificationViewProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        label={'code'}
        keyboardType={'default'}
        textContentType={'oneTimeCode'}
        value={verificationCode}
        onChangeText={onVerificationCodeChangeText}
        style={styles.verificationCodeTextInput}
        mode={'flat'}
      />
      <Button
        onPress={onVerifyPress}
        loading={isLoading}
        mode={'contained'}
        style={styles.verifyButton}
        contentStyle={styles.verifyButtonContent}>
        Verify
      </Button>
    </View>
  );
};
