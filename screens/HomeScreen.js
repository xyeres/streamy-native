import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import firestore from '@react-native-firebase/firestore';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import CONSTANTS from '../utils/constants';
import setupIfNecessary from '../features/player/trackPlayerSetup';

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const {width: DEVICE_WIDTH} = Dimensions.get('window');
  const tabBarHeight = useBottomTabBarHeight() + CONSTANTS.TAB_PADDING;

  useEffect(() => {
    setupIfNecessary();
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collectionGroup('albums')
      .onSnapshot(qSnapshot => {
        const albums = [];
        qSnapshot.forEach(doc => {
          albums.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setAlbums(albums);
        setLoading(false);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const Album = ({item: album}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Tracklist', {
            listId: album.id,
            title: album.title,
          })
        }>
        <View style={styles.item}>
          <Image source={{uri: album.coverUrl}} style={styles.image} />
          <Text style={styles.itemText}>{album.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <ScrollView>
        <View style={[styles.grid, {width: DEVICE_WIDTH, paddingTop: 20}]}>
          {albums.map(album => (
            <Album key={album.id} item={album} />
          ))}
        </View>
        <Text
          style={[
            {
              textAlign: 'center',
              marginVertical: 20,
              paddingBottom: tabBarHeight,
              fontSize: 10,
            },
          ]}>
          {albums.length} albums shown
        </Text>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    marginHorizontal: 'auto',
    flex: 1,
  },
  grid: {
    marginHorizontal: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  item: {
    flex: 1,
    minWidth: 100,
    maxWidth: 100,
    // height: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 8,
    margin: 2,
    padding: 8,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 10,
    marginTop: 6,
    color: 'white',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 6,
  },
});
