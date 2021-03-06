import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import CONSTANTS from '../utils/constants';
import COLORS from '../utils/colors';

import {FlatList, RectButton} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  onTrackChanged,
  selectIsPlaying,
  selectNowPlaying,
  setNowPlaying,
  skipSong,
  togglePlayback,
} from '../features/player/playerSlice';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

export default function FunPlayer({onPress, ...rest}) {
  const dispatch = useDispatch();
  const nowPlaying = useSelector(selectNowPlaying);
  const trackLoaded = nowPlaying.url !== null;
  const isPlaying = useSelector(selectIsPlaying);

  // Can this be used in a thunk?
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      dispatch(onTrackChanged(event.nextTrack));
    }
  });

  const queue = TrackPlayer.getQueue();
  console.log(queue)

  const handleTogglePlayback = () => {
    dispatch(togglePlayback());
  };

  const handleSkip = () => {
    dispatch(skipSong());
  };

  // const QueueItem = ({item}) => {
  //   return (
  //     <Text>
  //       {item.title} - {item.artist}
  //     </Text>
  //   );
  // };

  return (
    <SafeAreaView style={styles.root}>
      <View style={StyleSheet.absoluteFill} />
      <View style={styles.container}>
        {trackLoaded ? (
          <>
            <Image source={{uri: nowPlaying?.artwork}} style={styles.cover} />
            <View style={styles.controlsContainer}>
              <View style={styles.metadata}>
                <View>
                  <Text style={styles.song}>{nowPlaying.title}</Text>
                  <Text style={styles.artist}>{nowPlaying.artist}</Text>
                </View>
              </View>
              <View style={styles.slider} />
              <View style={styles.controls}>
                <Icon
                  name="shuffle"
                  color="rgba(255, 255, 255, 0.5)"
                  size={24}
                />
                <AntDesign name="stepbackward" color="white" size={32} />
                <RectButton onPress={handleTogglePlayback}>
                  {isPlaying ? (
                    <AntDesign name="pausecircle" color="white" size={48} />
                  ) : (
                    <AntDesign name="play" color="white" size={48} />
                  )}
                </RectButton>
                <RectButton onPress={handleSkip}>
                  <AntDesign name="stepforward" color="white" size={32} />
                </RectButton>
                <Icon
                  name="repeat"
                  color="rgba(255, 255, 255, 0.5)"
                  size={24}
                />
                {/* <SafeAreaView>
                <FlatList
                  renderItem={QueueItem}
                  data={queue}
                  keyExtractor={item => item.id}
                />
                </SafeAreaView> */}
                ;
              </View>
            </View>
          </>
        ) : (
          <View style={styles.cta}>
            <Icon name="shuffle" color="rgba(256,256,256, 0.5)" size={38} />
            <Text style={styles.ctaTxt}>Not sure where to start?</Text>
            <Text style={styles.ctaSubTxt}>
              We'll shuffle the full library for you.
            </Text>
            <RectButton style={[styles.cover, styles.ctaBtn]}>
              <AntDesign name="play" color="black" size={88} />
            </RectButton>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingTop: DEVICE_HEIGHT * 0.05,
    backgroundColor: 'black',
    height: DEVICE_HEIGHT,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 16,
  },
  title: {
    color: 'white',
    padding: 16,
  },
  cover: {
    marginVertical: 16,
    alignSelf: 'center',
    width: DEVICE_WIDTH - 128,
    borderRadius: DEVICE_WIDTH - 128 / 2,
    height: DEVICE_WIDTH - 128,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  song: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  artist: {
    textAlign: 'center',
    color: 'white',
  },
  slider: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 2,
    height: 4,
    marginVertical: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  controlsContainer: {
    width: DEVICE_WIDTH - 90,
    alignSelf: 'center',
  },
  cta: {
    flex: 1,
    alignItems: 'center',
    marginTop: 65,
  },
  ctaTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 3,
  },
  ctaSubTxt: {
    color: 'white',
    fontSize: 12,
    marginTop: 3,
  },
  ctaBtn: {
    backgroundColor: 'white',
    borderRadius: (DEVICE_WIDTH - 256) / 2,
    height: DEVICE_WIDTH - 256,
    width: DEVICE_WIDTH - 256,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: DEVICE_HEIGHT * 0.12,
  },
  ctaBtnTxt: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 3,
  },
});
