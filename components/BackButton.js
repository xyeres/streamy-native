import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BackButton = ({navigation, style}) => {
  return (
    <TouchableOpacity
      style={[style, {width: 30, height: 30}]}
      onPress={() => navigation.goBack()}>
      <View accessible accessibilityRole="button">
        <Ionicons name="chevron-back-outline" color="dimgray" size={24} />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
