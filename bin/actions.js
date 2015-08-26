'use strict';

var common = require('array-intersection');
var utils = require('./utils');


module.exports = function (cli) {
  var unique = ['get', 'set', 'fetch', 'new', 'init', '...'];
  var actions = {};

  actions.displayHelp = function () {
    console.log('help ')
  };

  actions.checkRoot = function (arr) {
    var res = common(arr, unique);
    if (res.length > 1) {
      utils.error('only one-root level command may be given:', utils.red(res.join(', ')));
      cli.emit('help');
      process.exit(1);
    }
  };

  return actions;
};
