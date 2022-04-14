import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Video from 'react-native-video';

const VideoItem = ({navigation, link}) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => navigation.navigate('VideoScreen', {link})}>
    <Video
      source={{
        uri: link,
      }}
      resizeMode="cover"
      muted={true}
      controls={false}
      style={styles.backgroundVideo}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#000000',
    width: '80%',
    aspectRatio: 16 / 9,
    marginVertical: 20,
    alignSelf: 'center',
  },
  backgroundVideo: {
    flex: 1,
  },
});

export default VideoItem;
