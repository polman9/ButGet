// app/index.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Chart Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E7E7E7',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
