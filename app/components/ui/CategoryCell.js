/**
 * @flow
 */

import React, { Component } from 'react';
import {  View, Image, TouchableHighlight } from 'react-native';
import { 
  Container, 
  Header, 
  Title, 
  Button, 
  Icon, 
  Content, 
  Text, 
  List,
  ListItem,

} from 'native-base';

import { Actions } from 'react-native-router-flux';

// import theme from '../../Theme/theme';

export default class CategoryCell extends Component {

  constructor(props) {
      super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <ListItem>
        <TouchableHighlight
         underlayColor={'transparent'}
         activeOpacity={0.4}
         onPress={() => {
            // Actions.strategiedetail({symbol:this.props.symbol});
            this.props.onPress(this.props);
        }}>

          <View style={{flex: 1, }}>
            <View style={{flexDirection:'row', justifyContent: 'space-between', top:5,}} >
              <Text>{this.props.title}</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={{color: this.props.percent > 0 ? 'green' : 'red', right:20}} >{this.props.percent > 0 ? '+' : ''}{this.props.percent + '%'}</Text>
                <Icon name="ios-arrow-forward" />
              </View>
            </View>
            <Text style={{fontSize:12}}>{this.props.desc}</Text>
          </View>
          
        </TouchableHighlight>

      </ListItem>
    );
  }
}