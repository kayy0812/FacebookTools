const express = require('express');
const router = express.Router();
const minify = require('html-minifier');
const consolelog = require('./consolelog');
const { FB, FacebookApiException } = require('fb');
var function_fb = require('./facebook_function');

module.exports = (function() {

    router.get('/', function(req, res) {
        res.render('index', {
            accessToken: FB.getAccessToken()
        });
    });

    router.get('/logs', function(req, res) {
        res.render('logs/filelog');
    });

    router.post('/likes', function(req, res) {
        function_fb.LikeAllPostInID(req.body.uid);
        var response_data = {
            status: true
        };
        function_fb.sendLog();
        res.send(response_data);
    });

    router.get('/clear_logs', function(req, res) {
        var response_data = {
            status: true
        };
        consolelog.clear();
        res.send(response_data);
    });

    router.post('/submit_token', function(req, res) {
        if (req.body.accessToken.startsWith('EAAA')) {
            FB.setAccessToken(req.body.accessToken);
            function_fb.sendLog();
            var response_data = {
                status: true
            }
        } else {
            var response_data = {
                status: false
            }
        }

        res.send(response_data);
    });

    return router;
})();