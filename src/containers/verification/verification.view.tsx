import * as React from 'react';
import {useRef} from 'react';
import {View, TextInput as RNTextInput} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {styles} from './verification.styles';

interface VerificationViewProps {
  verificationCode: string;
  onVerificationCodeChangeText: (_verificationCode: string) => void;
  isUserNew: boolean;
  name: string;
  onNameChangeText: (_name: string) => void;
  onVerifyPress: () => void;
  isLoading: boolean;
}
export default ({
  verificationCode,
  onVerificationCodeChangeText,
  isUserNew: isNewUser,
  name,
  onNameChangeText,
  onVerifyPress,
  isLoading,
}: VerificationViewProps) => {
  const nameInputRef = useRef<RNTextInput>(null);
  const focusOnNameInput = () => {
    if (nameInputRef.current) nameInputRef?.current.focus();
  };
  return (
    <View style={styles.container}>
      <TextInput
        label={'code'}
        keyboardType={'numeric'}
        textContentType={'oneTimeCode'}
        autoFocus
        onSubmitEditing={isNewUser ? focusOnNameInput : onVerifyPress}
        returnKeyType={isNewUser ? 'next' : 'go'}
        value={verificationCode}
        onChangeText={onVerificationCodeChangeText}
        mode={'flat'}
      />
      {isNewUser && (
        <TextInput
          label={'name'}
          keyboardType={'ascii-capable'}
          textContentType={'username'}
          onSubmitEditing={onVerifyPress}
          returnKeyType={'go'}
          value={name}
          onChangeText={onNameChangeText}
          style={styles.nameTextInput}
          mode={'flat'}
          ref={nameInputRef}
        />
      )}
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
