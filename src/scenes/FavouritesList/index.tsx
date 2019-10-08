import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import MemeItem from '~/components/MemeItem';
import Storage from '~/services/Storage';
import { MemeType } from '~/types/scenes';

const FavouritesList = ({ navigation }) => {
  const [favourites, setFavourites]: [
    Array<MemeType>,
    Dispatch<SetStateAction<Array<MemeType>>>,
  ] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Storage.get(Storage.keys.favourites).then(favouritesString => {
        const favourites: Array<MemeType> = JSON.parse(favouritesString);
        setFavourites(favourites);
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <FlatList
      data={favourites}
      numColumns={2}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <MemeItem
          onPress={() => navigation.navigate('MemeCreator', { meme: item })}
          item={item}
        />
      )}
    />
  );
};

export default FavouritesList;

const styles = StyleSheet.create({
  list: {
    paddingTop: 20,
    paddingBottom: 80,
  },
});
