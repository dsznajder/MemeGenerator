import FastImage from 'react-native-fast-image';
import Fuse from 'fuse.js';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Api from '~/services/Api';
import objectKeysToCamelCase from '~/helpers/objectKeysToCamelCase';

import { MemeType } from '~/types/scenes';
import { primary } from '~/styles/colors';

const { width } = Dimensions.get('window');

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
    const parsedMemes = Object.values(
      objectKeysToCamelCase(response.data.memes || []),
    );
    fuseMemes.current = new Fuse(parsedMemes, fuseOptions);
    setMemes(parsedMemes);
  };

  const renderItem = ({ item }: { item: MemeType }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MemeCreator', { meme: item })}
      style={styles.item}
    >
      <Text style={styles.name}>{item.name}</Text>
      <FastImage
        resizeMode={FastImage.resizeMode.stretch}
        source={{ cache: FastImage.cacheControl.immutable, uri: item.url }}
        style={styles.image}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        autoCompleteType="off"
        placeholder="Szukaj"
        onChangeText={setSearchText}
      />

      <FlatList
        keyExtractor={({ id, item }) => (item ? item.id : id)}
        contentContainerStyle={styles.list}
        data={searchText ? fuseMemes.current.search(searchText) : memes}
        numColumns={2}
        renderItem={renderItem}
      />
    </>
  );
};

export default App;

const IMAGE_SIZE = width / 2 - 20;

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },
  item: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    paddingTop: 40,
  },
  name: {
    color: primary,
    fontSize: 16,
  },
});
