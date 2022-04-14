import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 16,
    backgroundColor: 'pink',
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  song: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  artist: {
    color: 'white',
  },
  slider: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: DEVICE_WIDTH - 32,
    borderRadius: 2,
    height: 4,
    marginVertical: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default function FunPlayer({onPress, ...rest}) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={StyleSheet.absoluteFill} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Now Playing</Text>
          <RectButton style={styles.button} {...{onPress}}>
            <Icon name="more-horizontal" color="white" size={24} />
          </RectButton>
        </View>
        <Image source={require('../assets/thebay.jpg')} style={styles.cover} />
        <View style={styles.metadata}>
          <View>
            <Text style={styles.song}>The Bay</Text>
            <Text style={styles.artist}>Metronomy</Text>
          </View>
          <AntDesign name="heart" size={24} color="#55b661" />
        </View>
        <View style={styles.slider} />
        <View style={styles.controls}>
          <Icon name="shuffle" color="rgba(255, 255, 255, 0.5)" size={24} />
          <AntDesign name="stepbackward" color="white" size={32} />
          <AntDesign name="play" color="white" size={48} />
          <AntDesign name="stepforward" color="white" size={32} />
          <Icon name="repeat" color="rgba(255, 255, 255, 0.5)" size={24} />
        </View>
      </View>
    </SafeAreaView>
  );
}
