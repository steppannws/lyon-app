/**
 * @flow
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableHighlight,
	Platform
} from 'react-native';
import { Icon, Content, Footer, Button, Title, Thumbnail, Text, Grid, Row, Col } from 'native-base';

// import Icon from 'react-native-vector-icons/FontAwesome';

var Dimensions = require('Dimensions');
var screenSize = Dimensions.get('window');
// var BackButton = require('../ui/BackButton');
// var Utils = require('../utils/Utils');
var {Actions} = require('react-native-router-flux');
var currentView = '';
var ResponsiveImage = require('react-native-responsive-image');

export default class BottomMenu extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      show: false,
	      ok: '',
	      view: '',
	      current: 'online'
	    };
	    this.setShow = this.setShow.bind(this);
  	}

  	setShow(s) { this.setState({show: s}); }

  	goto(action) {
  		switch(action) {
  			case 'online':
  				Actions.online();
  				break;
  			case 'trader':
  				Actions.trader();
  				break;
  			case 'strategies':
  				Actions.strategies();
  				Actions.strategieslist();	
  				break;
  			case 'demo':
  				Actions.demo();
  				break;
  		}
  	}

	render() {
	    if(!this.state.show)
			return(<View/>);
		else {
			return (
				<View style={styles.container}>

					<View style={styles.menuButton}>
						<Button transparent onPress={() => this.goto('online')} style={{height:60}}>
							<View style={styles.item}>
								{/*<Icon name="ios-globe" />*/}
								<Thumbnail size={Platform.OS == 'ios' ? 40 : 50} source={this.props.current != 'online' ? require('../../images/logo3.png') : require('../../images/logo3-g.png')} />
								<Text numberOfLines={1} style={styles.itemTitle}>Open Account</Text>
							</View>
						</Button>
					</View>

					<View style={styles.menuButton}>
						<Button transparent onPress={() => this.goto('trader')} style={{height:60}}>
							<View style={styles.item}>
								{/*<Icon name="ios-person" />*/}
								<Thumbnail size={Platform.OS == 'ios' ? 40 : 50} source={this.props.current != 'trader' ? require('../../images/logo2.png') : require('../../images/logo2-g.png')} />
								<Text style={styles.itemTitle}>Trader Go!</Text>
							</View>
						</Button>
					</View>

					<View style={styles.menuButton}>
						<Thumbnail size={Platform.OS == 'ios' ? 50 : 80} source={require('../../images/logo-gold-alpha.png')} />
					</View>

					<View style={styles.menuButton}>
						<Button transparent onPress={() => this.goto('strategies')} style={{height:60}}>
							<View style={styles.item}>
								{/*<Icon name="ios-cash" />*/}
								<Thumbnail size={Platform.OS == 'ios' ? 40 : 50} source={this.props.current != 'strategies' ? require('../../images/logo1.png') : require('../../images/logo1-g.png')} />
								<Text style={styles.itemTitle}>Strategies</Text>
							</View>
						</Button>
					</View>

					<View style={styles.menuButton}>
						<Button transparent onPress={() => this.goto('demo')} style={{height:60}}>
							<View style={styles.item}>
								{/*<Icon  name="ios-cube" />*/}
								<Thumbnail size={Platform.OS == 'ios' ? 40 : 50} source={this.props.current != 'demo' ? require('../../images/logo5.png') : require('../../images/logo5-g.png')} />
								<Text style={styles.itemTitle}>Demo</Text>
							</View>
						</Button>
					</View>
				</View>
			);
		}
	}
}

var styles = StyleSheet.create({
	container: {
		top:0,
		width: screenSize.width,
		alignSelf: 'flex-end',
		flexDirection: 'row',
		backgroundColor: '#121212',//Utils.Colors.green,
		
		...Platform.select({
	      ios: {
	      	height: 60,
	      },
	      android: {
			height: 80,
	      },
	    }),
	},
	menuButton : {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// width: (screenSize.width / 5)-4,
		// height: 80
	},
	menuSection : {
		paddingVertical: 9  * 1//Utils.PixelScale.scale,
	},
	item: {
		flex:1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		// bottom: 10,
		// height: 80,
	},
	itemTitle: {
		color: '#ffffff',
		fontFamily: 'Verdana',
		...Platform.select({
	      ios: {
	        marginTop:-10,
			fontSize: 11,
	      },
	      android: {
	        marginTop:0,
			fontSize: 16,
	      },
	    }),
	},
	selected: {
		flex: 1,
		width: screenSize.width/5,
		backgroundColor: '#58C2C5',
		alignItems: 'center',
		justifyContent: 'center'
	},
	menuButtonActivated : {
		backgroundColor: 'grey'
	},
	logo: {
		bottom: 20,
	}
});