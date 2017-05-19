/**
 * @flow
 */

import React, { Component } from 'react';
import {  View, Image, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import { 
  Container, 
  Header, 
  Title, 
  Button, 
  Icon, 
  Content, 
  Grid,
  Col,
  Text, 
  List,
  ListItem,
  Card,
  CardItem,
  Thumbnail,
  Spinner,
  H1,H2,H3
} from 'native-base';

import { Actions } from 'react-native-router-flux';
import Chart from 'react-native-chart';
import theme from '../../Theme/theme';
import BottomMenu from '../ui/BottomMenu';
import Utils from '../../utils/Utils';

var {height, width} = Dimensions.get('window');
var api = require('../../api');
var chartTimer = 0;
var data = [];

export default class HolderDetailView extends Component {

  constructor(props) {
      super(props);

      this.state = {
        loading: true,
        data: data,
        loadingHistory: true,
        historicalData: [[]],
        timeSpan: '6M',
        returnValue: 0
      };
  }

  componentDidMount() {
    this.refs.footer.setShow(true);

    Utils.log('HOLDING',this.props.data.finance);

    this.setState({
      data: this.props.data,
      loading: false
    });

    this.chartTimer = setTimeout(() => {
      clearTimeout(this.chartTimer);
      this.getHistoricalData(this.state.timeSpan);
    }, 1000);

    return;
    api.getStock(this.props.symbol)
    .catch((error) => {
      Utils.log('ERROR', error);
    }).then((responseData) => {
      // console.warn('DATA:', responseData);
      this.setState({
        data: responseData,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    clearTimeout(this.chartTimer);
  }

  getHistoricalData(period) {
    Utils.log('getHistoricalData', this.state.data);
    api.getHistory(String(this.state.data.profile.symbol), period)
    .catch((error) => {
      Utils.log('ERROR', error);
      this.setState({
        historicalData: [[]],
        loadingHistory: false,
      });
    }).then((responseData) => {
      // console.warn('DATA:', responseData.data.length);
      if(responseData.data != undefined && responseData.data.length > 0) {
        const data = responseData.data;
        const first = data[0][1];
        const last = data[data.length-1][1];

        this.setState({
          returnValue: _.ceil((last/first)-1, 2),
          historicalData: responseData.data,
          loadingHistory: false,
        });
      } else {
        this.setState({
          historicalData: [[]],
          loadingHistory: false,
        });
      }
    });
  }

  changeChart(chart) {
    this.setState({
      loadingHistory: true,
    });

    if(this.state.loadingHistory) return;

    this.getHistoricalData(chart);

    this.setState({
      timeSpan: chart,
    });
  }

  renderContent() {
    if(this.state.loading) {
      return(<View style={{ flex: 0, alignSelf:'center', top: height * .5-100} }><Spinner color='black'/></View>);
    } else {
      return(<View style={{ flex: 0 }}>
                <View style={{marginTop: 80}} />

                <View style={{marginTop: 0, marginLeft:10, marginRight:10}}>
                    {/*<View style={{marginTop: 40}} />*/}
                    <View style={{alignItems: 'center'}} >

                      <Title style={styles.title}>{this.state.data.profile.name}</Title>

                      {/*<Text style={styles.percentReturn}>{this.state.data.finance.revenueGrowth.fmt}</Text>*/}
                      <Text style={styles.percentReturn}>{this.state.returnValue + '%'}</Text>
                      <Text style={styles.titleReturn}>{this.state.timeSpan + " return"}</Text>
                    
                    </View>

                    <View style={{marginTop: 20}} />

                    <View style={{flex:1, flexDirection: 'column', alignSelf: 'center'}}>
                      <View style={{flex:1, flexDirection: 'row', alignSelf: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}>Sector: </Text>
                        <Text style={{}}>{this.state.data.profile.sector}</Text>
                      </View>
                      <View style={{flex:1, flexDirection: 'row', alignSelf: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}>Industry: </Text>
                        <Text style={{}}>{this.state.data.profile.industry}</Text>
                      </View>
                    </View>

                    <View style={{marginTop: 30}} />
                </View>

                <View style={{marginTop: 50}} />

                <View>                        
                    <View style={styles.timeSpanGroup}>

                      <Button transparent
                        style={styles.timeSpan}
                        onPress={() => {this.changeChart('1W')}} >
                        <Text style={[this.state.timeSpan === '1W' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'1W'}</Text>
                      </Button>

                      <Button transparent
                        style={styles.timeSpan}
                        onPress={() => {this.changeChart('1M')}} >
                        <Text style={[this.state.timeSpan === '1M' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'1M'}</Text>
                      </Button>

                      <Button transparent
                        style={styles.timeSpan}
                        onPress={() => {this.changeChart('6M')}} >
                        <Text style={[this.state.timeSpan === '6M' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'6M'}</Text>
                      </Button>

                      <Button transparent
                        style={styles.timeSpan}
                        onPress={() => {this.changeChart('1Y')}} >
                        <Text style={[this.state.timeSpan === '1Y' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'1Y'}</Text>
                      </Button>

                      <Button transparent
                        style={styles.timeSpan}
                        onPress={() => {this.changeChart('2Y')}} >
                        <Text style={[this.state.timeSpan === '2Y' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'2Y'}</Text>
                      </Button>

                    </View>

                    <View style={styles.chart}>
                      {this.renderChart()}
                    </View>
                </View>

                <View style={{marginTop: 20}} />

                <View style={{paddingTop: 30, paddingBottom: 30, backgroundColor:'#ffffff'}}>
                  <View style={{marginLeft:10, marginRight:20}}>
                    <Text style={[styles.subtitle, {color:'#373737'}]}>About</Text>
                    <View style={{marginTop: 20}} />
                    <Text style={{flexWrap: 'wrap'}}>{this.state.data.profile.summery}</Text>
                  </View>
                </View>

                <View style={{marginTop: 20}} />

                <Grid>

                  <Col>

                    <View style={{alignItems: 'center'}} >
                      <Text>BID</Text>
                      <Text style={styles.percent}>{this.state.data.finance.bid || "-"}</Text>
                    </View>

                  </Col>

                  <Col>

                    <View style={{alignItems: 'center'}} >
                      <Text>ASK</Text>
                      <Text style={styles.percent}>{this.state.data.finance.ask || "-"}</Text>
                    </View>

                  </Col>

                </Grid>

                <View style={{marginTop: 20}} />

                <Grid>

                  <Col>

                    <View style={{alignItems: 'center'}} >
                      <Text>Dividend Yield %</Text>
                      <Text style={styles.percent}>{this.state.data.finance.yield || "-"}</Text>
                    </View>

                  </Col>

                  <Col>

                    <View style={{alignItems: 'center'}} >
                      <Text>Market Cap</Text>
                      <Text style={styles.percent}>{this.state.data.finance.marketCap || "-"}</Text>
                    </View>

                  </Col>

                </Grid>

                <View style={{marginTop: 20}} />

                <Grid>

                  <Col>  
                    <View style={{alignItems: 'center'}} >
                      <Text>PE Ratio</Text>
                      <Text style={styles.percent}>{this.state.data.finance.peRatio || "-"}</Text>
                    </View>

                  </Col>  

                </Grid>

            </View>);
    }
  }

  renderChart() {
    if(!this.state.loadingHistory) {
      var data = this.state.historicalData;
      return(<View style={styles.chartCont}>
              <Chart
                key="chart"
                style={styles.chart}
                data={data}
                verticalGridStep={4}
                type="line"
                lineWidth={4}
                tightBounds={false}
                yAxisUseDecimal={true}
                showAxis={false}
                showYAxisLabels={false}
                showXAxisLabels={false}
                showGrid={false}
                showDataPoint={false}
             />
          </View>);
    } else {
      return(<View style={styles.chartCont}><Spinner color='black'/></View>);
    }
  }

  renderInvestButton() {
    if(!this.state.loading) {
      return(<View style={styles.investButtonContainer}>
              <Button block style={styles.investButton}
                      onPress={() => Actions.investnow()}
              >
                Invest now
              </Button>
            </View>);
    }
  }

  render() {
    return (
      <Container theme={theme}>
        {/*<Header>
          <Title>SPY</Title>
        </Header>*/}

        <View style={{flex:1, marginTop:20/*, marginLeft: 10, marginRight: 10*/}}>
          <Content>

            {this.renderContent()}

          </Content>
          
          <Button transparent 
            style={styles.backButton}
            onPress={() => {Actions.pop()}} >
            
            <Icon name="md-arrow-back"></Icon>
          </Button>

          {this.renderInvestButton()}

          <BottomMenu current="strategies" ref="footer" />
        </View>
          

     </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    flex:1,
    position: 'absolute',
    top: 10, 
    left: 10
  },
  timeSpanGroup: {
    flex: 1,
    flexDirection: 'row',
    height: 40
  },
  timeSpan: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSpanText: {
    fontSize: 12,
    color: 'black',
    marginTop: 10,
  },
  timeSpanSelectedText: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
  },
  chart: {
    flex: 4,
  },
  image: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    color: '#000000',
    fontWeight: '400',
    paddingTop: 30,
    lineHeight: 35,
    textAlign: 'center'
  },
  percentReturn: {
    paddingTop: 30,
    fontSize: 40,
    color: '#BCA126',
  },
  titleReturn: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '500',
  },
  summeryText: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '300',
  },
  percent: {
    paddingTop: 10,
    fontSize: 24,
    color: '#1C5589',
    fontWeight: '300',
  },
  chartCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
  },
  chart: {
    // left:10,
    flex: 0,
    width: width,
    height: 150,
  },
  investButtonContainer: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    width: width - 80,
    // bottom: 0,
    top: 65, 
    left: 40
  },
  investButton: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    width: width - 60,
    left: 10,
  },
});