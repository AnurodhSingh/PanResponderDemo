import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Easing, Animated, SafeAreaView, TouchableOpacity} from 'react-native';

type Props = {};
export default class RotationAnimationComponent extends Component<Props> {
  constructor(props){
    super(props);
    this.state={
      ClockWise: false,
      stop:false,
    };
    this.spinValue = new Animated.Value(0);
  }
  componentDidMount () {

  }
  spinClockWise(){
    let { ClockWise, stop } = this.state;
    if(!ClockWise){
      this.spinValue = new Animated.Value(0);
      this.setState({ ClockWise: true, stop:false});
      this.spin();
    }
  }
  spinAntiClockWise(){
    let { ClockWise, stop } = this.state;
    if(ClockWise){
      this.spinValue = new Animated.Value(0);
      this.setState({ ClockWise: false, stop:false});
      this.spin();
    }
  }
  spin () {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start(()=>{
      this.spin();
    });
  }
  stop(){
    this.spinValue = new Animated.Value(0);
    this.setState({stop:true});
  }
  render() {
    let { ClockWise, stop } = this.state;
    let spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', ClockWise ? '360deg' : '-360deg']
    })
    if(stop){
      spin="0deg";
    }
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
        <Animated.View
          style={{
            width: 50,
            height: 50,
            backgroundColor:'red',
            transform: [{rotate: spin}] 
          }}
        />
        <TouchableOpacity style={{backgroundColor:'grey', margin:20, padding:10}}
          onPress={()=>this.spinClockWise()}
        >
          <Text>
            ClockWise
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'grey', margin:20, padding:10}}  
          onPress={()=>this.spinAntiClockWise()}
        >
          <Text>
            Anti ClockWise
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'grey', margin:20, padding:10}}  
          onPress={()=>this.stop()}
        >
          <Text>
            Stop
          </Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex:1,
  },  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
