import { RouteProp } from '@react-navigation/core';

import { StackParamList } from '~/types/scenes';

export type MemeCreatorRouteProp = RouteProp<StackParamList, 'MemeCreator'>;

// Local Reducer
export type MemeCreatorState = {
  lines: Array<string>;
  createdMeme: string;
};

type SetCreatedMemeAction = {
  type: 'setCreatedMeme';
  payload: string;
};

type AddLineAction = {
  type: 'changeLine';
  payload: {
    line: string;
    index: number;
  };
};

export type MemeCreatorActions = SetCreatedMemeAction | AddLineAction;
