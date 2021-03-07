//\////////////////////////////////////////////////////\\
//\// - A TOOLS SOCIALS [FACEBOOK] -                 //\\
//\// - VERSION 1.0.0                                //\\
//\// - Packages : main.js [                         //\\
//\//       fb, express, body-parser, readline, ejs; //\\
//\// ]                                              //\\
//\// - Write by kayy0812                            //\\             
//\////////////////////////////////////////////////////\\

const { FB, FacebookApiException } = require('fb');
const express = require('express');
const minify = require('html-minifier');
const request = require('request');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const prompt = require('prompt-sync')({ sigint: true });
const Application = express();

const config = require('./config');
const routes = require('./routes');
const consolelog = require('./consolelog');

FB.options({ version: 'v3.3' });
FB.extend({ appId: config.facebook_api_key, appSecret: config.facebook_api_secret });
console.log('Truy cap http://localhost:3000 de nhap Token');

//FB.setAccessToken('EAAAAZAw4FxQIBAA8ZB30ZAPZBf1WBCQaudjxS10I9jhZAQI7zo6nWBGyaHwYc41tPbHK2fEdrgy8dFHXZC6EWZBJzmBovLlYDRg6ZCYUjNDWrn012K8fEfbiweZACZAVf1dsejVf43vxcnZCGNZCMKpbIzgXK8eCjZAlDo7l1Yt7tJMdXVgZDZD');

Application.use(bodyParser.json());
Application.use(cookieParser());
Application.use(bodyParser.urlencoded({ extended: false }));
Application.set('views', __dirname + '/templates');
Application.set('view engine', 'ejs');
Application.use('/', routes);

Application.listen(3000);