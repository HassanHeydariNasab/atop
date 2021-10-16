import type {RootState, StorageState} from '@store/index';
import {shallowEqual, useSelector} from 'react-redux';

import {pick} from 'ramda';

export const useShallowSelector = <K extends keyof RootState>(key: K) =>
  useSelector((state: RootState) => state[key], shallowEqual);

// RootState without API states
interface SimpleRootState {
  persistedReducer: StorageState;
}

export const useShallowPickSelector = <
  K extends keyof StorageState,
  T extends keyof StorageState[K],
>(
  store: K,
  properties: T[],
) =>
  useSelector(
    (state: SimpleRootState) => pick(properties, state.persistedReducer[store]),
    shallowEqual,
  );
