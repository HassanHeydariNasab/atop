import React from 'react';
import type {FC} from 'react';
import {Button, Column, Spinner, Text} from 'native-base';
import {User} from '@store/user';
import {styles} from './profile.styles';

interface ProfileViewProps {
  isLoading: boolean;
  user?: User;
  onPressLogout: () => void;
  onToggleTheme: () => void;
}
export const ProfileView: FC<ProfileViewProps> = ({
  isLoading,
  user,
  onPressLogout,
}) => {
  return (
    <Column style={styles.container}>
      {user && <Text>Hello {user.name}</Text>}
      {user && <Text>{`${user.coins} coins`}</Text>}
      <Button onPress={onPressLogout}>{'logout'}</Button>
      <Spinner animating={isLoading} />
    </Column>
  );
};
