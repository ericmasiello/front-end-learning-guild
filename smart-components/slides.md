# Smart Components in React

---

## Level setting

React Element vs. React Component.

What's the difference?

TODO: Read https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html

---

## What can smart components used for?

TODO: Read https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

* Shared/cross-cutting concerns
* Interfacing with data
* Other side effects (e.g. Touch DOM)

---

## What are smart components NOT used for

Rendering `<JSX />` elements directly

---

## Ways to implement

* <del>Mixins</del>
* Higher Order Components
* Render Props

---

## What's a mixin?

--

### Why Mixins are no good

TODO: Sumarize https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html

---

## Higher Order Components (HOCs)

A function that takes a React Component and returns a new, wrapped React Component

--

### How to write one

--

### Examples in the wild: `react-redux`

```js
connect()
```

--

### Pros & Cons

\+ Easy to compose many HOCs
\+ Feels "clean" in that you're only dealing with a composed Component

\- Still has the same indirection problem as mixins

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