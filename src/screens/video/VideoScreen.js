import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TextInput,
  Button,
  Switch,
} from 'react-native';
import Video from 'react-native-video';

const VideoScreen = ({route}) => {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Text style={styles.title}>Current Video</Text>
      <View style={styles.relatedVideo}>
        <Video
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            //should be an API call to know the related video, now is hardcoded
          }}
          resizeMode="cover"
          controls={false}
          style={styles.backgroundVideo}
        />
      </View>
      <View style={styles.item}>
        <Video
          source={{
            uri: route.params.link,
          }}
          resizeMode="cover"
          controls={false}
          style={styles.backgroundVideo}
        />
      </View>
      <View style={styles.rowBox}>
        <Text>Enable/Disable comments</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#3c00ff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {isEnabled ? (
        <>
          <View style={styles.allComments}>
            {commentList.map((text, index) => (
              <Text key={index}>{text}</Text>
            ))}
          </View>
          <View style={styles.rowBox}>
            <TextInput
              style={styles.inputView}
              placeholder="Your comment"
              placeholderTextColor="#003f5c"
              onChangeText={setComment}
            />
            <Button
              onPress={() => setCommentList([...commentList, comment])}
              title="Send"
              style={styles.sendBox}
            />
          </View>
        </>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
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
  title: {
    fontSize: 32,
    height: 40,
    width: '100%',
    textAlign: 'center',
  },
  relatedVideo: {
    backgroundColor: '#000000',
    width: '20%',
    aspectRatio: 16 / 9,
    marginRight: (Dimensions.get('window').width * 0.2) / 2,
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  inputView: {
    backgroundColor: '#E3D4F7',
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
    height: 50,
  },
  rowBox: {
    marginBottom: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    width: '80%',
  },
  sendBox: {
    backgroundColor: 'blue',
    borderRadius: 25,
    height: 10,
  },
  allComments: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '80%',
  },
});

export default VideoScreen;
