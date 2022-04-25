import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Slider} from '@miblanchard/react-native-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import {useDispatch, useSelector} from 'react-redux';

import {
  selectArtist,
  setArtist,
  setIsPlaying,
  setNotPlaying,
} from '../features/player/playerSlice';
import setupIfNecessary from '../features/player/trackPlayerSetup';

const PlayerScreen = ({navigation}) => {
  const playbackState = usePlaybackState();
  const isPlaying = playbackState === State.Playing;
  const progress = useProgress();
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const dispatch = useDispatch();

  const trackArtist = useSelector(selectArtist);

  // Can this be used in a thunk?
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    // if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
    const track = await TrackPlayer.getTrack(event.nextTrack);
    const {title, artist, artwork} = track || {};
    setTrackTitle(title);
    console.log('aritst', artist);
    dispatch(setArtist(artist));
    setTrackArtwork(artwork);
    // }
  });

  useEffect(() => {
    setupIfNecessary();
  }, []);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.contentContainer}>
        <View style={styles.topBarContainer}>
          <TouchableWithoutFeedback>
            <Text style={styles.queueButton}>Queue</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Text
              onPress={() => {
                navigation.navigate('Home');
              }}
              style={styles.queueButton}>
              Home
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <Image style={styles.artwork} source={{uri: `${trackArtwork}`}} />
        <Text style={styles.titleText}>{trackTitle}</Text>
        <Text style={styles.artistText}>{trackArtist}</Text>
        <Slider
          containerStyle={styles.progressContainer}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor="gray"
          minimumTrackTintColor="gray"
          maximumTrackTintColor="white"
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(parseInt(value, 10));
          }}
        />
        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelText}>
            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
          </Text>
          <Text style={styles.progressLabelText}>
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .substr(14, 5)}
          </Text>
        </View>
      </View>
      <View style={styles.actionRowContainer}>
        <TouchableWithoutFeedback onPress={() => TrackPlayer.skipToPrevious()}>
          <Text style={styles.secondaryActionButton}>Prev</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => togglePlayback(playbackState)}>
          <Text style={styles.primaryActionButton}>
            {isPlaying ? 'Pause' : 'Play'}
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => TrackPlayer.skipToNext()}>
          <Text style={styles.secondaryActionButton}>Next</Text>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.8)',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 0,
    justifyContent: 'space-around',
  },
  queueButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  artwork: {
    width: 240,
    height: 240,
    marginTop: 30,
    backgroundColor: 'grey',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginTop: 30,
  },
  artistText: {
    fontSize: 16,
    fontWeight: '200',
    color: 'white',
  },
  progressContainer: {
    height: 40,
    width: 380,
    marginTop: 25,
  },
  progressLabelContainer: {
    width: 370,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: 'white',
    fontVariant: ['tabular-nums'],
  },
  actionRowContainer: {
    width: '60%',
    flexDirection: 'row',
    marginBottom: 100,
    justifyContent: 'space-between',
  },
  primaryActionButton: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  secondaryActionButton: {
    fontSize: 14,
    color: 'white',
  },
});

export default PlayerScreen;
