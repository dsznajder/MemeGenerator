export type MemeType = {
  boxCount: number;
  height: number;
  id: string;
  name: string;
  url: string;
  width: number;
  favourite?: boolean;
};

export type StackParamList = {
  MemeList: undefined;
  Favourites: undefined;
  Custom: undefined;
  MemeCreator: {
    meme: MemeType;
  };
};

export type BottomTabParamList = {
  List: undefined;
  Favourites: undefined;
  Custom: undefined;
};
