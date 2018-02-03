# Webpack

Note:
Goal: by end of this you should be able to look at an existing webpack config and have a pretty good idea what is going on. Also, you should feel comfortable writing your own basic config from scratch.

---

## Agenda

1. Overview of front-end tooling
2. Webpack
3. Getting started
4. Webpack configuration
5. Environment builds
6. Plugins
7. Webpack Dev Server

---

## Overview of front-end tooling

--

### Why do we need front-end tooling?

* Minification (HTML, CSS, JS, images)
* Transpilation (SCSS => CSS, JSX => JS, etc.)
* Linting
* Bundling

Note:
Why do we create bundles?

--

### Popular front-end tools
* Grunt
* Gulp
* Browserify
* Webpack
* Rollup, SystemJS, & many, many more.

Note:
* Grunt popularized front-end tooling. Configuration based, lots of plugins available, etc. Brought a lot of maturity to the front-end tooling world
* Gulp offered much of the same but works off this notion of streams, where your data starts in one state and is translated via various tools into its final output without needing to save temporary intermediary data like Grunt
* Browserify was the first to say, let's bring the rich ecosystem of npm to the front end. Browserify enabled common JS (require syntax) on the front-end
* Webpack followed a similar model as Browserify but had a far more
robust plugin model. You could achieve with just webpack what would
have required both Browserify and Grunt/Gulp

--

### What about Babel?
* "Transpilier"
* Converts unsupported code into Javascript that's executable in the browser or Node environment
* Used alongside other tools like Webpack

---

## Webpack

*It's just a bundler.*

* Creates a dependency graph via an entry point
* Outputs a bundle\*.

`[input] (entry.js => A.js => B.js & C.js) = bundle.js [output]`

Note:
Webpack treats your project as a dependency graph. You can have an index.js in your project that pulls in dependencies your project needs through standard `require` or `import` statements.

This is different than how task runners like Grunt or Gulp work. They typically just iterate over a directory of files and concatenate them together.

--

### Getting started

```
npm install -D webpack
```

--

### Webpack configuration

```js
const path = require('path');

module.exports = {
  // Here the application starts executing
  entry: './app/entry', 
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  }
};
```
--

### Exercise 01: Webpack from scratch

```shell
git clone https://github.com/ericmasiello/front-end-learning-guild.git
cd front-end-learning-guild
cd 04_webpack/exercises/01_basic_bundling_starter/
npm install
```

1. Create a configuration that will build the bundle
2. Add a npm script for executing your build
3. Run `npm start` to verify it works
4. **BONUS:** Create a npm script for running Webpack in watch mode

**Hint:** Look at `index.html` first to determine where the bundle should live and what it should be called

---

## What's in a bundle
https://webpack.js.org/concepts/manifest/

* Your (transformed) code
* The Webpack runtime (bootstrap script)
* A manifest of dependencies
* `import` and `require` are replaced with `__webpack_require__`

Note:
The manifest and runtime are what tell the browser how to begin executing your code. Manifest is assembled as Webpack walks the dependency tree. The manifest is what manages all the dependencies and the runtime is what executes your app starting at the entry point

---

## Webpack: The More Advanced Stuff
#### What haven't we done yet?

1. No transpilation (e.g. using Babel)
2. Handled CSS
3. Used Loaders or Plugins

---

## What are Webpack Loaders?
* Applies specific transformation(s) against a module's content
* Matched with modules via regular expressions (usually by file extension)
* Can be used to load any type of content (images, fonts, etc.)

Note:
This is part of what makes Webpack unique. Webpack can match against any type of module as opposed to something like Babel or Sass.

Webpack can emit everything as a single bundle or emit separate bundles based on split configurations and plugins

--

### Babel

* Transforms code into JavaScript
* Its configured through plugins and presets
* Most commonly used for transforming new ES201X features and JSX into ES5
* Can be used as a standalone tool (no need for Webpack)
* Typically configured in `.babelrc`

--

### Setting up Babel

```shell
npm install -D babel-core babel-preset-env
```

Create a `.babelrc`
```
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": [
          "YOUR", "BROWSER", "LIST", "GOES", "HERE"
        ]
      }
    }]
  ]
}
```

--

### Babel and Webpack 

Applied via the `babel-loader`

```shell
npm install -D babel-loader
```

```js
{
  // rest of webpack config...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ],
  },
}
```

--

### Working with CSS

* Webpack does not handle styling out of the box
* Loaders & plugins support importing styles

```js
// app.js

import React from 'react';
import './style.css';

// ...

```

--

### The necessary loaders

```shell
npm install -D style-loader css-loader
```

* `style-loader` injects CSS into a `style` tag
* `css-loader` treats relative CSS paths within `@import` and `url()` as ES2015 `import`s
* Can use `file-loader` or `url-loader` for handling other static assets (e.g. images)

--

### Basic CSS Module Configuration

```js
{
  // rest of webpack config...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
```

--

### Exercise 02: Using Loaders

```shell
cd 04_webpack/exercises/02_using_loaders_starter/
npm install
```

1. Transform your JavaScript with Babel (`.babelrc` is already configured)
2. Add support for bundling CSS

---

## So then what's a Webpack plugin?

* Loaders operate on module level
* Plugins intercept *runtime events* at different stages of the bundling process
* Plugins are often used in tandem w/ loaders
* Can be used to emit new files/bundles (typically non-JS)

Note:
Webpack by default only emits JavaScript bundles. We need loaders to emit other types of bundles.

--

### Problems with our current configuration

* Does not emit a separate CSS file (no caching)
* Flash of Unstyled Content (FOUC)

--

### Refining our CSS builds with `ExtractTextPlugin`

* Still relies on `css-loader`
* Replaces the use of `style-loader`
* Requires a `plugin` to emit the CSS file

--

### Refining our CSS builds with `ExtractTextPlugin`

```shell
npm install -D extract-text-webpack-plugin
```

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // ...
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      }),
    }],
  },
  plugins: [new ExtractTextPlugin('styles.css')],
};
```

--
### A new problem... 🤬 🤬 🤬

Now inside of `index.html`, we need to manually add:
```html
<link href="dist/styles.css" rel="stylesheet">
```

--

### Enter: HTML Webpack Plugin 🤗 🤗 🤗

* Generates an html file
* Automatically references your bundles
* Can be based off a `template`

```shell
npm install -D html-webpack-plugin
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ...
  plugins: [new HtmlWebpackPlugin()],
};
```

--

### Exercise 03: Using Plugins

```shell
cd 04_webpack/exercises/03_using_plugins_starter/
npm install
```

1. Use `extract-text-webpack-plugin` to emit a `style.css` file
2. Use `html-webpack-plugin` and the existing `src/index.html` as a `template`

You should end up with 3 files in your `dist/` folder: `app.js`, `index.html`, and `styles.css`

* https://github.com/jantimon/html-webpack-plugin
* https://github.com/webpack-contrib/extract-text-webpack-plugin

---

## Resources & Credits 📚

* [Webpack documentation](https://webpack.js.org/)
* [*Survive JS - Webpack* book](https://survivejs.com/webpack/)
* [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin)
* [Extract Text Webpack Plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)

---

## Questions? 🙋🏾‍♀️ 🙆🏻‍♂️ 🙋🏻‍♀️

