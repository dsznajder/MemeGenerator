import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Api from '~/services/Api';
import { primary } from '~/styles/colors';

const { width } = Dimensions.get('window');

type MemeType = {
  box_count: number;
  height: number;
  id: string;
  name: string;
  url: string;
  width: number;
};

const App = ({ navigation }) => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    const response = await Api.get('https://api.imgflip.com/get_memes');
    setMemes(response.data!.memes || []);
  };

  const renderItem = ({ item }: { item: MemeType }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MemeCreator', { meme: item })}
      style={styles.item}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Image
        resizeMethod="scale"
        resizeMode="cover"
        source={{ uri: item.url }}
        style={styles.image}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={memes}
      numColumns={2}
      renderItem={renderItem}
    />
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
