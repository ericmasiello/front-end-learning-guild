# Webpack

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

### Exercise

1. Go to `04_webpack/01_basic_bundling/`
2. Install Webpack
3. Create a configuration that will build the bundle
4. Open the `index.html` page to verify it works

**Hint:** Look at `index.html` first to determine where the bundle should live and what it should be called

--

### What's in a bundle
https://webpack.js.org/concepts/manifest/

* Your [transformed] code
* The Webpack runtime (bootstrap script)
* A manifest
* `import` and `require` are replaced with `__webpack_require__`

Note:
The manifest and runtime are what tell the browser how to begin executing your code. Manifest is assembled as Webpack walks the dependency tree. The manifest is what manages all the dependencies and the runtime is what executes your app starting at the entry point

---

## Webpack: The More Advanced Stuff
#### What haven't we done yet?

1. No transpilation (Babel)
2. Added Loaders
3. Used any Plugins

---

### Loaders
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

```
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

### Babel and Webpack 
Applied via the `babel-loader`

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

### Exercise 02: Using Loaders

--

### Plugins
* Allow you to intercept **runtime events** at different stages of of the bundling process
* Often times, plugins are used in tandem w/ loaders

* How do you build CSS?
* How do you build images?

--

---

### Sourcemaps

How do I debug this crap?

---

## Webpack Dev Server

--

### Hot Module Replacement

---

## Custom environment based builds

`webpack --env=dev`
`webpack -p`

---

## Resources & Credits 📚

* [Webpack documentation](https://webpack.js.org/)

---

## Questions? 🙋🏾‍♀️ 🙆🏻‍♂️ 🙋🏻‍♀️

