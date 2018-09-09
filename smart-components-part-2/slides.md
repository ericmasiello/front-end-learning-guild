# Smart Components in React
## Part 2: Render Prop and the Context API

---

## Setup

1. Recap Smart Components
2. Render Props
3. React Context API

---

## Recap

## What can smart components used for?

* Shared/cross-cutting concerns
* Fetching data sources, e.g. `fetch()`
* Handling side effects (e.g. track an analytics event when the component mounts, do some DOM manipulation outside of React)

--

## Benefits of Smart Components

* Promotes resuability of presentational/dumb components
* Separates app logic from UI logic
* Can alleviate "prop drilling"

--

### When to <u>NOT</u> use a Smart Component

Rendering `<JSX />` with styles directly

Note:
At most, smart components may render a wrapping container element like a `<div />` but nothing more


---

## Ways to implement

* Higher Order Components ✅
* Render Props 

---

## What is Render Props

"...refers to a simple technique for sharing code between React components using a `prop` whose value is a function."

--

### Example 1: Using a prop called `render`

```js
// Smart Component
class DataProvider extends React.Component {
  state = { message: 'world' };
  render() {
    return this.props.render(this.state);
  }
}

// Dumb Component
function HelloWorld() {
  return (
    <DataProvider render={(data) => (
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
      {(data) => <h1>Hello {data.message}</h1>}
    </DataProvider>
  );
}
```

--

### What if you need a way to call back to the Smart Component

In a traditional React world, you handle this be passing down a reference to a method on the parent component

```js
class SomeWrapper extends React.Component {
  handleUpdate = (message) => this.setState({ message });
  state = { message: 'world' };
  render() {
  	<div>
  		<ChildComponent
  			value={this.state.message}
  			onChange={this.handleUpdate}
		/>
  	</div>
  }
}
```

--

### How do we do this with Render Props?

--

### How <u>NOT</u> to do it!

What's wrong with this?

```js
class DataProvider extends React.Component {
  handleUpdate = (message) => this.setState({ message });
  state = { message: 'world' };
  render() {
    return this.props.children({
      message: this.state.message,
      handleUpdate: this.handleUpdate,
    });
  }
}
```

Note:
- TODO: look into why this isn't good

--

### How to do it correctly

Avoid creating a new object inside the `render` lifecycle

```js
class DataProvider extends React.Component {
  handleUpdate = (message) => this.setState({ message });
  state = {
  	message: 'world',
  	handleUpdate: this.handleUpdate
  };
  render() {
    return this.props.children(this.state);
  }
}
```
--

### Problem with Render Props

Cannot access output of the render prop component within any lifecycle hooks

```js
export default class ConsumerOfRenderProps extends React.Component {
  componentDidMount() {
    // ARG!!! No access to render props data.message
  }
  render() {
    <SomeRenderPropDataProvider>
      (data) => <h1>Hello {data.message}</h1>
    </SomeRenderPropDataProvider>
  }
}
```
--

### Solution 1: Wrap your Component

```js
class ConsumerOfRenderProps extends React.Component {
  componentDidMount() {
  	console.log('Yay I can access:', this.props.message);
  }
  render() {
	return (
		<h1>Hello {this.props.message}</h1>
	);
  }
}

export default (props) => (
	<SomeRenderPropDataProvider>
      {(data) => <ConsumerOfRenderProps {...props} message={data.message} />}
    </SomeRenderPropDataProvider>
);

```

--

### Solution 2: Export both HoCs and Render Props

```js
export class DataProvider extends React.Component {
  handleUpdate = (message) => this.setState({ message });
  state = { message: 'world', handleUpdate: this.handleUpdate };
  render() {
    return this.props.children(this.state);
  }
}

export function withDataProvider(Component) {
	function WithDataProvider(props) {
		return (
			<DataProvider>
		      (data) => <Component {...props} {...data} />
			</DataProvider>
		);
	}
	// Do all the other HoC best practices here :)
	return WithDataProvider;
}
```

---

## Higher Order Components vs. Render Props

