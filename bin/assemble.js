#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var inflect = require('inflection');
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

function scaffold(dir) {
  var base = glob.sync('*/scaffold{,s}/', {cwd: dir});
  if (!base.length) {
    console.log('cannot find `scaffolds` directory.');
    process.exit(1);
  }

  var files = glob.sync('**/*.hbs', {cwd: base[0]});
  var cache = {};
  files.forEach(function (fp) {
    var segs = fp.split(/[\\\/]/);
    var type = segs[0];
    var name = segs[segs.length - 1];
    name = name.slice(0, name.lastIndexOf('.'));
    type = inflect.singularize(type);
    cache[type] = cache[type] || {};
    cache[type][name] = fp;
  });

  var parts = argv.new.split(':');
  var key = inflect.singularize(parts[0]);
  var filename = parts[1];
  if (!filename) {
    console.error('Please specify the file to get.');
    console.error('The sytax is:');
    console.error();
    console.error('   `assemble --new foo:bar`');
    console.error();
  }
  var filepath = path.resolve(cache[key][filename]);
  console.log(filepath);

}

if (argv.new) {
  scaffold(cwd);
} else {
  runTasks(cwd)
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

  /**
   * Find assemblefile...
   */

  var assemblefile = lookup()('assemblefile.js', {cwd: cwd});
  var tasks = {};


  if (typeof assemblefile === 'string') {
    require(assemblefile);
  }

  process.nextTick(function () {
    inst.start.apply(inst, toRun);
  });
}


function tryRequire(fp) {
  try {
    return require(path.resolve(fp));
  } catch(err) {}
  return {};
}
