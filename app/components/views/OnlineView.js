/**
 * @flow
 */

import React, { Component } from 'react';
import {  View, WebView, Dimensions } from 'react-native';
import { Container, Header, Title, Button, Icon, Content, Badge, Text, Footer, Spinner} from 'native-base';
import theme from '../../Theme/theme';
import BottomMenu from '../ui/BottomMenu';

const {height, width} = Dimensions.get('window');

export default class OnlineView extends Component {

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
            source={{uri: 'https://account.lyon-is.com'}}
*/}
          <WebView
            showsHorizontalScrollIndicator={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: 'https://account.lyon-is.com/login/?system=Live&username=&RedirectTo=%2FWebConnect%2FDefault.aspx&error=16'}}
            style={{flex:1, marginTop: 20}}
            onLoad={() => {
              this.setState({
              loaded: true,
            });}}
          />
          <BottomMenu current="online" ref="footer" />
          
        </View>

     </Container>
    );
  }
}