* See [Michael Jackson - Never Write Another HoC](https://www.youtube.com/watch?v=BcVAq3YFiuc&feature=youtu.be)
* [Awesome React Render Props](https://github.com/jaredpalmer/awesome-react-render-props)
* Render Props can't solve every problem, but thankfully its easy to make HoCs from Render Props :)

---

## React Context API

"Context provides a way to pass data through the component tree without having to pass props down manually at every level."

Think of this data as _global_ to your React application

Example Usage: Sharing authenticated user data, a UI theme, or preferred language

--

### What Context Solves: Prop Drilling

```
class App extends React.Component {
	state = { user: null, avatarSize: null }
	componentDidMount() {
		fetch('/user').then(data => this.setState({
					user: data.user,
					avatarSize: data.avatarSize
				}));
	}
	render() {
		return (
			<Page
				user={this.state.user}
				avatarSize={this.state.avatarSize}
			/>
		);
	}
}
```

--

```
const Page = (props) => (
	return (
		<main class="page">
			<PageLayout
				user={props.user}
				avatarSize={props.avatarSize}
			/>
		</main>
	);
);
```

--

```
const PageLayout = (props) => (
	return (
		<div class="page-layout">
			<NavigationBar
				user={props.user} avatarSize={props.avatarSize}
			/>
			<SideBar />
			<MainContent>{/* stuff */}</MainContent>
		</div>
	)
);
```

--

```
const NavigationBar = (props) => (
	return (
		<nav class="nav-bar">
			<MainNav>{/* stuff */}</MainNav>
			<AvatarLink user={props.user} size={props.avatarSize} />
		</nav>
	);
);
```

--
#### ...and finally we use it

```
const AvatarLink = (props) => (
	return (
		<Link href={props.user.permalink}>
		  <Avatar user={props.user} size={props.avatarSize} />
		</Link>
	);
);
```

--

### Using React Context

```
class App extends React.Component {
	state = { user: null, avatarSize: null }
	componentDidMount() {
		fetch('/user').then(data => this.setState({
					user: data.user,
					avatarSize: data.avatarSize
				}));
	}
	render() {
		return (
			<UserContext.Provider value={this.state}>
				<Page />
			</UserContext.Provider>
		);
	}
}

```
```
const AvatarLink = (props) => (
	<UserContext.Consumer>
		{({ user, avatarSize }) => (
			<Link href={user.permalink}>
				<Avatar user={user} size={avatarSize} />
			</Link>
		)}
	</UserContext.Consumer>
);
```

--
### How to Create and Use Context

1. Create the context that defines default values for the `Consumer` in the event the `Consumer` is not wrapped by the `Provider`
2. Use the `Provider` to wrap a high level component in your React application tree. Set the `value` prop of the `Provider` component with the current value to be passed to the `Consumer`s
4. Wrap any components that need access to the value in the `Provider`'s subtree and extract the value of context using render props

--

#### 1. Create the Context

```js
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => { /* no-op */ },
});

// <ThemeContext.Provider />
// <ThemeContext.Consumer />
```

--

#### 2. Use the Provider and set the value
```js
import ThemeContext from './ThemeContext';
import Page from './Page';

export class App extends React.Component {
	handleToggleTheme = (theme) => this.setState({ theme });
	state = {
		theme: themes.dark,
		toggleTheme: this.handleToggleTheme,
	};
	render() {
		return (
			<ThemeContext.Provider value={this.state}>
				<Page />
			</ThemeContext.Provider>
		);
	}
}

```
--

#### 3a. Use the Consumer
```js
import ThemeContext from './ThemeContext';

export const Footer = ({ children, ...rest }) => (
	<ThemeContext.Consumer>
		{({ theme }) => 
			theme === theme.dark
			? <footer style={{ backgroundColor: '#333' }}>{children}</footer>
			: <footer style={{ backgroundColor: '#fff' }}>{children}</footer>
		}
	<ThemeContext.Consumer>
);
```

--

#### 3b. Use the Consumer
```js
import ThemeContext from './ThemeContext';

export const ThemeToggler = () => (
	<ThemeContext.Consumer>
		{({ toggleTheme }) => 
			<ButtonBar>
				<Button onClick={() => toggleTheme(theme.dark)}>Dark</Button>
				<Button onClick={() => toggleTheme(theme.light)}>Light</Button>
			</ButtonBar>
		}
	<ThemeContext.Consumer>
);
```

--

### Caveat

* The `React.createContext` was introduced in React 16.3.
* There is a legacy context that can be used in the for previous versions (much uglier)
* Use the `create-react-context` polyfill for older versions of React

---

## Further Reading

* [Michael Jackson's "Never Write Another HoC" Youtube](https://www.youtube.com/watch?v=BcVAq3YFiuc&feature=youtu.be)
* [Render Props Docs](https://reactjs.org/docs/render-props.html)
* [React Context Docs](https://reactjs.org/docs/context.html)
* [Create React Context Polyfill](https://github.com/jamiebuilds/create-react-context)
* [Legacy React Context](https://reactjs.org/docs/legacy-context.html)