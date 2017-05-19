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
import Utils from '../../utils/Utils';

export default class StockCell extends Component {

  constructor(props) {
      super(props);
  }

  componentDidMount() {
    // Utils.log('STOCK CELL', this.props);
  }

  render() {
    // Utils.log('KEY ' + this.props.data.symbol);

    var key = "";
    key = this.props.data.symbol.toString();
    var percent = 0;
    if(isNaN(this.props.data.percent))
      percent = this.props.data.percent.raw;
    else
      percent = this.props.data.percent;

    percent = Math.round(percent * 100) / 100;

    return (
      <ListItem key={key}>
        <TouchableHighlight
         underlayColor={'transparent'}
         activeOpacity={0.4}
         onPress={() => {
            this.props.onPress({symbol:this.props.data.symbol});
        }}>
          <View style={{flex: 1}}>
            <View style={{flexDirection:'row', justifyContent: 'space-between', top:5,}} >
              <Text style={{color:'#114fff', fontSize: 14}} >{this.props.data.symbol || ""}</Text>
              <Text style={{color:'#000000', fontSize: 12, fontWeight: '300'}} ellipsizeMode="tail" >{this.props.data.name || ""}</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize: 12, color: percent > 0 ? '#009900' : '#990000', right:20}} >{percent + '%'}</Text>
                <Icon style={{fontSize: 12, color:'#000000'}} name="ios-arrow-forward" />
              </View>
            </View>
            {/*<Text style={{fontSize:12}}>{this.props.desc}</Text>*/}
          </View>
          
        </TouchableHighlight>

      </ListItem>
    );
  }
}