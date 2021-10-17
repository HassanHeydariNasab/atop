import React from 'react';
import type {FC} from 'react';
import {Column, Spinner, Text} from 'native-base';
import {User} from '@store/user';
import {styles} from './profile.styles';

interface ProfileViewProps {
  isLoading: boolean;
  user?: User;
}
export const ProfileView: FC<ProfileViewProps> = ({isLoading, user}) => {
  return (
    <Column style={styles.container}>
      {user && <Text>Hello {user.name}</Text>}
      <Spinner animating={isLoading} />
    </Column>
  );
};
