import React, { Component } from 'react';
import { Alert } from 'react-native';

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function getHashCode(string) {
  var hash = 0, i, chr, len;
  if (string.length === 0) return hash;
  for (i = 0, len = string.length; i < len; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

module.exports =  {
	Colors: {
		black:      '#000000',
		white: 		'#ffffff',
		lightGrey: 	'#edece8',
		darkGrey: 	'#403d3d',
	},	
	pieColors: [
		"#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
		"#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
	],

	getColorFromString: function(string) {
		var hash = getHashCode(string);
		var r = (hash & 0xFF0000) >> 16;
		var g = (hash & 0x00FF00) >> 8;
		var b = hash & 0x0000FF;
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	},

	sumDuplicated: function(arr, prop) {
		var seen = {},
		    order = [];
		arr.forEach(function(o) {
		    var id = o[prop];
		    if (id in seen) {
		        var percent = seen[id].number + o.number
		        seen[id] = o;  
		        seen[id].number = percent;
		        order.push(order.splice(order.indexOf(id), 1));
		    }
		    else {
		        seen[id] = o;
		        order.push(id);
		    }
		});

		return order.map(function(k) { return seen[k]; });
	},

	showAlert: function(title:string, msg:string, action:Function = null) {
		Alert.alert(
			title,
			msg,
			[
				// {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
				// {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'OK', onPress: () => action()},
			]
		)
	},

	showAlertTwo: function(title:string, msg:string, okTitle:string, noTitle:String, okAction:Function = null, noAction:Function = null) {
		Alert.alert(
			title,
			msg,
			[
				// {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
				{text: okTitle, onPress: () => okAction()},
				{text: noTitle, onPress: () => noAction()},
			]
		)
	},

	log: function(title:string, msg:string) {
		if(__DEV__) {
			console.tron.display({
			  name: title,
			  // preview: title,
			  value: msg,
			  important: true
			})
		}
	}
}