import {useSelector, shallowEqual} from 'react-redux';
import type {RootState} from '@store/index';
import {pick} from 'ramda';

export const useShallowSelector = <K extends keyof RootState>(key: K) =>
  useSelector((state: RootState) => state[key], shallowEqual);

export const useShallowPickSelector = <
  K extends keyof RootState,
  T extends keyof RootState[K],
>(
  store: K,
  properties: T[],
) =>
  useSelector(
    (state: RootState) => pick(properties, state[store]),
    shallowEqual,
  );
