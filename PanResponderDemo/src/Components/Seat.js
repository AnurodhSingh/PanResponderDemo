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

const ROWS = 5;
const COLS = 5;
const TIMING = 600;
const TEXT_HEIGHT = 20;

export default class Seat extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        finished: false,
        selectedItems: []
      };  
      this.selectionAnimation = new Animated.Value(0);
      this.animatedValue = new Animated.Value(0);
    }
  
    animate = () => {
      Animated.sequence([
        Animated.stagger(TIMING * 0.15, animations)
      ]).start(() => {
        this.setState({
          finished: !this.state.finished,
          selectedItems: []
        });
  
        Animated.timing(this.selectionAnimation, {
          toValue: 0,
          duration: 1000,
          easing: Easing.elastic(1.3)
        }).start();
      });
    };
  
    render(){
      let item = this.props.item;
      const index = item.key;
      const label = item.label;
      const scale = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0, 1]
      });
      const { selectedItems } = this.state;
      const isSelected = selectedItems.includes(item.key);
      const itemPressScale = item.animated.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0, 1]
      });
  
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            opacity: 1 - parseInt(item.s) / 15
          }}
          onPress={() => {
            if(!isSelected){
              this.props.selected(label);
            }
            else{
              this.props.deselected(label);
            }
            const selected = isSelected ? 
              selectedItems.filter(i => i !== item.key)
              : 
              [...selectedItems, item.key];
  
            item.animated.setValue(0);
            this.setState({selectedItems: selected},() => {
              Animated.parallel([
                Animated.timing(this.selectionAnimation, {
                  toValue: -TEXT_HEIGHT * selected.length,
                  duration: 500,
                  easing: Easing.elastic(1.3)
                }),
                Animated.timing(item.animated, {
                  toValue: 1,
                  duration: 200
                })
              ]).start();
            });
          }}>
          <Animated.View
            style={{
              transform: [
                {
                  scale: item.animated
                }
              ]
            }}>
            <Animated.View
              style={[
                {
                  backgroundColor: isSelected ? '#8EF0E7' : '#3493FF',
                },
                styles.item,
                {
                  transform: [
                    {
                      scale
                    }
                  ]
                }
              ]}>
              <Animated.Text style={[styles.itemText]}>
                {item.label}
              </Animated.Text>
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
      );
    };
  }
  const styles = StyleSheet.create({
    item: {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center'
    },
    itemText: {
      color: 'white',
      fontWeight: '700',
    },
    text: { 
      fontSize: 15, 
      fontWeight: '500' }
  });