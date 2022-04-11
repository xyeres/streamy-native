import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import secondsToTime from '../utils/secondsToTime';
import TrackPlayer from 'react-native-track-player';

const TracklistItem = ({item}) => {
  const duration = secondsToTime(item.format.duration);

  const track = {
    url: item.songUrl,
    title: item.title,
    artist: item.artist,
    duration: item.format.duration,
    artwork: item.coverUrl,
  };

  const onPressAddToQueue = async track => {
    await TrackPlayer.reset();
    await TrackPlayer.add([track]);
    await TrackPlayer.play();
  };

  return (
    <TouchableOpacity onPress={() => onPressAddToQueue(track)}>
      <View style={styles.item}>
        <View>
          <Text style={styles.itemText}>{item.title}</Text>
          <Text style={[styles.itemText, styles.secondText]}>
            {item.artist}
          </Text>
        </View>
        <Text style={styles.itemText}>{duration}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TracklistItem;

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
    paddingBottom: 10,
    paddingTop: 10,
  },
  itemText: {
    fontSize: 11,
    color: 'black',
    marginTop: 2,
  },
  secondText: {
    fontSize: 9,
    color: 'gray',
  },
});
