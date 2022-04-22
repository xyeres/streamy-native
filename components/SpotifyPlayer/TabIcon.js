import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});

const TabIcon = ({name, onPress, label, ...rest}) => {
  return (
    <RectButton {...{onPress}} {...rest} style={styles.container}>
      <Icon {...{name}} size={24} color="white" />
      <Text style={styles.label}>{label}</Text>
    </RectButton>
  );
};

export default TabIcon;
