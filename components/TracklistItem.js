import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import secondsToTime from '../utils/secondsToTime';
import {resetAndPlayList} from '../features/player/playerSlice';
import {useDispatch} from 'react-redux';

const TracklistItem = ({track, tracks, index}) => {
  const duration = secondsToTime(track.duration);
  const dispatch = useDispatch();

  const handleResetAndPlayList = payload => {
    dispatch(resetAndPlayList(payload));
    console.log(payload.index);
    console.log(payload.track);
    console.log(payload.tracks);
  };

  return (
    <TouchableOpacity
      onPress={() => handleResetAndPlayList({track, tracks, index})}>
      <View style={styles.itemRow}>
        <View>
          <Text style={styles.itemText}>{track.title}</Text>
          <Text style={[styles.itemText, styles.secondText]}>
            {track.artist}
          </Text>
        </View>
        <Text style={styles.itemText}>{duration}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TracklistItem;

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'dimgray',
    // paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  itemText: {
    fontSize: 11,
    color: 'white',
    marginTop: 2,
  },
  secondText: {
    fontSize: 9,
    color: 'gray',
  },
});
