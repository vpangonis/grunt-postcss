# grunt-postcss

[![npm Version](https://img.shields.io/npm/v/@lodder/grunt-postcss.svg)](https://npmjs.org/package/@lodder/grunt-postcss)
[![Build Status](https://img.shields.io/github/workflow/status/C-Lodder/grunt-postcss/Tests/master)](https://github.com/C-Lodder/grunt-postcss/actions?query=workflow%3ATests+branch%3Amaster)

> Apply several post-processors to your CSS using [PostCSS](https://github.com/postcss/postcss).

## Getting Started

This plugin requires Grunt `1.0.3` or above.

**Note:** As of v3.0.0, Node.js 10.x or above is required.

If you haven't used [Grunt](https://gruntjs.com/) before, be sure to check out the [Getting Started](https://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](https://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm i git+https://git@github.com/vpangonis/grunt-postcss
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('@vpangonis/grunt-postcss');
```

## Usage

```shell
npm i @vpangonis/grunt-postcss autoprefixer cssnano
```

```js
grunt.initConfig({
  postcss: {
    options: {
      map: true, // inline sourcemaps

      // or
      map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'dist/css/maps/' // ...to the specified directory
      },

      processors: [
        require('autoprefixer')(),
        require('cssnano')() // minify the result
      ]
    },
    dist: {
      src: 'css/*.css'
    }
  }
});
```

## Options

### Post-processors options

```js
require('postcss-plugin')({option: value})
```

### Plugin options

#### options.processors

* Type: `Array|Function`
* Default value: `[]`

An array of PostCSS compatible post-processors. You can also use a function that returns an array of PostCSS post-processors.

#### options.map

* Type: `Boolean|Object`
* Default value: `false`

If the `map` option isn't defined or is set to `false`, PostCSS won't create or update sourcemaps.

If `true` is specified, PostCSS will try to locate a sourcemap from a previous compilation step using an annotation comment (e.g. from Sass) and create a new sourcemap based on the found one (or just create a new inlined sourcemap). The created sourcemap can be either a separate file or an inlined map depending on what the previous sourcemap was.

You can gain more control over sourcemap generation by assigning an object to the `map` option:

* `prev` (string or `false`): a path to a directory where a previous sourcemap is (e.g. `path/`). By default, PostCSS will try to find a previous sourcemap using a path from the annotation comment (or using the annotation comment itself if the map is inlined). You can also set this option to `false` to delete the previous sourcemap.
* `inline` (boolean): whether a sourcemap will be inlined or not. By default, it will be the same as a previous sourcemap or inlined.
* `annotation` (boolean or string): by default, PostCSS will always add annotation comments with a path to a sourcemap file unless it is inlined or the input CSS does not have an annotation comment. PostCSS presumes that you want to save sourcemaps next to your output CSS files, but you can override this behavior and set a path to a directory as a string value for the option.
* `sourcesContent` (boolean): whether original file contents (e.g. Sass sources) will be included to a sourcemap. By default, it's `true` unless a sourcemap from a previous compilation step has the original contents missing.

#### options.diff

* Type: `Boolean|String`
* Default value: `false`

Set it to `true` if you want to get a patch file:

```js
options: {
  diff: true // or 'custom/path/to/file.css.patch'
}
```

You can also specify a path where you want the file to be saved.

#### options.sequential

* Type: `Boolean`
* Default value: `false`

By default grunt-postcss will load all passed CSS files and immediately process them. Set this to `true` if you want files to be processed one by one.
This can help in case when you have a lot of CSS files and processing them causes an `out of memory` error.

#### options.failOnError

* Type: `Boolean`
* Default value: `false`

Set it to `true` if you want grunt to exit with an error on detecting a warning or error.

#### options.writeDest

* Type: `Boolean`
* Default value: `true`

Set it to `false` if you do not want the destination files to be written. This does not affect the processing of the `map` and `diff` options.

#### options.onError

* Type: `Function`
* Default value: `null`

This function is called when an error occurs and passes the error data.

#### options.syntax, options.parser, options.stringifier

Options to control [PostCSS custom syntaxes](https://github.com/postcss/postcss#custom-syntaxes).

```js
options: {
  parser: require('postcss-safe-parser') // instead of a removed `safe` option
}
```

```js
options: {
  syntax: require('postcss-scss') // work with SCSS directly
}
```

## Why would I use this?

Unlike the traditional approach with separate plugins, grunt-postcss allows you to parse and save CSS only once applying all post-processors in memory and thus reducing your build time. PostCSS is also a simple tool for writing your own CSS post-processors.

## How to migrate from grunt-autoprefixer?

Autoprefixer is a PostCSS plugin, so first replace `grunt-autoprefixer` with `grunt-postcss` and `autoprefixer` plugin.

```shell
npm remove --save-dev grunt-autoprefixer
npm install --save-dev @vpangonis/grunt-postcss autoprefixer
```

Assuming you have a config like this:

```js
autoprefixer: {
  options: {
    map: true,
    browsers: ['last 1 version']
  },
  dist: {
    src: '...'
  }
}
```

Replace it with:

```js
postcss: {
  options: {
    map: true,
    processors: [
      require('autoprefixer')()
    ]
  },
  dist: {
    src: '...'
  }
}
```

And add the `browsers` to either your `package.json` or `.browserslistrc` file.

`browsers`, `cascade` and `remove` options are plugin-specific, so we pass them as an argument while require the plugin.
