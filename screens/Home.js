import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {State, usePlaybackState} from 'react-native-track-player';
import Loading from '../components/Loading';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const {width: DEVICE_WIDTH} = Dimensions.get('window');

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

  const playbackState = usePlaybackState();
  const isPlaying = playbackState === State.Playing;

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
      <ScrollView>
        <Button title="Search" onPress={() => navigation.navigate('Search')} />
        <Button title="Player" onPress={() => navigation.navigate('Player')} />
        <Button title="Test" onPress={() => navigation.navigate('Test')} />
        <View style={[styles.grid, {width: DEVICE_WIDTH}]}>
          {albums.map(album => (
            <Album key={album.id} item={album} />
          ))}
        </View>
        <Text style={{textAlign: 'center', marginVertical: 20}}>
          {albums.length} albums shown
        </Text>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
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
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  itemText: {
    fontSize: 9,
    marginTop: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
  },
});
