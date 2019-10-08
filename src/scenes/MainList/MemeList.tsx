import Fuse from 'fuse.js';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Api from '~/services/Api';
import Input from '~/components/Input';
import MemeItem from '~/components/MemeItem';
import Storage from '~/services/Storage';
import objectKeysToCamelCase from '~/helpers/objectKeysToCamelCase';
import { MemeType } from '~/types/scenes';

const fuseOptions = {
  keys: ['name'],
  maxPatternLength: 32,
  minMatchCharLength: 1,
  shouldSort: true,
  threshold: 0.4,
};

const App = ({ navigation }) => {
  const [memes, setMemes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const fuseMemes = useRef(new Fuse([], fuseOptions));

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    const response = await Api.get('https://api.imgflip.com/get_memes');
    const favourites: Array<MemeType> = JSON.parse(
      await Storage.get(Storage.keys.favourites),
    );
    const favouriteIds = favourites ? favourites.map(({ id }) => id) : [];
    const memes = Object.values<MemeType>(
      objectKeysToCamelCase(response.data.memes || []),
    );

    const parsedMemes = favouriteIds
      ? memes.map(meme =>
          favouriteIds.includes(meme.id) ? { favourite: true, ...meme } : meme,
        )
      : memes;

    fuseMemes.current = new Fuse(parsedMemes, fuseOptions);

    setMemes(parsedMemes);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          autoCompleteType="off"
          placeholder="Szukaj"
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        keyExtractor={({ id, item }) => (item ? item.id : id)}
        contentContainerStyle={styles.list}
        data={searchText ? fuseMemes.current.search(searchText) : memes}
        numColumns={2}
        renderItem={({ item }) => (
          <MemeItem
            item={item}
            onPress={() => navigation.navigate('MemeCreator', { meme: item })}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 15,
  },
  container: {
    paddingTop: 20,
  },
  list: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 80,
  },
});
