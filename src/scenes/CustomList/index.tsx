import ImagePicker from 'react-native-image-picker';
import React from 'react';
import { Button, View } from 'react-native';

import I18n from '~/services/I18n';
import { secondary } from '~/styles/colors';

const imagePickerOptions = {
  title: 'Select Meme',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const CustomList = () => {
  const openImagePicker = () => {
    ImagePicker.showImagePicker(imagePickerOptions, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log(source);
      }
    });
  };

  return (
    <View>
      <Button
        color={secondary}
        onPress={openImagePicker}
        title={I18n.t('common.upload')}
      />
    </View>
  );
};

export default CustomList;
