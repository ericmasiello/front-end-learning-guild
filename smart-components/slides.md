# Smart Components in React
## Part 1: <del>Mixins</del> and Higher Order Components

---

## Setup

1. `git clone https://github.com/ericmasiello/front-end-learning-guild.git`
2. `cd front-end-learning-guild/smart-components/exercises/01-basic-hoc`
3. (if you have nvm) `nvm use`
4. `npm install`
5. `cd ../02-localstorage-hoc`
6. `npm install`

---

### What can smart components used for?

* Shared/cross-cutting concerns
* Fetching data sources, e.g. `fetch()`
* Producing side effects (e.g. track an analytics event when the component mounts)

--

### Benefits of Smart Components

* Promotes resuability of presentational/dumb components
* Separates app logic from UI logic
* Can aleviate "prop drilling"

Note:
* Presentational/dumb components can be used with different data sources
* You just need to adhere to their API

--

### Statefulness

i.e. Does the component use `this.state`?

* Dumb components tend to be stateless
* Smart components tend to be stateful
* ...But this isn't a hard rule

--

### What are smart components **NOT** used for

Rendering `<JSX />` with styles directly

Note:
At most, smart components may render a wrapping container element like a `<div />` but nothing more


---

## Ways to implement

* <del>Mixins</del>
* Higher Order Components
* Render Props

---

## What's a React mixin?

* Deprecated way of sharing functionality between React components
* Required use of `React.createClass()`

```
const MyMixin = {
  renderSomeone() {
    return <span>Someone</span>
  }
}

const MyComponent = React.createClass({
  mixins: [MyMixin],
  render() {
    return (<div>Hello, {this.renderSomeone()}</div>);
  }
});
```

--

### Why Mixins are no good

TODO: Sumarize https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html

---

## Higher Order Components (HOCs)

A function that takes a React Component and returns a new, wrapped React Component

---

## How to write an HOC

--

### Why?
Imagine we have many components that need the same data

```js
class Page1 extends React.Component {
  state = {
    data: [],
  };
  componentDidMount() {
    fetch('/the/data')
      .then(result => result.json())
      .then(data => this.setState({ data }));
  }
  render() {
    return (
      <div className="page-1">
        Page 1 ... {this.state.data}
        <a href="/page2">Next</a>
      </div>
    );
  }
}
```

--

### And then...

```js
class Page2 extends React.Component {  
  state = {
    data: [],
  };
  componentDidMount() {
    fetch('/the/data')
      .then(result => result.json())
      .then(data => this.setState({ data }));
  }
  render() {
    return (
      <div className="page-2">
        Page 2 ... {this.state.data}
        <a href="/page1">Back</a>
      </div>
    );
  }
}
```
--

### Some observations

* We had to make each of these components `class`es in order to leverage `componentDidMount`
* Both components are doing nearly the same thing in `componentDidMount`
* Data had to be stored in `state` rather than passed as `props`

--

### Make an HOC

```js
const withData = (Component) => {
  class DataWrapper extends React.Component {
    state = {
      data: [],
    };
    componentDidMount() {
      fetch('/the/data').then(result => result.json())
        .then(data => this.setState({ data }));
    }
    render() {
      return <Component data={this.state.data} />
    }
  }
  return DataWrapper;
};
```
```js
const Page1 = (props) => (
  <div className="page-1">
    Page 1 ... {props.data}
    <a href="/page2">Next</a>
  </div>
);
const Page1WithData = withData(Page1);
// Then use <Page1WithData />
```

--

### Passing props

But what if our component (the one being wrapped by the HOC) expects other `props`?

```js
const DynamicPage = ({ title, data, ...rest}) => (
  <div {...rest}>
    <h1>{title}</h1>
    The data {this.props.data}
    Some other stuff
  </div>
);
```

Note:
This component expects a prop called `title` and it expects to spread the remaining props as `...rest`

--

### Passing props in our HOC

```js
const withData = (Component) => {
  class DataWrapper extends React.Component {
    state = {
      data: [],
    };
    componentDidMount() {
      fetch('/the/data')
        .then(result => result.json())
        .then(data => this.setState({ data }));
    }
    render() {
      // forward along any props set on the wrapper down to
      // the underlying wrapped element
      return <Component {...this.props} data={this.state.data} />
    }
  }

  return DataWrapper;
};
```
```js
const DynamicPageWithTracking = withData(DynamicPage);
// Then use <DynamicPageWithTracking title="Step 3" id="foo" />
```

