/**
 * @flow
 */

import React, { Component } from 'react';
import {  View, WebView,  Dimensions} from 'react-native';
import { Container, Header, Title, Button, Icon, Content, Badge, Text, Footer, Spinner} from 'native-base';
import theme from '../../Theme/theme';
import BottomMenu from '../ui/BottomMenu';

const {height, width} = Dimensions.get('window');

export default class TraderView extends Component {

  constructor(props) {
      super(props);

      this.state = {
        loaded: false
      }
  }

  componentDidMount() {
    this.refs.footer.setShow(true);
    var t = this;
    // setTimeout(function() {t.refs.footer.setShow(false)}, 5000);
  }

  renderLoading() {
    if(!this.state.loaded) {
      return(<View style={{ flex: 1, alignSelf:'center', top: height * .5-100}}><Spinner color='black'/></View>);
    } else {
      return(<View />);
    }
  }

  render() {
    return (
      <Container theme={theme}>

        <View style={{flex:1}}>

          {this.renderLoading()}
          {/*
            source={{uri: 'https://trader.lyon-is.com'}}
          */}
          <WebView
            showsHorizontalScrollIndicator={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: 'https://trader.lyon-is.com/Login/?ReturnUrl=%2f'}}
            style={{flex:1, marginTop: 20}}
            onLoad={() => {
              this.setState({
              loaded: true,
            });}}
          />

          <BottomMenu current="trader" ref="footer" />
        </View>

     </Container>
    );
  }
}