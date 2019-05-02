import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Animated, Easing, PanResponder, TextInput, NativeModules, requireNativeComponent,NativeComponent,Dimensions} from 'react-native';

let {height, width} = Dimensions.get('window');
let inputRangeArray = [0];
let outputRangeArrayX = [0];
let outputRangeArrayY = [0];
let counter=1;
let timeDifference=0;

type Props = {};
export default class CopyJutsuComponent extends Component<Props> {
  constructor(props){
    super(props);
    this.state={
      message: '',
      show:true,
      drawArray:[],
      showDots:false,
    }
    this.animatedValue = new Animated.Value(0);
  }
  animate(){
    let showTimedifference = timeDifference/(counter-2);
    let counter=0;
    let interval = setInterval(() => {
      this.setState({drawArray:outputRangeArrayX.slice(0,counter+1)})
      counter++;
    }, showTimedifference);
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: timeDifference,
        easing: Easing.linear
      }
    ).start(()=>{
      this.setState({motionStart:false});
      inputRangeArray = [0];
      outputRangeArrayX = [0];
      outputRangeArrayY = [0];
      counter = 1;
      clearInterval(interval);
    });
  }
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        timeDifference=new Date().getTime();
        this.animatedValue.setValue(0);
        inputRangeArray = [0];
        outputRangeArrayX = [0];
        outputRangeArrayY = [0];
        counter=1;
      },
      onPanResponderMove: (evt, gestureState) => {
        outputRangeArrayX[counter]=gestureState.moveX;
        outputRangeArrayY[counter]=gestureState.moveY;
        counter++;
      },
      onPanResponderRelease: (evt, gestureState) => {
        timeDifference = new Date().getTime()- timeDifference
        let offset = 1/(counter-1)
        let i;
        for(i=1;i<(counter-1);i++){
          inputRangeArray[i]= offset*i;
        }
        inputRangeArray[i]=1;
        if(counter==1){
          outputRangeArrayX[1]=0;
          outputRangeArrayY[1]=0;
        }
        else{
          outputRangeArrayX[0]=outputRangeArrayX[1];
          outputRangeArrayY[0]=outputRangeArrayY[1];
        }

        // console.log(counter);
        // console.log("outputRangeArrayX",outputRangeArrayX);
        // console.log("outputRangeArrayY",outputRangeArrayY);
        // console.log("inputRangeArray",inputRangeArray);

        this.animate();
        this.setState({motionStart:true});
      },
    })
  }

  callNativeMethod(){
    // console.log(requireNativeComponent('NativeAlert'));
    console.log("nativeMessageText",NativeModules.NativeAlert);
    NativeModules.NativeAlert.setMessage(this.state.message);
    this.setState({show:false},()=>{
      this.setState({show:true})
    })
  }

  showTrail(){
    let { drawArray } = this.state;
    console.log("showTrail",drawArray.length);
    return(
      drawArray.map((object,index)=>{
        return(
          <View key={index} style={[styles.circle,{position:'absolute'}, {left:outputRangeArrayX[index]},{top:outputRangeArrayY[index]}]}></View>
        )
      })
    );
  }

  pan() {
  let left=0;
  let top=0;
  if(this.state.motionStart){
    left = this.animatedValue.interpolate({
      inputRange: inputRangeArray,
      outputRange: outputRangeArrayX
    });
    top = this.animatedValue.interpolate({
      inputRange: inputRangeArray,
      outputRange: outputRangeArrayY
    });
  }
    
  return(
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.container}>
        <View style={{flex:1,backgroundColor:'rgb(220,219,205)'}} {...this.panResponder.panHandlers}>
          <Text style={styles.welcome}
            onPress={()=>this.setState({showDots:!this.state.showDots})}
          >  
            {'Draw Something'}
          </Text>
        </View>
      </View>
      <View style={{flex:1,backgroundColor:'rgb(200,181,168)'}}>
        {/* {this.state.motionStart &&
          this.showTrail()
        } */}
        {this.state.showDots && this.showTrail()}
        {this.state.motionStart &&
          <Text style={styles.welcome}>  
            {'Copy Jutsu'}
          </Text>
        }
        {this.state.motionStart &&
          <Animated.View style={[styles.circle, {left},{top}]}> 
          </Animated.View>
        }
      </View>
    </SafeAreaView>
    );
  }
  
  render() {
    return (this.pan());
  }
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'red'
  },
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black'
  },
  welcome: {
    position:'absolute',
    left: (width/2)-90,
    width:180,
    fontSize: 20,
    fontWeight:'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: 'black'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


