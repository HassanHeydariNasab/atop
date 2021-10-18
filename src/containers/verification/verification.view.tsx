import React, {useRef} from 'react';
import type {FC} from 'react';
import {TextInput as RNTextInput} from 'react-native';
import {Button, Column, Input} from 'native-base';

interface VerificationViewProps {
  verificationCode: string;
  onVerificationCodeChangeText: (_verificationCode: string) => void;
  isUserNew: boolean;
  name: string;
  onNameChangeText: (_name: string) => void;
  onVerifyPress: () => void;
  isLoading: boolean;
}
export const VerificationView: FC<VerificationViewProps> = ({
  verificationCode,
  onVerificationCodeChangeText,
  isUserNew,
  name,
  onNameChangeText,
  onVerifyPress,
  isLoading,
}) => {
  const nameInputRef = useRef<RNTextInput>(null);
  const focusOnNameInput = () => {
    if (nameInputRef.current) nameInputRef?.current.focus();
  };
  return (
    <Column flexGrow={1} justifyContent={'center'} px={'8'} space={'4'}>
      <Input
        placeholder={'code'}
        keyboardType={'numeric'}
        textContentType={'oneTimeCode'}
        autoFocus
        onSubmitEditing={isUserNew ? focusOnNameInput : onVerifyPress}
        returnKeyType={isUserNew ? 'next' : 'go'}
        value={verificationCode}
        onChangeText={onVerificationCodeChangeText}
      />
      {isUserNew && (
        <Input
          placeholder={'name'}
          keyboardType={'ascii-capable'}
          textContentType={'username'}
          onSubmitEditing={onVerifyPress}
          returnKeyType={'go'}
          value={name}
          onChangeText={onNameChangeText}
          ref={nameInputRef}
        />
      )}
      <Button
        onPress={onVerifyPress}
        isLoading={isLoading}
        isDisabled={
          isUserNew
            ? name === '' || verificationCode === ''
            : verificationCode === ''
        }>
        {'Verify'}
      </Button>
    </Column>
  );
};
