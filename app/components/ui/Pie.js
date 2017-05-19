// @flow
'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ART,
  LayoutAnimation,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';

import _ from 'lodash';
import { Container, Content, List, ListItem } from 'native-base';

const {
  Surface,
  Group,
  Rectangle,
  Shape,
} = ART;

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
import AnimShape from './AnimShape';
import Utils from '../../utils/Utils';

const d3 = {
  scale,
  shape,
};

import {
    scaleBand,
    scaleLinear
} from 'd3-scale';

type Props = {
  height: number,
  width: number,
  pieWidth: number,
  pieHeight: number,
  colors: any,
  onItemSelected: any
};

type State = {
  highlightedIndex: number,
};

class Pie extends React.Component {

  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { highlightedIndex: 0 };
    this._createPieChart = this._createPieChart.bind(this);
    this._value = this._value.bind(this);
    this._label = this._label.bind(this);
    this._color = this._color.bind(this);
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
  }

  // methods used to tranform data into piechart:
  // TODO: Expose them as part of the interface
  _value(item) { return _.ceil(item.number, 2); }

  _label(item) { 

    return item.name.replace('_', ' ').toUpperCase(); 
  }

  _color(index) { 
    return Utils.getColorFromString(index); 
    // return Utils.pieColors[index]; 
  }

  _createPieChart(index, name) {

    var arcs = d3.shape.pie()
        .value(this._value)
        (this.props.data);

    var hightlightedArc = d3.shape.arc()
      .outerRadius(this.props.pieWidth/2 + 10)
      .padAngle(.05)
      .innerRadius(30);

    var arc = d3.shape.arc()
      .outerRadius(this.props.pieWidth/2)
      .padAngle(.05)
      .innerRadius(30);

    var arcData = arcs[index];
    var path = (this.state.highlightedIndex == index) ? hightlightedArc(arcData) : arc(arcData);

     return {
       path,
       color: this._color(name),
     };
  }

  _onPieItemSelected(index) {
    this.setState({...this.state, highlightedIndex: index});
    this.props.onItemSelected(index);
  }

  render() {
    const margin = styles.container.margin;
    const x = this.props.pieWidth / 2 + margin + 85;
    const y = this.props.pieHeight / 2 + margin ;

    return (
      <View>
        <View width={this.props.width} height={this.props.height}>
          <Surface width={this.props.width} height={this.props.height}>
             <Group x={x} y={y}>
             {
                this.props.data.map( (item, index) =>
                (<AnimShape
                   key={'pie_shape_' + index}
                   color={this._color(item.name)}
                   d={ () => this._createPieChart(index, item.name)}
                />)
                )
              }
             </Group>
          </Surface>
          </View>
          {/*<View style={{position: 'absolute', top:margin, left: 2*margin + this.props.pieWidth}}>*/}
          <ScrollView style={styles.scroller}>
            <View style={styles.categories}>
              {
                this.props.data.map( (item, index) =>
                {
                  var fontWeight = this.state.highlightedIndex == index ? 'bold' : 'normal';
                  return (
                    <ListItem key={index} onPress={() => this._onPieItemSelected(index)}>
                      
                        <View style={{flex: 0, flexDirection: 'row', alignItems: 'center', height: 20}}>
                          <View style={[styles.itemColor, {backgroundColor: this._color(item.name)}]}/>
                          <Text style={[styles.label, {fontWeight: fontWeight}]}>{this._label(item)}: {this._value(item)}%</Text>
                        </View>

                    </ListItem>
                  );
                })
              }
            </View>
          </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    margin: 20,
  },
  label: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'normal',
  },
  scroller: {
    flex: 0,
    height: 220,
    marginLeft: -20,
    marginRight: 100
  },
  categories: {
    flex: 0,
    // width: 600,
    // height: 200,
    // backgroundColor: '#000000',
  },
  itemColor:{
    width:10,
    height:10,
    marginTop: 5,
    marginRight: 5,

  }
};

export default Pie;