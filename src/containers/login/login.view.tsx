import * as React from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import {TextInput, Portal, List, Modal, Button} from 'react-native-paper';
import * as countryCodesList from 'country-codes-list';
import {styles} from './login.styles';

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
export default ({
  countryCode,
  onCountryCodeFieldPress,
  hideCountryCodeModal,
  isCountryCodeModalVisible,
  onCountryCodeItemPress,
  mobile,
  onMobileChangeText,
  onLoginPress,
  isLoading,
}: LoginViewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.mobileContainer}>
        <Button
          onPress={onCountryCodeFieldPress}
          style={styles.countryCodeButton}
          contentStyle={styles.countryCodeButtonContent}
          mode={'contained'}>
          {countryCode}
        </Button>
        <TextInput
          label={'mobile'}
          keyboardType={'phone-pad'}
          textContentType={'telephoneNumber'}
          value={mobile}
          onChangeText={onMobileChangeText}
          style={styles.mobileTextInput}
          mode={'flat'}
        />
      </View>
      <Button
        onPress={onLoginPress}
        loading={isLoading}
        mode={'contained'}
        style={styles.loginButton}
        contentStyle={styles.loginButtonContent}>
        Login
      </Button>
      <Portal>
        <Modal
          visible={isCountryCodeModalVisible}
          onDismiss={hideCountryCodeModal}
          contentContainerStyle={styles.countryCodeModal}>
          <FlatList
            data={countryCodesList.customArray({
              value: '{countryCallingCode}',
              name: '{countryNameEn}',
            })}
            renderItem={({item}) => (
              <List.Item
                title={`${item.name} (+${item.value})`}
                onPress={() => onCountryCodeItemPress(`+${item.value}`)}
              />
            )}
            keyExtractor={item => item.name}
          />
        </Modal>
      </Portal>
    </View>
  );
};
