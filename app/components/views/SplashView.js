/**
 * @flow
 */

import React, { Component } from 'react';
import {  View, Image, Platform, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BottomMenu from '../ui/BottomMenu';

export default class SplashView extends Component {

  constructor(props) {
      super(props);
  }

  componentDidMount() {
    Actions.root();
    // this.welcomeCheck();
  }

  async welcomeCheck() {
    try {
      const value = await AsyncStorage.getItem('@welcomee');
      if (value !== null) {
        if(value == 'true') {
          if(Platform.OS == 'android') {
            setTimeout(() => {Actions.welcome()}, 10);
          } else {
            setTimeout(() => {Actions.root(), Actions.strategies()}, 1000);
          }
        }
      } else { 
        setTimeout(() => {Actions.welcome()}, 10);
      }
    } catch (error) {
      setTimeout(() => {Actions.welcome()}, 10);
    }
  }

  renderSplash() {
    if(Platform.OS == 'android') {
      return(<Image style={{width: 240, height: 200}} source={require('../../images/logo-512.png')} />);
    } else {
      return(<View />);
    }
  }
    
  render() {
    return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {this.renderSplash()}
        </View>
    );
  }
}