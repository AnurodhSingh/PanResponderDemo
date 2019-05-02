import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, PanResponder, Animated} from 'react-native';
const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
type Props = {};
export default class FuildTransitionComponent extends Component<Props> {
  constructor(props){
    super(props);
    this.state={

    }
  }
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        alert(evt);
      },
      onPanResponderMove:
        Animated.event([
        ]),
      onPanResponderRelease: (evt, gestureState) => {
      
      },
    })
  }
  _renderItems(item) {
      return(
        <TouchableOpacity 
            onLayout={(event) => {
                var { x, y, width, height } = event.nativeEvent.layout;
                console.dir(event);
            }}
            onPress={(event)=>{
                const { pageX, pageY } = event.nativeEvent;
                this.props.navigation.navigate('DummyScreen',{item,isFluid: true, posX: pageX, posY: pageY})
            }}
            style={{height:100,margin:10,flex:1,backgroundColor:'green',borderWidth:1, alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:30}}>{item}</Text>
        </TouchableOpacity>
      );
  }
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={{flex:1}} {...this.panResponder.panHandlers} >
          <FlatList
            style={{flex:1}}
            numColumns={2}
            data={data}
            keyExtractor={({item, index})=>index}
            renderItem={({item,index})=>this._renderItems(item)}
          />
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
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth:1
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
