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
