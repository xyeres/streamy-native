import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {State, usePlaybackState} from 'react-native-track-player';
import Loading from '../components/Loading';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Button title="Search" onPress={() => navigation.navigate('Search')} />
      <Button title="Player" onPress={() => navigation.navigate('Player')} />
      <Button title="Test" onPress={() => navigation.navigate('Test')} />
      <FlatList
        data={albums}
        numColumns={3}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Tracklist', {
                listId: item.id,
                title: item.title,
              })
            }>
            <View style={styles.item}>
              <Image source={{uri: item.coverUrl}} style={styles.image} />
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    marginHorizontal: 'auto',
    width: '100%',
  },
  item: {
    flex: 1,
    maxWidth: 100,
    margin: 8,
  },
  itemText: {
    fontSize: 10,
    marginTop: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
