# React Components Done Well

---

## Smart vs. dumb components

* Smart aka _Container_ components
* Dumb aka _Presentation_ components

--

### What's a dumb component?
* Typically paired with CSS styling
* Preferably a Stateless Functional Component (as opposed to class)
* Easily tested through Enzyme and snapshots
* Represents 80 - 90% of your components

--

### What's a smart component?

* Connects dumb components to actual data
* Data may live in Redux, Reflux, or a top level component `state`
* Typically no CSS applied here

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

## Dumb components done good

--

### General best practices

* Prefer stateless functional components
* Add a `displayName` for better debugging with React Dev Tools
* Do one thing only
* Think generic: avoid business logic
* 1 component per file

--

### Prop dos
* Define `propTypes` for validation
* Fewer `props` === better!
* Always support a `className` prop
* Spread remaining `props` on top level element
* Support a `tag` `prop`

--

### Examples
...
--


### Prop don'ts

* Avoid deeply nested `props` (e.g. objects, arrays) when possible
* Avoid prop names that may collide with HTML attributes (e.g. `type` or `role`)

--

### Highly composable

* Don't do too much
* Keep the component shallow (allows for more control in how they are composed)
* Pass through elements via `props.children`

--

### Examples
...


---

## Styles

* 1 component : 1 style file
* Think generically (component should be able to exist in a vacuum)
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
