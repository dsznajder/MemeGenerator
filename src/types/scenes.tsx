export type MemeType = {
  boxCount: number;
  height: number;
  id: string;
  name: string;
  url: string;
  width: number;
};

export type StackParamList = {
  MemeList: undefined;
  MemeCreator: {
    meme: MemeType;
  };
};

export type BottomTabParamList = {
  List: undefined;
  Favourites: undefined;
  Custom: undefined;
};
