import {StyleSheet, View, FlatList, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';
import TracklistItem from '../components/TracklistItem';

const Tracklist = ({route}) => {
  const {listId} = route.params;

  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    firestore()
      .collectionGroup('songs')
      .where('albumSlug', '==', listId)
      .get()
      .then(qSnapshot => {
        const tracks = [];
        qSnapshot.forEach(doc => {
          tracks.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setTracks(tracks);
        setLoading(false);
      });
  }, [listId]);

  if (loading) {
    return <Loading />;
  }

  const track = tracks[0];

  return (
    <View style={styles.container}>
      <Image source={{uri: track.coverUrl}} style={styles.coverImg} />
      <FlatList style={styles.list} data={tracks} renderItem={TracklistItem} />
    </View>
  );
};

export default Tracklist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
    padding: 15,
  },
  list: {
    width: '100%',
  },
  coverImg: {
    marginBottom: 10,
    width: 220,
    height: 220,
  },
});
