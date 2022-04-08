import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {State, usePlaybackState} from 'react-native-track-player';

const Home = ({navigation}) => {
  const playbackState = usePlaybackState();
  const isPlaying = playbackState === State.Playing;

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Search" onPress={() => navigation.navigate('Search')} />
      <Button title="Player" onPress={() => navigation.navigate('Player')} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
});
