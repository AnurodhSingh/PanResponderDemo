import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
type Props = {};
export default class DummyScreen extends Component<Props> {
  constructor(props){
    super(props);
    this.state={
        item: this.props.navigation.state.params.item
    }
  }
  componentWillMount() {
    
  }
  render() {
    const {item} = this.state;
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <TouchableOpacity 
            onPress={()=>{
                this.props.navigation.goBack()
            }}
            style={{flex:1,backgroundColor:'green',margin:10,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:30}}>{item}</Text>
        </TouchableOpacity>
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
