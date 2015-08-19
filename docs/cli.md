## Commands

> Assemble CLI documentation

```sh
assemble
```

## New project

Create a new project:

- `init`: Create a new project, based on a configuration/boilerplate.

## Existing project

Add to an existing project:

- `new`: add something to an existing project
- `fetch`: get an existing remote value
- `get`: get an existing local value


### .get

What does `get` mean?

- get from memory?
- get from `data-store`/config?
- read a file?


**Examples**

```sh
$ assemble get ./snippets/foo.hbs
# prints `foo.hbs` contents to process.stdout
```


```sh
$ assemble get ./snippets/foo.hbs > bar.hbs
# copies `foo.hbs` to `bar.hbs`
```


```sh
$ assemble get ./snippets/foo.hbs --render --data foo.json
$ assemble get ./snippets/foo.hbs --render --expand a:b,c,d,e
# renders `foo.hbs` with `-r` data
```

```sh
$ assemble get ./snippets/foo.hbs --partial bar
# gets `foo.hbs`, renders it if data is configured for new partials, and writes it to the config location for partials as `bar:ext`
```

```sh
$ assemble new partial foo.hbs --snippet bar
# create a new partial named `foo.hbs` using `--snippet` bar
```

## Get presets

Presets may be configured...


## Fetch

Everything `get` does, from a remote URL.


```sh
$ assemble fetch foo
# downloads `config.remote.url.foo`
```


```sh
$ assemble fetch --config foo.bar
# downloads `config.foo.bar`
```


```sh
$ assemble fetch https://github.com/myusername/myproject/foo.txt
# downloads `https://github.com/myusername/myproject/foo.txt`
```

## Fetch presets

Presets can be configured for remotes.

**Example preset**

```js
var presets = {
  github: {
    // remote (fetch)
    url: 'https://api.github.com',
    // local (get)
    src: '...',
    dest: '...',
    command: function(val) {
      if (val === 'foo') {
        // do something with URL
      }
    }
  }
}
```

**Usage examples**

```sh
$ assemble fetch --preset=github foo.bar
# calls the `assemble.fetch` method using the `github` "preset", with the `foo.bar` value
```

```sh
$ assemble fetch --config foo.bar
# downloads `config.foo.bar`
```



In `src/snippets.yml`

```yaml
snippets:
  # `bar.hbs` is a template for a template
  bar: templates/snippets/bar.hbs

```

In `src/snippets.js`

```js
module.exports = {
  snippets: {
    // `bar.hbs` is a template for a template
    bar: 'templates/snippets/bar.hbs'
  }
};
```

## Snippet

**Example**

```sh
$ assemble snippet
```

When you use the `snippet` command, assemble uses the values stored in `config.snippet` to


```sh
$ assemble snippet ./foo.hbs
# assemble get snippet
```
