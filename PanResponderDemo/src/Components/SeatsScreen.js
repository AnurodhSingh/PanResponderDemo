import React, { Component } from 'react';
import {
  Easing,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  Text,
  View,
  StyleSheet,
  Alert
} from 'react-native';
import Seat from './Seat';
const { width, height } = Dimensions.get('window');

const ROWS = 5;
const COLS = 5;
const TIMING = 600;
const TEXT_HEIGHT = 20;
let seats = [];
let seatsAnimation = [];

for (var i = 0; i < ROWS + COLS - 1; i++) {
  seatsAnimation.push(i);
}

Array(ROWS * COLS).join(' ').split(' ').map((_, i) => {
  const currentIndex = i % COLS + Math.floor(i / COLS) % ROWS;
  const currentItem = {
    label: i + 1 < 10 ? '0' + (i + 1) : i + 1,
    s: .4,
    key: i,
    animated: new Animated.Value(1)
  };

  seats.push(currentItem);
});

export default class Seats extends Component {
  constructor(props){
      super(props);
      this.state = {
          finished: false,
          selectedItems: []
      };
      this.selectionAnimation = new Animated.Value(0);
      this.animatedValue = [];
      seatsAnimation.forEach(value => {
      this.animatedValue[value] = new Animated.Value(0);
      });
  }
  selected(index){
    let selected = this.state.selectedItems;
    selected.push(index);
    this.setState({selectedItems:selected})
  }
  deselected(index){
    let selected = this.state.selectedItems;
    selected.splice(selected.indexOf(index),1);
    this.setState({selectedItems:selected})
  }
  render() {
    let {selectedItems} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={COLS}
          extraData={this.state.selectedItems}
          data={seats}
          renderItem={({item})=>{
            return(
              <Seat item={item} selected={(index)=>this.selected(index)} deselected={(index)=>this.deselected(index)}/>
            );
          }}
        /> 
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
          <Text>
            Selected Seats =
          </Text>
          {
            selectedItems.map((item,index)=>{
              return(
                <Text>
                  {item},
                </Text>
              )
            })
          }
        </View>
        <View>
          <Text
            onPress={()=>this.props.navigation.navigate("GameScreen")}
          >
            selected Seats = {selectedItems.length}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
});