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

import _ from 'lodash';
import Chart from 'react-native-chart';
import { Actions } from 'react-native-router-flux';
import theme from '../../Theme/theme';
import BottomMenu from '../ui/BottomMenu';
import StockCell  from '../ui/StockCell';
import Utils from '../../utils/Utils';
import Pie from '../ui/Pie';
import api from '../../api';

var {height, width} = Dimensions.get('window');
var chartTimer = 0;
var data = [];

export default class Strategie13fDetailView extends Component {

  constructor(props) {
      super(props);

      this.state = {
        loading: true,
        loadingStock: false,
        loadingHistory: true,
        historicalData: [[]],
        data: data,
        topHoldings: [],
        timeSpan: '6M',
        returnValue: 0
      };
  }

  componentDidMount() {
    this.refs.footer.setShow(true);

    var topHoldings = [];

    _.map(this.props.data.topHoldings, (item) => {
      if(item.percent == null)
        item.percent = 0;
      return {name: item.name, percent: item.percent, symbol: item.symbol};
    })

    var allHoldings = _.sortBy(this.props.data.topHoldings, 'percent', 'desc').map((item) =>{
      return {name: item.name, percent: item.percent, symbol: item.symbol};
    }).reverse();

    allHoldings.map((item, index)=>{
      if(index < 10)
        topHoldings.push({name: item.name, percent: item.percent, symbol: item.symbol});
    });

    this.setState({
      data: this.props.data,
      topHoldings: topHoldings,
      loading: false
    });

    this.chartTimer = setTimeout(() => {
      clearTimeout(this.chartTimer);
      this.getHistoricalData(this.state.timeSpan);
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.chartTimer);
  }

  getHistoricalData(period) {
    api.getHistory(String(this.state.data.profile.symbol), period)
    .catch((error) => {
      console.warn('ERROR', error);
      this.setState({
        historicalData: [[]],
        loadingHistory: false,
      });
    }).then((responseData) => {
      // console.warn('DATA:', responseData.data.length);
      if(responseData != undefined && responseData.data != undefined && responseData.data.length > 0) {
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

  getSummery() {
    return this.state.data.profile.summery;
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

  loadStock(symbol) {
    this.setState({
      loadingStock: true,
    });

    api.getStock(symbol)
    .catch((error) => {
      console.warn(error);
      this.setState({
        loadingStock: false,
      });
    }).then((responseData) => {
      this.setState({
        loadingStock: false
      });
      // console.warn(responseData);
      Actions.holderdetail({data:responseData});
    });
  }

  renderTopHoldings() {
    if(this.state.topHoldings != undefined && this.state.topHoldings.length > 0) {
      return(
        <View style={{paddingTop: 30, paddingBottom: 30}}>
                    
          <View style={{marginLeft:10, marginRight:20}}>
            <Text style={styles.subtitle}>Top Holdings</Text>
            <View style={{marginTop: 20}} />
            <List>
            {this.state.topHoldings.map((item)=>{
              return <StockCell 
                key={item.symbol}
                data={item}
                onPress={(symbol) => {this.loadStock(symbol.symbol);}}
              />
            })}
            </List>
          </View>

          <View style={{marginTop:20}}>
            <Button 
            transparent 
            style={{alignSelf:'center'}}
            onPress={() => {}} >Show all</Button>
          </View>

        </View>
      );
    }
  }

  renderContent() {
    if(this.state.loading) {
      return(<View style={{ flex: 1, position: 'absolute', width:width, height:height, justifyContent: 'center', alignSelf:'center'} }><Spinner style={{alignSelf:'center'}} color='black'/></View>);
      // return(<View style={{ flex: 0, alignSelf:'center', top: height * .5-100} }><Spinner color='black'/></View>);
    } else {
      return(<View style={{ flex: 0 }}>            
                <View style={{marginTop: 0, marginLeft:10, marginRight:10}}>
                    
                    <View style={{marginTop: 60}} />

                    <View style={{alignItems: 'center'}} >

                      <Title style={styles.title}>{this.state.data.profile.name}</Title>

                      {/*<Text style={styles.percentReturn}>{this.state.data.finance.revenueGrowth.fmt}</Text>*/}
                      {/*<Text style={styles.titleReturn}>Revenue Growth</Text>*/}

                      <Text style={styles.percentReturn}>{this.state.returnValue + '%'}</Text>
                      <Text style={styles.titleReturn}>{this.state.timeSpan + " return"}</Text>
                    
                    </View>

                </View>
                    <View style={{marginTop: 30}} />

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

                    <View style={{marginTop: 20}} />

                    <View style={styles.chart}>
                      {this.renderChart()}
                    </View>
                </View>

                <View style={{marginTop: 20}} />

                <View style={{paddingTop: 30, paddingBottom: 30, backgroundColor:'#ffffff'}}>
                  <View style={{marginLeft:10, marginRight:20}}>
                    <Text style={[styles.subtitle, {color:'#373737'}]}>About</Text>
                    <View style={{marginTop: 20}} />
                    <Text>{this.getSummery()}</Text>
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

                  <Col>
                    <View style={{alignItems: 'center'}} >
                      <Text>Risk Profile</Text>
                      <Text style={styles.percent}>Growth</Text>
                    </View>

                  </Col>  

                </Grid>

                <View style={{marginTop: 40}} />

                {this.renderTopHoldings()}
                
                <View style={{marginTop: 30}} />

                <View style={{marginLeft:10, marginRight:20}}>
                  <Text style={[styles.subtitle, {color:'#000000'}]}>Sector diversification</Text>
                  <View style={{marginTop: 20}} />
                  {this.renderSectorDiversification()}
                  <View>
                    
                  </View>
                </View>
                
            </View>);
    }
  }

  renderSectorDiversification() {
    // var data = [];

    // for(var i = 0; i < this.state.data.sectorsIndustries.length; i++) {
    //   var industry = [];
    //   industry.push(this.renderSectorName(this.state.data.sectorsIndustries[i].name));
    //   industry.push(this.state.data.sectorsIndustries[i].raw);
    //   data.push(industry);
    // }

    const h = 200;
    const w = 500;

    var percent = 0;
    var newData = this.state.data.sectorsIndustries.map((item) => {
      percent = item.raw;
      if(item.raw == null)
        percent = 0;
      return({number: _.ceil(percent, 2), name: item.name});
    })

    newData = Utils.sumDuplicated(newData, 'name');

    newData = _.sortBy(newData, 'number', 'desc').map((item) =>{
      return {name: item.name, number: item.number};
    }).reverse();

    return(<View style={styles.diversificationsContainer}>
              <View style={styles.pieCont}>

                <Pie
                  pieWidth={150}
                  pieHeight={150}
                  onItemSelected={() => {}}
                  colors={Utils.pieColors}
                  width={w}
                  height={h}
                  data={newData} />

            </View>

          </View>);
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

  renderSectorName(name) {
    var fullName = name.replace('_', ' ');
    return fullName.charAt(0).toUpperCase() + fullName.slice(1);
  }

  renderLoadingStock() {
    if(this.state.loadingStock) {
      return(<View style={{ flex: 1, position: 'absolute', width:width, height:height, justifyContent: 'center', alignSelf:'center'} }><Spinner style={{alignSelf:'center'}} color='black'/></View>);
    } else {
      return(<View />);
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
                lineWidth={5}
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

  renderPie() {
    if(!this.state.loadingHistory) {
      var data = this.state.historicalData;//chartData;
      return(<View style={styles.chartCont}>
              <Chart
                key="chart"
                style={styles.chart}
                data={data}
                verticalGridStep={4}
                type="line"
                lineWidth={5}
                tightBounds={true}
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

  render() {
    return (
      <Container theme={theme}>
        {/*<Header>
          <Title>SPY</Title>
        </Header>*/}


        <View style={{flex:1, marginTop:20}}>
          <Content>

            {this.renderContent()}

          </Content>

          <Button transparent 
            style={styles.backButton}
            onPress={() => {Actions.pop()}} >            
            <Icon name="md-arrow-back"></Icon>
          </Button>

          {this.renderInvestButton()}
          {this.renderLoadingStock()}

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
    // paddingTop: 30,
    fontSize: 16,
    // color: '#BCA126',
  },
  subtitle: {
    fontSize: 20,
    // color: '#ffffff',
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

  item: {
    flexDirection: 'column',
    marginBottom: 5,
    paddingHorizontal: 10
  },
  label: {
    color: '#666666',
    // flex: 1,
    fontSize: 14,
    position: 'relative',
    top: 2
  },
  data: {
    flex: 2,
    flexDirection: 'row'
  },
  dataNumber: {
    color: '#666666',
    fontSize: 11
  },
  // Bar
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 8,
    marginRight: 5
  },
  points: {
    backgroundColor: '#333333'
  },
  chartCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
},
  pieCont: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: 'black',
},
diversificationsContainer: {

},
chart: {
  // left:10,
  width: width,
  height: 150,
},
});