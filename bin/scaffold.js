
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

module.exports = scaffold;
