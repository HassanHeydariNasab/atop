import React from 'react';
import type {FC} from 'react';
import {Icon as NativeBaseIcon} from 'native-base';
import type {IIconProps} from 'native-base';
import MIcon from 'react-native-vector-icons/MaterialIcons';

export const Icon: FC<IIconProps> = props => (
  <NativeBaseIcon {...props} as={MIcon} />
);