--

### `displayName`
`displayName` is useful when debugging with React DevTools

```js
const DynamicPage = () => <div />;

DynamicPage.displayName = 'DynamicPage';
```

<img src="img/react-tree.png" style="border: 0; padding: 10px; background: #fff" alt="React DevTools">

--

### Applying a `displayName` to a wrapped component

```js
const withData = (Component) => {
  class DataWrapper extends React.Component {
    // does all the stuff...
  }

  // sets the displayName using the static property displayName
  // or falling back to the function's name
  DataWrapper.displayName =
    `withData(${Component.displayName || Component.name})`;

  return DataWrapper;
};
```

--

### Hoisting statics

Static properties on wrapped components need to manually be hoisted to the wrapped component

```js
// class based static
class ComponentA extends React.Component {
  static testMessage = () => 'testing a...';
  render() {
    return <div />;
  }
}

// function based static
const ComponentB = () => <div />;
ComponentB.testMessage = () => 'testing b...';

```

--

### HOCs without hoisting non-React statics

```js
ComponentA.testMessage(); // 'testing a...'
ComponentB.testMessage(); // 'testing b...'

withSomeHOC(ComponentA).testMessage();
// Uncaught TypeError: ...testMessage is not a function

withSomeHOC(ComponentB).testMessage();
// Uncaught TypeError: ...testMessage is not a function
```
--

### How to hoist non-React statics

```js
import hoistNonReactStatic from 'hoist-non-react-statics';

const withData = (Component) => {
  class DataWrapper extends React.Component {
    // does all the stuff...
  }

  DataWrapper.displayName =
    `withData(${Component.displayName || Component.name})`;

  hoistNonReactStatic(DataWrapper, Component);

  return DataWrapper;
};
```

--

### HOC considerations
* The HOC function should be pure (no side-effects): just compose the original component by wrapping it in another component
* Apply `displayName`s based on the wrapped component's `displayName`
* Static methods must be copied over to still have access to them. A simple way to do this is the `hoist-non-react-statics` package

--
### More HOC considerations
* Do not create a wrapped component within a `render` method; compose the HOC outside any component definition.

```js
// ...
render() {
  const BasicWithGoods = withTheGoods(BasicComponent); // <-- NO!
  return (
    <BasicWithGoods />
  );
}
```

---

# Exercises

--

## 1. Create a `withTracking` HOC

`01-basic-hoc`

* Run `npm test` (your tests will fail)
* Fix them by building the `withTracking` HOC
* **Hint:** Behavior is similar to `components/Step1.js`
* **Hint:** the `withTracking` HOC is a function that returns a function

```js
const config = { /* config options */ };
const Component = (props) => <div {...props} />;

const ComponentWithTracking = withTracking(config)(Component);
```

--

## 2. Create a `withStorage` HOC

`02-localstorage-hoc`

* Run `npm test` (your tests will fail)
* Fix them by building the `withStorage` HOC
* **Hint:** details on how to use the `localStorage` API are documented in `withStorage.js`
* **Hint:** the wrapped component must be passed 3 prop methods: `load('key')`, `save('key', 'value')` and `remove('key')`

```js
const Component = (props) => <div {...props} />;

const ComponentWithStorage = withStorage(Component);
```

---

## HOC Pros & Cons

* (\+) Easy to compose many HOCs
* (\+) Feels "clean" in that you're only dealing with a composed Component

* (\-) Has the same indirection problem as mixins
* (\-) Refs are not passed through (easily)

---

## Render Props

"...refers to a simple technique for sharing code between React components using a prop whose value is a function."

--

### Example 1: Using a prop called `render`

```js
class DataProvider extends React.Component {
  state = { message: 'world' };
  render() {
    return this.props.render(this.state);
  }
}

function HelloWorld() {
  return (
    <DataProvider render={data => (
      <h1>Hello {data.message}</h1>
    )}/>
  );
}
```

--

### Example 2: Using `children`

```js
class DataProvider extends React.Component {
  state = { message: 'world' };
  render() {
    return this.props.children(this.state);
  }
}

function HelloWorld() {
  return (
    <DataProvider>
      (data) => <h1>Hello {data.message}</h1>
    </DataProvider>
  );
}
```

---

## Further Reading

* [Understanding React Higher-Order Components by Example](https://levelup.gitconnected.com/understanding-react-higher-order-components-by-example-95e8c47c8006)
* [Smart and Dumb Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)