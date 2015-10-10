#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var inflect = require('inflection');
var scaffold = require('./scaffold');
var lazy = require('lazy-cache')(require);
var argv = require('minimist')(process.argv.slice(2));
lazy('resolve-up', 'resolveup');
lazy('look-up', 'lookup');

/**
 * Resolve cwd, and get package metadata from project
 */

var fp = lazy.lookup('package.json', { cwd: argv.cwd || process.cwd() });
var pkg = tryRequire(fp);
var cwd = path.dirname(fp);
process.chdir(cwd);


if (argv.new) {
  console.log('scaffold is not implemented yet');
  // scaffold(cwd);
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
    ? lazy.lookup('node_modules/assemble/index.js', {cwd: cwd})
    : cwd;

  if (!assemble) {
    console.error('assemble not found in local project');
    process.exit(1);
  }

  /**
   * Find assemblefile...
   */

  var assemblefile = lazy.lookup('assemblefile.js', {cwd: cwd});

  var inst;
  if (typeof assemblefile === 'string') {
    inst = require(assemblefile);
  }

  if (!inst) {
    inst = require(assemble)();
  }
  inst.use(require('composer-runtimes')());
  inst.on('error', function (err) {
    console.error(err);
  });


  setImmediate(function () {
    inst.build(toRun, function (err) {
      if (err) console.error(err.stack)
    });
  });
}


function tryRequire(fp) {
  try {
    return require(path.resolve(fp));
  } catch(err) {}
  return {};
}
