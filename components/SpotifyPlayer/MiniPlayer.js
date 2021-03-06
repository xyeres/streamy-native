import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272829',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    color: 'white',
  },
});

export default function MiniPlayer() {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Icon name="heart" color="white" size={20} />
        <Text style={styles.text}>Metronomy - The Bay</Text>
        <Icon name="play-circle" color="white" size={22} />
      </View>
    </TouchableWithoutFeedback>
  );
}
