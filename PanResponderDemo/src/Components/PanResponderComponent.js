import React, { Component } from 'react';
import { Dimensions, StyleSheet, Easing, View, Animated, PanResponder, SafeAreaView } from 'react-native';
const{width, height} = Dimensions.get("window");
import scale, { verticalScale } from './../utils/scale';

console.log(width+ "  " + height);
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
      activeOpacity:1
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
        this.setState({activeOpacity:0.6});
        this.animatedValue.setOffset(this._value);
        this.animatedValue.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove:
        Animated.event([
          null, { dx: this.animatedValue.x, dy: this.animatedValue.y },
        ]),
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({activeOpacity:1});
        console.log('gestureState',gestureState)
        console.log('gestureState moveY',gestureState.moveY);
        console.log('gestureState x0',gestureState.x0);
        console.log('gestureState dx',(gestureState.dx));
        console.log('width',(width/2));
        let screen_width = 0;
        screen_width = (gestureState.x0<=200 && gestureState.moveX >= (width/2)) ? width-scale(100) : 0 ;
        screen_width = (gestureState.x0>=200 && gestureState.moveX <= (width/2)) ? -width+scale(100) : screen_width ;
        console.log('minus',(screen_width));
        this.animatedValue.flattenOffset();
        if(gestureState.moveX != 0){
          if(gestureState.moveX <= (width/2)){
            console.log("left")
            if(gestureState.moveY<=100){
              this.animatedValue.setValue({ x: gestureState.dx - (screen_width) , y: gestureState.dy});
              this.animatedValue.setOffset({ x: 0 , y: 20});
            }
            else if(gestureState.moveY>=800){
              this.animatedValue.setValue({ x: gestureState.dx - (screen_width) , y: gestureState.dy});
              this.animatedValue.setOffset({ x: 0 , y: 700});
            }
            else{
              this.animatedValue.setValue({ x: gestureState.dx - (screen_width), y: 0});
              this.animatedValue.setOffset({ x: 0 , y: gestureState.moveY - scale(60)});
            }
          }
          else{
            console.log("right")
            if(gestureState.moveY<=100){
              this.animatedValue.setValue({ x: gestureState.dx - (screen_width), y: gestureState.dy})
              this.animatedValue.setOffset({ x: width-scale(100) , y: 20});
            }
            else if(gestureState.moveY>=800){
              this.animatedValue.setValue({ x: gestureState.dx - screen_width, y: gestureState.dy})
              this.animatedValue.setOffset({ x: width-scale(100) , y: 700});
            }
            else{
              this.animatedValue.setValue({ x: gestureState.dx - screen_width, y: 0})
              this.animatedValue.setOffset({ x: width-scale(100) , y: gestureState.moveY - scale(60)});
            }
          }
          Animated.timing(
            this.animatedValue,
            {
              toValue: 1,
              duration: 200,
              easing: Easing.linear
            }
          ).start();
        }
        else{
          alert("clicked")
        }
        // Animated.decay(this.animatedValue, {
        //   deceleration: 0.997,
        //   velocity: { x: gestureState.vx, y: gestureState.vy }
        // }).start();

      },
    })
  }
  render() {
    const animatedStyle = {
      transform: this.animatedValue.getTranslateTransform()
    }
    const { dotSize, activeOpacity } = this.state;
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}
          onLayout={(event) => {
            var { x, y, width, height } = event.nativeEvent.layout;
            const { dotSize } = this.state;
            this.setState({
              pt1: { x: x, y: y },
              pt2: { x: width + (dotSize/2), y: y },
              pt3: { x: x, y: height + (dotSize/2) },
              pt4: { x: width + (dotSize/2), y: height + (dotSize/2) },
            });
          }}
        >
        <Animated.View 
          style={[
            styles.circle, 
            animatedStyle, 
            {opacity: activeOpacity}
          ]} 
          {...this.panResponder.panHandlers} 
        >
        </Animated.View>
        </View>
        <View style={{ position: 'absolute', height: dotSize, width: dotSize, backgroundColor: 'black', left: this.state.pt1.x, top: this.state.pt1.y }} >
        
        </View>
        <View style={{ position: 'absolute', height: dotSize, width: dotSize, backgroundColor: 'black', left: this.state.pt2.x, top: this.state.pt2.y }} >

        </View>
        <View style={{ position: 'absolute', height: dotSize, width: dotSize, backgroundColor: 'black', left: this.state.pt3.x, top: this.state.pt3.y }} >

        </View>
        <View style={{ position: 'absolute', height: dotSize, width: dotSize, backgroundColor: 'black', left: this.state.pt4.x, top: this.state.pt4.y }} >

        </View>
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
    backgroundColor: '#F5FCFF',
    borderWidth: 1
  },
  circle: {
    height: width/5,
    width: width/5,
    borderRadius: width/10,
    backgroundColor: 'red'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
