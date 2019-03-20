import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Approot from './src/Approot';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.container}>
          <Approot/>
        </View>
      </SafeAreaView>
    );
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor:'white'
  },
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
