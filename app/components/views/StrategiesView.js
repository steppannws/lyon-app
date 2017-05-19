/**
 * @flow
 */

import React, { Component } from 'react';
import {  View, Image, TouchableHighlight, Dimensions } from 'react-native';
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
  Spinner
} from 'native-base';

import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import theme from '../../Theme/theme';
import Utils from '../../utils/Utils';
import BottomMenu from '../ui/BottomMenu';
import CategoryCell from '../ui/CategoryCell';

var {height, width} = Dimensions.get('window');
var api = require('../../api');
const data = [];

export default class StrategiesView extends Component {

  constructor(props) {
      super(props);

      this.state = {
        data: data,
        loading: true,
        loadingStrategie: false
      };
  }

  componentDidMount() {
    this.refs.footer.setShow(true);

    api.getStrategies()
    .catch((error) => {
      Utils.log('getStrategies ERROR', error);
      this.setState({
        loading: false,
      });
    }).then((responseData) => {
      Utils.log('DATA:', responseData);
      this.setState({
        data: responseData,
        loading: false,
      });
    });
  }

  loadStrategie(item) {
    this.setState({
      loadingStrategie: true,
    });

    switch(item.type) {
      case 'etf':
        api.getEtf(item.symbol)
        .catch((error) => {
          console.warn(error);
          this.setState({
            loadingStrategie: false,
          });
        }).then((responseData) => {
          this.setState({
            loadingStrategie: false
          });
          Actions.strategiedetail({data:responseData});
        });
        break;
      case '13f':
        api.get13f(item.data.symbol, item.data.wid)
        .catch((error) => {
          Utils.log('13f ERROR', error);
          this.setState({
            loadingStrategie: false,
          });
        }).then((responseData) => {
          this.setState({
            loadingStrategie: false
          });

          // Utils.log('13f', responseData);

          if(responseData.error == undefined)
            Actions.strategie13fdetail({data:responseData});
          else {
            Utils.showAlert('Error', responseData.error.name, () => {});
          }
        });
        break;
    }
 
  }

  renderLoadingStrategie() {
    if(this.state.loadingStrategie) {
      return(<View style={{ flex: 1, position: 'absolute', width:width, height:height, justifyContent: 'center', alignSelf:'center'} }><Spinner style={{alignSelf:'center'}} color='black'/></View>);
    }
  }

  renderContent() {
    if(this.state.loading) {
      return(<View style={{ flex: 1, position: 'absolute', width:width, height:height, justifyContent: 'center', alignSelf:'center'} }><Spinner style={{alignSelf:'center'}} color='black'/></View>);
    } else {
      return(<List>
                  {this.state.data.map((item)=>{
                    return <CategoryCell 
                      data={item}
                      key={item.id}
                      title={item.title}
                      desc={item.desc}
                      percent={item.percent}
                      type={item.type}
                      symbol={item.symbol}
                      onPress={(item) => {this.loadStrategie(item);}}
                    />
                  })}
              </List> );
    }
  }

  render() {
    return (
      <Container theme={theme}>

        <View style={{flex:1, marginTop:20}}>
            <Content>

            {this.renderContent()}

            </Content>
            {this.renderLoadingStrategie()}
            {/*<View style={{ flex: 1, position: 'absolute', width:width, height:height, justifyContent: 'center'} }><Spinner color='black'/></View>*/}
            <BottomMenu current="strategies" ref="footer" />
        </View>
          

     </Container>
    );
  }
}