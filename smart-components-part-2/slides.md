# Smart Components in React
## Part 2: Render Prop and the Context API

---

## Setup

1. TODO:

---

## Recap

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

## React Context API

TODO:

---

## Further Reading

* TODO: