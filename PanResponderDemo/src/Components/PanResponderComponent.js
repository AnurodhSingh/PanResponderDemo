import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, PanResponder, SafeAreaView } from 'react-native';

type Props = {};
export default class PanResponderComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      pt1: { x: 0, y: 0 },
      pt2: { x: 0, y: 0 },
      pt3: { x: 0, y: 0 },
      pt4: { x: 0, y: 0 },
      dotSize: 5,
    }
  }
  componentWillMount() {
    this.animatedValue = new Animated.ValueXY();
    this._value = { x: 0, y: 0 };
    this.animatedValue.addListener((value) => this._value = value)
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.animatedValue.setOffset(this._value);
        this.animatedValue.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove:
        // alert(JSON.stringify(gestureState));
        Animated.event([
          null, { dx: this.animatedValue.x, dy: this.animatedValue.y },
        ]),
      onPanResponderRelease: (evt, gestureState) => {
        this.animatedValue.flattenOffset();
        Animated.decay(this.animatedValue, {
          deceleration: 0.997,
          velocity: { x: gestureState.vx, y: gestureState.vy }
        }).start();
      },
    })
  }
  render() {
    const animatedStyle = {
      transform: this.animatedValue.getTranslateTransform()
    }
    const { dotSize } = this.state;
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}
          onLayout={(event) => {
            var { x, y, width, height } = event.nativeEvent.layout;
            const { dotSize } = this.state;
            this.setState({
              pt1: { x: x, y: y },
              pt2: { x: width + dotSize, y: y },
              pt3: { x: x, y: height + dotSize },
              pt4: { x: width + dotSize, y: height + dotSize },
            });
          }}
        >
          <Animated.View style={[styles.circle, animatedStyle]} {...this.panResponder.panHandlers} />
        </View>
        <View style={{ position: 'absolute', height: dotSize, width: dotSize, backgroundColor: 'black', left: this.state.pt1.x, top: this.state.pt1.y }} />
        <View style={{ position: 'absolute', height: dotSize, width: dotSize, backgroundColor: 'black', left: this.state.pt2.x, top: this.state.pt2.y }} />
        <View style={{ position: 'absolute', height: dotSize, width: dotSize, backgroundColor: 'black', left: this.state.pt3.x, top: this.state.pt3.y }} />
        <View style={{ position: 'absolute', height: dotSize, width: dotSize, backgroundColor: 'black', left: this.state.pt4.x, top: this.state.pt4.y }} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 1
  },
  circle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'red'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
