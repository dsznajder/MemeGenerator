import { RouteProp } from '@react-navigation/core';

import { StackParamList } from '~/types/scenes';

export type MemeCreatorRouteProp = RouteProp<StackParamList, 'MemeCreator'>;

// Local Reducer
export type MemeCreatorState = {
  lines: Array<string>;
  createdMeme: string;
  favourite?: boolean;
};

type SetCreatedMemeAction = {
  type: 'setCreatedMeme';
  payload: string;
};

type ToggleFavouriteAction = {
  type: 'toggleFavourite';
};

type ChangeLineAction = {
  type: 'changeLine';
  payload: {
    line: string;
    index: number;
  };
};

export type MemeCreatorActions =
  | SetCreatedMemeAction
  | ChangeLineAction
  | ToggleFavouriteAction;
