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

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import playlistData from '../player/playlist.json';

import localTrack from '../player/test.mp3';
import {useDispatch, useSelector} from 'react-redux';
import {setIsPlaying, setNotPlaying} from '../player/playerSlice';

const setupIfNecessary = async () => {
  // if app was relaunched and music was already playing, we don't setup again.
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack !== null) {
    return;
  }

  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });

  await TrackPlayer.add(playlistData);
  await TrackPlayer.add({
    url: localTrack,
    title: 'I Need You More',
    artist: 'United Pursuit',
    artwork: 'https://i.scdn.co/image/e5c7b168be89098eb686e02152aaee9d3a24e5b6',
    duration: 453,
  });

  TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

const togglePlayback = async playbackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack == null) {
    // TODO: Perhaps present an error or restart the playlist?
  } else {
    if (playbackState !== State.Playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const App = ({navigation}) => {
  const playbackState = usePlaybackState();
  const isPlaying = playbackState === State.Playing;
  const progress = useProgress();
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack !== undefined
    ) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, artist, artwork} = track || {};
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
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

export default App;
