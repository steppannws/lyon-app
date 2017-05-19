// &__language=en&__callback=IitSignUpFormhandleResponse&email=&clientname=&Last%20Name=&Country=&Language=&tm=1473743781272

'use strict';

import Utils from './utils/Utils';

var serverUrl = "https://mitsweb.iitech.dk/PPSSWS/Processinput.aspx";
var API_URL = "https://mitsweb.iitech.dk/PPSSWS/Processinput.aspx/HandleSubmit?__profileid=9d9c115c-cf1b-40e4-ae45-0a9680c2c028&__formversion=0&__language=en&__callback=IitSignUpFormhandleResponse&email=&clientname=&Last%20Name=&Country=&Language=&tm=1473743781272"//serverUrl + "/HandleSubmit?__profileid=9d9c115c-cf1b-40e4-ae45-0a9680c2c028&__formversion=0&";

var SERVER = 'https://lyonapp.herokuapp.com/api';
// var SERVER = 'http://localhost:8080/api';

var DATA_URL = SERVER + "/data";
var ETF_URL = SERVER + "/etf/";
var STOCK_URL = SERVER + "/stock/";
var STOCK_13F_URL = SERVER + "/stock13f/";
var HISTORY_URL = SERVER + "/history/";
var STRATEGIES_URL = SERVER + "/strategies";

function post(url:string, data:Object) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(data),
  }).then((response) => {
    // Reactotron.log(data); 
    return response.json();
  })
}

function get(url:string) {
  Utils.log('GET:', url);
  return fetch(url, {
    method: 'GET',
  }).then((response) => { 
    console.log('DATAAA:', response);
    return response.json();
  }).catch((error) => error);
}

function put(url:string, data:Object) {
  // console.warn('post: ', JSON.stringify(data));
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(data),
  }).then((response) => { 
    return response.json();
  })
}

function getFiltered(url:string, filter:string, accessToken:string) {
  return fetch(url, {
    method: 'GET',
    body: {
        filter : filter,
        access_token : accessToken
      }
  }).then((response) => response.json()).catch((error) => error);
}

module.exports = {

  serverURL: function (){
    return serverUrl;
  },

  getStrategies: function(data:string) {
    return get(STRATEGIES_URL);
  },

  getEtf: function(symbol:string) {
    return get(ETF_URL + symbol);
  },

  getStock: function(symbol:string) {
    return get(STOCK_URL + symbol);
  },

  get13f: function(symbol:string, wid:Number) {
    return get(STOCK_13F_URL + symbol + '/' + wid);
  },

  getHistory: function(symbol:string, period:string) {
    return get(HISTORY_URL + symbol + '/' + period);
  },

  sendForm: function(data:string) {
    return get(API_URL + data);
  },
};