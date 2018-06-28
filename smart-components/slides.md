# Smart Components in React

---

## Level setting

React Element vs. React Component.

What's the difference?

TODO: ...

---

### What can smart components used for?

* Shared/cross-cutting concerns
* Typically used for interfacing produced by side effects, e.g. `fetch()`
* Producing side effects (e.g. track an analytics event on component mount)

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

* Dumb components tend to stateless
* Smart components tend to be stateful
* ...But this isn't a hard rule

--

### What are smart components **NOT** used for

Rendering `<JSX />` elements directly

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

TODO: see https://levelup.gitconnected.com/understanding-react-higher-order-components-by-example-95e8c47c8006
For examples, create tests that pass and have people fix the test by writing the component 

---

## How to write an HOC

--

### Imagine we have multiple pages that need the same data

```js
// Page1.js
class Page1 extends React.Component {
  static displayName = 'Page1';
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
// Page2.js
class Page2 extends React.Component {
  static displayName = 'Page2';
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

### How to write one

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
Page1.displayName = 'Page1';

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

DynamicPage.displayName = 'DynamicPage';
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

### Missing `displayName`
`displayName` is useful when debugging with React DevTools

--

### Hoist statics

--

### Examples in the wild: `react-redux`

```js
connect()
```

--

### HOC considerations
* A HOC should be a pure function with no side-effects. It should not make any modifications and just compose the original component by wrapping it in another component.
* Do not create a wrapped component using an HOC within a `render` method. Compose the HOC outside any component definition.
* Static methods must be copied over to still have access to them. A simple way to do this is the hoist-non-react-statics package.

```js
// ...
render() {
  const BasicWithGoods = withTheGoods(BasicComponent); // <-- NO!
  return (
    <BasicWithGoods />
  )
}
```


--

### Pros & Cons

\+ Easy to compose many HOCs
\+ Feels "clean" in that you're only dealing with a composed Component

\- Still has the same indirection problem as mixins
\- Refs are not passed through (easily)

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

* [Smart and Dumb Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
* [React Components, Elements, and Instances](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)