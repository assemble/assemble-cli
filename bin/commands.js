#!/usr/bin/env node

var assemble = require('..');

// placeholder
var methodMapping = assemble;


var minimist = require('minimist');
var methods = require('minimist-methods');
var cli = require('minimist-plugins')(minimist)
  .use(require('minimist-expand'))
  .use(methods(methodMapping))
  // .use(methods('one', assemble.scaffolds))
  // .use(methods('two', assemble.snippets))
  .use(require('minimist-events'))

var actions = require('./actions')(cli);
var utils = require('./utils');

cli.on('help', function () {
  actions.displayHelp();
});

cli.on('_', function (arr) {
  actions.checkRoot(arr);
});

cli(process.argv.slice(2));

