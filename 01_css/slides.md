# Making more sense of CSS

---

## Agenda

1. CSS anatomy
2. CSS Selectors
3. Specificity, inheritance, and importance
4. Quiz

---

## TODO: CSS Anatomy

--

* https://www.w3schools.com/css/css_syntax.asp (https://www.w3schools.com/css/selector.gif)
* Combinators
When you see a combinator, read this as saying, “only if”. A combinator is telling you that this style applies only if certain conditions are met in the HTML document — namely that HTML elements are organized in a specific way. This is the closest you can get to having actual logic in CSS.
http://blog.frankmtaylor.com/2013/07/05/css-the-breakdown-part-one-the-selector-and-grammar/
  * Child Selector https://designshack.net/articles/css/css-selectors-just-the-tricky-bits/
  * Adjacent Selector
  * Attribute Selector
  * Pseudo Class Selectors

---

## CSS Selectors

--

### Tags, Classes & ID Selectors

```html
<div>
    <span>Hello</span> <span class="world">World</span>
</div>

<div id="primary">
    My name is <span>Eric</span> 
</div>
```

How do I target these things?

--

```html
<div>
    <span>Hello</span> <span class="world">World</span>
</div>

<div id="primary">
    My name is <span>Eric</span> 
</div>
```

```css
div {
    background-color: green;
}

span {
    color: blue;
}

.world {
    color: green;
}

#primary {
    background-color: orange;
}
```

--

### How would I...

Target just the `<span>Eric</span>`?

```html
<div>
    <span>Hello</span> <span class="world">World</span>
</div>

<div id="primary">
    My name is <span>Eric</span> 
</div>
```

--

### Descendant Selectors

```css
div span {
    color: blue;
}

#primary span {
    font-weight: bold;
}

section .error {
    color: red;
}
```

Note:
- The space means ancestor (child)
- Only the part of the selector closest to the "{" is targeted (target selector)
--

### What's the difference?
```css
section .error {
    /* Who do I affect? */
}

section.error {
    /* And what about me? */
}
```

```html
<body>
    <section>
        <div class="error">...</div>
        <article>
            <span class="error">...</span>
        </article>
    </section>

    <section class="error">
        ...
    </div>
</body>
```

--

### Multiple Classes
* HTML elements can have multiple classes
* Separate class names with a space

```html
<div class="message error primary">
    ...
</div>
```
```css
.message {
    /* ... */
}

.error {
    /* ... */
}

.primary {
    /* ... */
}
```

---

## Cascading Style Sheets
### Specificity, inheritance, and importance

Note:

Now that we are feeling pretty good about CSS, let's look at some more complicated examples.

---

## Specificity
Who wins?

```css
div {
  color: blue;
}

#primary-success {
  color: orange;
}

body div {
  color: yellow;
}

.message {
  color: green;
}
```
```html
<body>
    <div id="primary-success" class="message">What color am I?</div>
</body>
```

Note:

- Specificity refers to how specific a selector is
--

### Specificity

CSS rules that are more specific win.

--

### Specificity

`id`s > `class`es > tags

--

### What color is it?

```html
<p>
    <span>
        Hello World!
    </span>
</p>
```

```css
p span {
    color: yellow;
}

span {
    color: red;
}
```

--

### Specificity

More selector parts > fewer selector parts

```css
p span {
    /* I win! */
    color: yellow;
}
span {
    /* I lose :( */
    color: red;
}
```

--

### What color is it?

```html
<p>
    <span class="cool-span" style="color: indigo">
        Hello World!
    </span>
</p>
```

```css
.cool-span {
    color: yellow;
}
span {
    color: red;
}
```

--

### Specificity

Inline styles > *mostly* everything

--

### What color is it?

```html
<p>
    <span>
        Hello World!
    </span>
</p>
```

```css
span {
    color: yellow;
    font-weight: bold;
}
span {
    color: red;
}
```

Note:

Sidenote - the font-weight would still be bold since the second rule does not override this value.

--

### Specificity
#### Order

Given equal specificity, order matters.

(The last rule wins.)

Note:

Also matters in the order stylesheets are loaded.

---

### Importance

The effects of *specificity* can be negated by `!important`

--

### `!important`

```html
<p>
    <span>
        Hello World!
    </span>
</p>
```

```css
span {
    color: yellow !important;
}
span {
    color: red;
}
```

Note:
Remember when I said inline styles trump *mostly* everything? `important!` trumps those guys.

--

### `!important`

```html
<p>
    <span>
        Hello World!
    </span>
</p>
```

```css
span {
    color: yellow !important;
}
span {
    color: red !important;
}
```

--

### Importance

If two rules have equal importance, go back to specificity rules

--

### `!important` = No Dice!\*

<small>_\* Arguably this is okay when used thoughtfully in larger systems such as ITCSS_</small>

---

## Inheritance

--

### What Color is it?

```html
<p>
    Hello <span>World</span>
</p>
```

```css
p {
    color: blue;
}
```

--

### Inheritance

Children inherit the styles of their parents (well, [some of them](http://stackoverflow.com/questions/5612302/which-css-properties-are-inherited)).

--

### What color is it?

```html
<p>
    Hello <span>World</span>
</p>
```

```css
p {
    color: blue;
}
span {
    color: red;
}
```

--

### Inheritance
#### Proximity matters

Directly styling something is more specific than inherited styles.

---

## Quiz!

--

Given this HTML:

```html
<p id="abstract" class="subtitle">Hello, world!</p>
```

And this CSS:

```css
#abstract {
  background-color: darkkhaki;
}

p {
  background-color: dimgray;
}

.subtitle {
  background-color: mediumorchid;
}
```

What will the background color of the paragraph be?

--

Given this HTML:

```html
<p id="abstract" class="subtitle">Hello, world!</p>
```

And this CSS:

```css
#abstract {
  background-color: darkkhaki;
}

p {
  background-color: dimgray;
}

.subtitle {
  background-color: mediumorchid !important;
}
```

What will the background color of the paragraph be?

--

Given this HTML:

```html
<p id="abstract" style="background-color: red;">Hello, world!</p>
```

And this CSS:

```css
#abstract {
  background-color: darkkhaki;
}

p {
  background-color: dimgray;
}
```

What will the background color of the paragraph be?

--

Given this HTML:

```html
<div>
    <span>
        <strong>
            Hello, World!
        </strong>
    </span>
</div>
```

And this CSS:

```css
div {
    color: red;
}
span {
    color: yellow;
}
```

What will the color of the strong be?

--

Given this HTML:

```html
<div>
    <span>
        <strong>
            Hello, World!
        </strong>
    </span>
</div>
```

And this CSS:

```css
strong {
    color: red;
}
span {
    color: yellow;
}
```

What will the color of the strong be?

--

Given this HTML:

```html
<div>
    <span>
        <strong>
            Hello, World!
        </strong>
    </span>
</div>
```

And this CSS:

```css
strong {
    color: red;
}
div span strong {
    color: purple;
}
span strong {
    color: yellow;
}
```

What will the color of the strong be?

---

## Questions? 🙄

