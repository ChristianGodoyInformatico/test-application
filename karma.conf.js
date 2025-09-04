// Karma configuration
// Generated on Thu Sep 04 2025 12:29:57 GMT-0400 (hora estándar de Chile)
const path = require('path');

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: 'src/test.ts', watched: false },
      { pattern: 'src/**/*.spec.ts', watched: false },
      { pattern: 'src/**/*.html', watched: true, served: true, included: false },
      { pattern: 'src/**/*.scss', watched: true, served: true, included: false }
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      'src/test.ts': ['webpack'],                              // <- nuevo
      'src/**/*.spec.ts': ['webpack']
    },



    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity,

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-webpack'
    ],

    webpack: {
      mode: 'development',
      module: {
        rules: [
          { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
          { test: /\.html$/, loader: 'raw-loader' },       // para templates
          { test: /\.scss$/, use: ['raw-loader'] }         // o sass-loader si quieres compilar estilos
        ]
      },
      resolve: {
        extensions: ['.ts', '.js'],
        alias: {
          '@components': path.resolve(__dirname, 'src/app/components'),
          '@services': path.resolve(__dirname, 'src/app/services'),
          '@directives': path.resolve(__dirname, 'src/app/directives'),
          '@models': path.resolve(__dirname, 'src/app/models'),
          '@assets': path.resolve(__dirname, 'src/assets')
        }
      }
    },
    mime: { 'text/x-typescript': ['ts', 'tsx'] },
  })
}
