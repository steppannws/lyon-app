/**
 * @flow
 */

import React, { Component } from 'react';
import {  View, Image, Alert, StyleSheet } from 'react-native';
import { 
  Container, 
  Header, 
  Title, 
  Button, 
  Icon, 
  Content, 
  Badge, 
  Text, 
  Footer, 
  List,
  ListItem,
  InputGroup,
  Input,
  Picker,
  Item
} from 'native-base';

import { Actions } from 'react-native-router-flux';
import PopupDialog from 'react-native-popup-dialog';
import theme from '../../Theme/theme';
import BottomMenu from '../ui/BottomMenu';

import api from '../../api';

export default class AllHoldingsView extends Component {

  constructor(props) {
      super(props);

      this.state = {};
  }

  componentDidMount() {
    this.refs.footer.setShow(false);
    var t = this;
  }

  render() {
    return (
      <Container theme={theme}>
        <View style={{flex:1}}>

          <View style={{flex:1}}>
              <Content>
              <View style={{flex:1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: 100,
                marginBottom: 50,
                marginRight: 40,
                marginLeft: 40,
              }} >

              <Text>Complete your information and we'll contact you with broker.</Text>

              </View>  


              </Content>
          </View>
        
          <BottomMenu current="demo" ref="footer" />
        </View>

     </Container>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    flex:1,
    position: 'absolute',
    top: 30, 
    left: 10
  }
});