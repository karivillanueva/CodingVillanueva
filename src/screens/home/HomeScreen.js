import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import VideoItem from '../../components/VideoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  //LOAD DATA
  useEffect(() => {
    saveData([
      {link: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'},
      {
        link: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      },
      {
        link: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      },
    ]);
  }, []);

  const saveData = async newData => {
    try {
      await AsyncStorage.setItem('link', JSON.stringify(newData));
    } catch (error) {
      console.log(error);
    }
  };
  // END LOAD DATA

  useEffect(() => {
    getData();
  }, [getData]);

  const getData = useCallback(async () => {
    try {
      AsyncStorage.getItem('link')
        .then(req => JSON.parse(req))
        .then(item => {
          setData(item);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const renderItem = ({item}) => (
    <VideoItem navigation={navigation} link={item.link} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <FlatList
        ListHeaderComponent={() => <Text style={styles.title}>All videos</Text>}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    height: 40,
    width: '100%',
    textAlign: 'center',
  },
});

export default HomeScreen;
