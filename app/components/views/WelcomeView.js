import React, { Component } from 'react';
import { AppRegistry, Alert, AsyncStorage } from 'react-native';
import AppIntro from 'react-native-app-intro';
import { Actions } from 'react-native-router-flux';

export default class WelcomeView extends Component {
  onSkipBtnHandle = (index) => {
    // Alert.alert('Skip');
    // console.log(index);
    this.welcomeShown();
    Actions.root({scene: 'online'});
    // Actions.root({scene: 'online'});
    // setTimeout(()=> {Actions.root({scene: 'strategies'})}, 500);
  }
  doneBtnHandle = () => {
    // Alert.alert('Done');
    this.welcomeShown();
    Actions.root({scene: 'online'});
    // setTimeout(()=> {Actions.root({scene: 'strategies'})}, 200);
  }
  nextBtnHandle = (index) => {
    // Alert.alert('Next');
    // console.log(index);
  }
  onSlideChangeHandle = (index, total) => {
    console.log(index, total);
  }

  async welcomeShown(){
    try {
      await AsyncStorage.setItem('@welcome', 'true');
    } catch(error) {
      // console.warn('welc', error);
    }
  }

  render() {
    const pageArray = [{
      title: 'Welcome!',
      description: 'Definir texto.',
      img: require('../../images/logo-f-g-a.png'),
      imgStyle: {
        height: 256,
        width: 256,
      },
      backgroundColor: '#f8f8f8',
      fontColor: '#000000',
      level: 10,
    }, {
      title: 'Invest',
      description: 'Otro texto',
      img: require('../../images/logo-f-g-a.png'),
      imgStyle: {
        height: 256,
        width: 256,
      },
      backgroundColor: '#f8f8f8',
      fontColor: '#000000',
      fontFamily: 'Verdana',
      level: 10,
    }];
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        activeDotColor='#000000'
        dotColor='#cccccc'
        rightTextColor='#000000'
        leftTextColor='#000000'
        pageArray={pageArray}
      />
    );
  }
}
