
module.exports = {
  main: 'assemble',
  meta: {
    usage: 'Usage: assemble [options]',
    description: 'Static site generator.',
  },
  options: {
    'help'       : 'get help',
    'init'       : {
      help: 'generate a new project from a boilerplate',
      description: '',
      example: 'assemble init my-blog [options]',
      flags: [{
        '--list': 'list available boilerplates to start with'
      }]
    },

    'new'        : {
      help: 'create a new scaffold, template or data file.',
      example: 'assemble new post:2015-01-01-this-is-an-awesome-post',
      description: 'when you do `assemble new`, a list is presented with registered view collection names. When you do `assemble new [foo]` a new `foo` would be created.',

      flags: [{
        '[type]': 'create a new file for a registered template type',
        'snippet': 'new snippet',
        'scaffold': 'new scaffold',
        'boilerplate': 'new boilerplate',
        'data': 'new data file',
      }]
    },

    'data'       : {
      help: 'expand a data snippet or create a data file from the given source file or remote resource',
      description: '',
      usecase: 'you could pull down data from the GitHub API and populate a data file.',
      flags: [{
        '--remote': 'set/update remote url'
      }]
    },

    'fetch'      : {
      help: 'download a file, scaffold or boilerplate from a GitHub project or Gist.',
      description: '',
      example: 'assemble fetch github:repositories -d data/repositories.json',
      flags: [{
        '--remote': 'aliased remote to use',
        '--dest': 'destination file to store data'
      }]
    },

  },
  commands: {
    'snippet'    : 'expand a snippet of data or code and write it to the console or to disk.',
    'scaffold'   : 'generate one or more templates from an existing scaffold.',
    'boilerplate': 'generate one or more templates from an existing boilerplate.',
    'generate': '',
  }
};
