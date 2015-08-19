'use strict';

var red = require('ansi-red');


/**
 * Expose CLI utils
 */

var utils = module.exports;


utils.error = function error(msg) {
  var args = [].slice.call(arguments);
  args.unshift(utils.red('[Assemble CLI] Error:'));
  console.error.apply(console, args);
};
