import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';
import TracklistItem from '../components/TracklistItem';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import CONSTANTS from '../utils/constants';
import BackButton from '../components/BackButton';

const TracklistScreen = ({navigation, route}) => {
  const {listId} = route.params;
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const tabBarHeight = useBottomTabBarHeight() + CONSTANTS.TAB_PADDING;

  useEffect(() => {
    firestore()
      .collectionGroup('songs')
      .where('albumSlug', '==', listId)
      .get()
      .then(qSnapshot => {
        const tracks = [];
        qSnapshot.forEach(doc => {
          const {
            songUrl,
            coverUrl,
            format: {duration},
            // Pull out lastUpdated because it can't be serialized
            lastUpdated,
            ...rest
          } = doc.data();
          tracks.push({
            key: doc.id,
            url: songUrl,
            artwork: coverUrl,
            duration,
            ...rest,
          });
        });
        setTracks(tracks);
        setLoading(false);
      });
  }, [listId]);

  if (loading) {
    return <Loading />;
  }

  const firstTrack = tracks[0];

  return (
    <View style={[styles.container]}>
      <BackButton
        style={{alignSelf: 'flex-start', marginLeft: 10}}
        navigation={navigation}
      />
      <ScrollView style={styles.scrollView}>
        <View>
          <View style={[styles.headerContainer, {width: SCREEN_WIDTH}]}>
            <Image source={{uri: firstTrack.artwork}} style={[styles.image]} />
            <Text style={styles.albumTitle}>{firstTrack.album}</Text>
          </View>
          <View style={[styles.padding, {paddingBottom: tabBarHeight}]}>
            {tracks.map((track, index) => (
              <TracklistItem
                key={track.id}
                index={index}
                tracks={tracks}
                track={track}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TracklistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'black',
  },
  padding: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  headerContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  image: {
    marginBottom: 10,
    width: 320,
    height: 320,
  },
  albumTitle: {
    fontSize: 15,
  },
});
