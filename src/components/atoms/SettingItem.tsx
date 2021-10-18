import React from 'react';
import type {FC} from 'react';
import {Text, Row, ITextProps, Pressable} from 'native-base';
import {TextStyle} from 'react-native';

export const SettingItem: FC<{
  Icon: Element;
  text: string;
  _text?: ITextProps;
  Right?: Element;
  onPress?: () => void;
}> = ({Icon, text, _text, Right, onPress}) => {
  return (
    <Pressable
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      py={3}
      onPress={onPress}>
      <Row alignItems={'center'}>
        {Icon}
        <Text fontSize={'sm'} ml={3} {..._text}>
          {text}
        </Text>
      </Row>
      {Right ? Right : undefined}
    </Pressable>
  );
};
