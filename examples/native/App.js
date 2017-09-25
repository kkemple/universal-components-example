import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button } from '@kkemple/universal-components';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>

        <View style={styles.buttonWrapper}>
          <Button
            text="Press on Native!"
            onPress={() => Alert.alert('Button Pressed!')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginTop: 16,
  },
});
