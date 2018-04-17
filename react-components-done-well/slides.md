# React Components Done Well

---

## Smart vs. dumb components

* Dumb aka _Presentational_ components
* Smart aka _Container_ components

--

### "Dumb" components
* Sole responsibility is for presentation
* Closely paired with CSS
* Props → View
* Should be stateless
* Very easily unit testable
* Should represent the majority of your components

Note:

Dumb components are called "presentational" components because their sole job is
to "present" something to the DOM. They represent an input of props to an output
of a view. This also makes them easily testable. Ideally we want to have a
whole bunch of dumb components to break up our UI into modular/reusable pieces.
This is not dissimilar to breaking up functions in code refactoring.

You can think of dumb components as a vessel for markup, styling, and any basic
conditional logic that comprises your view.

Preferably a Stateless Functional Component (as opposed to class)

By keeping these components stateless, we can think about composing them as
modules in a larger view and across different contexts.

The logic for dumb components can be extracted into utilities and
state-management libraries. Dumb components are informed by smart components.

--

### Example "Dumb" component

```xml
const Greeting = (props) => {
  return(
    <div className="greeting">
      Hello, {props.name}
    </div>
  );
}
```

--

### "Smart" components

* A container that hydrates "dumb" components with data
* Handles state
* Data may live in Redux, or a top level component
* Passes down props and callbacks to "dumb" components
* Typically not styled

Note:

The "smart" component acts as a wrapper around dumb components. They,
essentially, hydrate the dumb components with data from the state. This allows
us to reuse the dumb components for the UI/view and swap out the smart
components and data. Again, separation of concerns. This also applies to tests.

Container components are the primary way of connecting to the store in Redux.

- Seperation of concerns

--

### Example "smart" component

```
class GreetingContainer extends Component {

  state = { name: '' }

  componentDidMount() {
    fetch('/api/name/...')
      .then(response => response.json())
      .then({ name } => this.setState({ name }));
  }

  render() {
    return (
      <Greeting name={this.state.name} />
    );
  }
}
```

--

### Example app tree

```xml
<Website>
  <Header>
    <Logo />
    <SmartUserLogin>
      <UserLogin />
    </SmartUserLogin>
  </Header>
  <SmartArticles>
    <Articles>
      <Article>
    </Articles>
  </SmartArticles>
  <Footer />
</Website>
```

---

## Dumb components dun' good

--

### General best practices

* Do one thing and do it well (Unix principle)
* Have one component/responsibility per module
* Prefer stateless functional components
* Think generic: avoid business logic
* Add a `displayName` for debugging

Note:

Remember that we are using dumb components as a vessel for styling the UI
We want these components to be easily understandable at a glance, so that means
we should be aware of when it is best to decompose components down into smaller
parts.

--

### Prop dos
* Fewer `props` === better!
* Use common and clear naming conventions
* Define `propTypes` for validation
* Support passing down a `className` prop
* Spread remaining `props` on the top level element
* Support passing a `tag` as a prop

--

### The Reusable button

```xml
const Button = (props) => {
  const {
    className,
    tag: Tag,
    ...rest
  } = props;

  const classes = classNames(
    className,
    'button',
  );

  return (
    <Tag {...rest} className={classes} />
  );
}
```

Note:

- The component is self closing and we didn't explicitly pass children
- By spreading the rest of props onto an element, you can accommodate things
  like props you didn't originally think of (eg. 'data-automation-hook')
- We can pass another tag, like <a> to make this button render as a link
- We can provide any other kind of class name we want for more styles
- This pattern can lend itself to multiple components (like in Stencil)

--

### Prop don'ts

* Avoid deeply nested `props` (e.g. objects, arrays)
* Avoid prop names that may collide with HTML attributes
  * (e.g. `type` or `role`)
* Avoid highly specific prop names
  * (use the component as your namespace)

Note:

You can equivocate the number of props on a component to function arity, a high
function arity is a bad thing because it makes your function harder to use.

--

### Composability

* Don't do too much
* Keep the component shallow (allows for more control in how they are composed)
* Pass through elements via `props.children`

Note:

Decomposing big components causes you to have a lot of smaller components,
but who cares? Those smaller components will have much easier unit tests and the
larger component will be much more flexible across various contexts. It will
also be easier in the future if someone decides that one part of the larger
component needs to be changed or removed. The changes are scoped to a smaller
section of the larger component. This is similar to breaking your code up into
smaller sub-functions

- Try to extract logic and functionality out into separate utility files

---

### Composability Example

Note:

[ Eric adds example with PackageCards here ]


---

## Styles

* 1 component : 1 style file
* Think generically (component should exist in a vacuum)
* Component is responsible for importing its styles

```js
import React from 'react'
import './Button.css';

const Button = () => { /* ... */ }
Button.displayName = 'Button';

export default Button;
```

--

### CSS specifics
* Keep specificity low (use conventions like BEM)
* Styles scoped to component

```css
.button { /* ... */ }
```

```js
return (
  <button className={classNames('button', className)} {...rest}>
    {children}
  </button>
)
```

Note:

#TODO: Add more in-depth example for element modifiers (BEM)

---

## Demo
