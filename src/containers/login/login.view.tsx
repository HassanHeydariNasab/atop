import React from 'react';
import type {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Modal,
  Button,
  Input,
  View,
  FlatList,
  Text,
  Column,
  Divider,
} from 'native-base';
import * as countryCodesList from 'country-codes-list';

interface LoginViewProps {
  countryCode: string;
  onCountryCodeFieldPress: () => void;
  hideCountryCodeModal: () => void;
  isCountryCodeModalVisible: boolean;
  onCountryCodeItemPress: (countryCode: string) => void;
  mobile: string;
  onMobileChangeText: (mobile: string) => void;
  onLoginPress: () => void;
  isLoading: boolean;
}
export const LoginView: FC<LoginViewProps> = ({
  countryCode,
  onCountryCodeFieldPress,
  hideCountryCodeModal,
  isCountryCodeModalVisible,
  onCountryCodeItemPress,
  mobile,
  onMobileChangeText,
  onLoginPress,
  isLoading,
}) => {
  return (
    <Column flexGrow={1} justifyContent={'center'} px={'8'} space={'4'}>
      <Input
        placeholder={'mobile'}
        keyboardType={'phone-pad'}
        textContentType={'telephoneNumber'}
        value={mobile}
        onChangeText={onMobileChangeText}
        InputLeftElement={
          <Button onPress={onCountryCodeFieldPress} ml={'1'}>
            {countryCode}
          </Button>
        }
        variant={'outline'}
        size={'md'}
        autoFocus
        onSubmitEditing={onLoginPress}
        returnKeyType={'next'}
      />
      <Button
        onPress={onLoginPress}
        isLoading={isLoading}
        isDisabled={mobile === ''}>
        Login
      </Button>
      <Modal
        isOpen={isCountryCodeModalVisible}
        onClose={hideCountryCodeModal}
        alignItems={'stretch'}
        bg={'lightBackground'}>
        <FlatList
          data={countryCodesList.customArray({
            value: '{countryCallingCode}',
            name: '{countryNameEn}',
          })}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => onCountryCodeItemPress(`+${item.value}`)}>
              <Text
                lineHeight={'5xl'}
                px={'4'}>{`${item.name} (+${item.value})`}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={() => <Divider />}
          getItemLayout={(data, index) => ({
            length: 64,
            offset: 64 * index,
            index,
          })}
          windowSize={3}
          maxToRenderPerBatch={12}
          initialNumToRender={12}
        />
      </Modal>
    </Column>
  );
};
