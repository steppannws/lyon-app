/**
 * @flow
 */

import React, { Component } from 'react';
import {  View, Image, StyleSheet, Platform, AsyncStorage} from 'react-native';
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux';
import theme from './Theme/theme';
import SplashView from './components/views/SplashView';
import WelcomeView from './components/views/WelcomeView';
import OnlineView from './components/views/OnlineView';
import TraderView from './components/views/TraderView';
import StrategiesView from './components/views/StrategiesView';
import StrategieDetailView from './components/views/StrategieDetailView';
import Strategie13fDetailView from './components/views/Strategie13fDetailView';
import HolderDetailView from './components/views/HolderDetailView';
import DemoView from './components/views/DemoView';
import InvestNowView from './components/views/InvestNowView';

const reducerCreate = params => {
    const defaultReducer = Reducer(params);
    return (state, action) => {
      if(action.scene != undefined) {
        switch(action.scene) {
          case 'online':
            setTimeout(() => {
                Actions.online();
              }, 10);
            break;
            // case 'strategiedetail':
            //   var data = {data:action.data};
            //   Actions.strategiedetail(data);
            //   break;
        }
      }
        // console.warn("ACTION:", action);
        // console.warn("ACTION:", action.data);
        return defaultReducer(state, action);
    }
};

export default class App extends Component {

  constructor(props) {
      super(props);
  }
    
  render() {
    return (
      <Router createReducer={reducerCreate} hideNavBar={true} panHandlers={null}>
        <Scene key="splash" component={SplashView} initial={true} />
        <Scene key="welcome" component={WelcomeView} />

        <Scene key="root" type="push" panHandlers={null}>
          <Scene key="tab" type="push"  tabs={true} tabBarStyle={styles.tabBar} panHandlers={null}>
            
            {/*<Scene key="strategies" component={StrategiesView} hideNavBar={true} hideTabBar={true} />*/}

            <Scene key="strategies" >
              <Scene key="strategieslist" component={StrategiesView} hideNavBar={true} hideTabBar={true} />
              <Scene key="strategiedetail" component={StrategieDetailView} hideNavBar={true} hideTabBar={true} />
              <Scene key="strategie13fdetail" component={Strategie13fDetailView} hideNavBar={true} hideTabBar={true} />
              <Scene key="holderdetail" component={HolderDetailView} hideNavBar={true} hideTabBar={true} />
              <Scene key="investnow" component={InvestNowView} hideNavBar={true} hideTabBar={true} direction="vertical"/>
            </Scene>

            <Scene key="online" component={OnlineView} hideNavBar={true} hideTabBar={true} />
            <Scene key="trader" component={TraderView} hideNavBar={true} hideTabBar={true} />
            <Scene key="demo" component={DemoView} hideNavBar={true} hideTabBar={true} />

          </Scene>

        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    // marginBottom: 5,
  },
  tabBar: {
    flex:1,
    height: 75,
    backgroundColor: 'green',
  },
  menuSection : {
    height: 60,
    paddingTop: 5,
  },
});