import * as React from 'react';
import {Snackbar} from 'react-native-paper';
import {useShallowPickSelector} from '@hooks/useSelector';
import {useDispatch} from 'react-redux';
import {appActions} from '@store/app';

export default () => {
  const {isSnackBarVisible, snackBarMessage} = useShallowPickSelector('app', [
    'isSnackBarVisible',
    'snackBarMessage',
  ]);
  const dispatch = useDispatch();
  const onDismiss = () => {
    dispatch(appActions.setIsSnackBarVisible(false));
  };
  return (
    <Snackbar visible={isSnackBarVisible} onDismiss={onDismiss} duration={2000}>
      {snackBarMessage}
    </Snackbar>
  );
};
