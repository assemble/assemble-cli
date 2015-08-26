#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var inflect = require('inflection');
var scaffold = require('./scaffold');
var lazy = require('lazy-cache')(require);
var argv = require('minimist')(process.argv.slice(2));
var resolveup = lazy('resolve-up');
var lookup = lazy('look-up');

/**
 * Resolve cwd, and get package metadata from project
 */

var fp = lookup()('package.json', { cwd: argv.cwd || process.cwd() });
var pkg = tryRequire(fp);
var cwd = path.dirname(fp);
process.chdir(cwd);


if (argv.new) {
  scaffold(cwd);
} else {
  runTasks(cwd);
}

function runTasks(cwd) {
  /**
   * Tasks to run
   */

  var tasks = argv._;
  var toRun = tasks.length ? tasks : ['default'];

  /**
   * Find assemble...
   */

  var assemble = pkg.name !== 'assemble'
    ? lookup()('node_modules/assemble/index.js', {cwd: cwd})
    : cwd;

  var inst = require(assemble);
  // require('composer-runtimes')(inst);

  inst.on('error', function (err) {
    console.log(err);
  });

  /**
   * Find assemblefile...
   */

  var assemblefile = lookup()('assemblefile.js', {cwd: cwd});
  var tasks = {};


  if (typeof assemblefile === 'string') {
    require(assemblefile);
  }

  process.nextTick(function () {
    inst.run(toRun, function (err) {
      // if (err) console.log(err.stack)
    });
  });
}


function tryRequire(fp) {
  try {
    return require(path.resolve(fp));
  } catch(err) {}
  return {};
}
