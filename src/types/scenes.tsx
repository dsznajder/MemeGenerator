export type MemeType = {
  boxCount: number;
  height: number;
  id: string;
  name: string;
  url: string;
  width: number;
};

export type RootParamList = {
  MemeList: undefined;
  MemeCreator: {
    meme: MemeType;
  };
};
