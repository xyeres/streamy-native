import React, {useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {Extrapolate} from 'react-native-reanimated';
import {
  withSpring,
  onGestureEvent,
  clamp,
  timing,
} from 'react-native-redash/lib/module/v1';

import TabIcon from './TabIcon';
import Player from './Player';
import MiniPlayer from './MiniPlayer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';

const {
  Value,
  Clock,
  interpolateNode,
  useCode,
  block,
  set,
  cond,
  clockRunning,
  not,
} = Animated;
const {height} = Dimensions.get('window');
const TABBAR_HEIGHT = 60;
const MINIMIZED_PLAYER_HEIGHT = 42;
const SNAP_TOP = 0;
const SNAP_BOTTOM = height - TABBAR_HEIGHT - MINIMIZED_PLAYER_HEIGHT;

const config = {
  damping: 18,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1,
};

const styles = StyleSheet.create({
  playerSheet: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  container: {
    backgroundColor: '#272829',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TABBAR_HEIGHT,
    flexDirection: 'row',
    borderTopColor: 'black',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 1,
    paddingVertical: 5,
  },
});

const Tab = createBottomTabNavigator();

const BottomTab = ({navigation}) => {
  const translationY = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const offset = new Value(SNAP_TOP);
  const goUp = new Value(0);
  const goDown = new Value(0);
  const gestureHandler = onGestureEvent({
    translationY,
    state,
    velocityY,
  });
  const translateY = clamp(
    withSpring({
      state,
      offset,
      value: translationY,
      velocity: velocityY,
      snapPoints: [SNAP_TOP, SNAP_BOTTOM],
      config,
    }),
    SNAP_TOP,
    SNAP_BOTTOM,
  );
  const opacity = interpolateNode(translateY, {
    inputRange: [SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT, SNAP_BOTTOM],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const overlayOpacity = interpolateNode(translateY, {
    inputRange: [
      SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT * 1.5,
      SNAP_BOTTOM - MINIMIZED_PLAYER_HEIGHT,
    ],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const translateBottomTab = interpolateNode(translateY, {
    inputRange: [SNAP_BOTTOM - TABBAR_HEIGHT, SNAP_BOTTOM],
    outputRange: [TABBAR_HEIGHT, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const clock = new Clock();

  useCode(
    () =>
      block([
        cond(goUp, [
          set(
            offset,
            timing({
              clock,
              duration: 250,
              from: offset,
              to: SNAP_TOP,
            }),
          ),
          cond(not(clockRunning(clock)), [set(goUp, 0)]),
        ]),
        cond(goDown, [
          set(
            offset,
            timing({
              clock,
              duration: 250,
              from: offset,
              to: SNAP_BOTTOM,
            }),
          ),
          cond(not(clockRunning(clock)), [set(goDown, 0)]),
        ]),
      ]),
    [],
  );

  const handlePlayerOpen = () => {
    goUp.setValue(1);
  };
  return (
    <>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[styles.playerSheet, {transform: [{translateY}]}]}>
          <Player onPress={() => goDown.setValue(1)} />
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              opacity: overlayOpacity,
              backgroundColor: '#272829',
            }}
            pointerEvents="none"
          />
          <Animated.View
            style={{
              opacity: opacity,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: MINIMIZED_PLAYER_HEIGHT,
            }}>
            <MiniPlayer />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={{transform: [{translateY: translateBottomTab}]}}>
        <SafeAreaView style={styles.container}>
          {/* <TabIcon
            name="home"
            label="Home"
            onPress={() => navigation.navigate('Home')}
          />
          <TabIcon
            name="search"
            label="Search"
            onPress={() => navigation.navigate('Search')}
          />
          <TabIcon
            name="chevron-up"
            label="Player"
            onPress={handlePlayerOpen}
          /> */}
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

export default BottomTab;
