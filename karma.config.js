module.exports = function (config) {
    'use strict';
    config.set({

        basePath: '',

        frameworks: ['mocha', 'chai'],

        files: [
            
            'test/*.spec.js'
        ],
        'plugins' : [
            'karma-mocha',
            'karma-chai',
            'karma-sinon',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher'
        ],
        client: {
          mocha: {
            // change Karma's debug.html to the mocha web reporter 
            reporter: 'html'
          }
        },

        reporters: ['progress'],

        port: 9000,
        colors: true,
        autoWatch: false,
        singleRun: false,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        browsers: ['PhantomJS'] //, 'Firefox', 'Chrome']

    });
};