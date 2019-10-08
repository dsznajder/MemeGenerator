import FastImage from 'react-native-fast-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { DEVICE_WIDTH } from '~/styles/values';
import { MemeType } from '~/types/scenes';
import { white } from '~/styles/colors';

type Props = {
  item: MemeType;
  onPress: () => void;
};

const MemeItem = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <FastImage
        resizeMode={FastImage.resizeMode.stretch}
        source={{ cache: FastImage.cacheControl.immutable, uri: item.url }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default MemeItem;

const IMAGE_SIZE = DEVICE_WIDTH / 2 - 30;

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

  name: {
    padding: 5,
    color: white,
    fontSize: 16,
  },
});
