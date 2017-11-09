# Intro to Responsive Design and Responsive Patterns

---

## Agenda

1. The basics of Responsive Web Design (RWD)
2. Building RWD responsibly
3. Responsive Patterns

---

## The Basics of Responsive Web Design (RWD)

--

> Responsive Web design is the approach that suggests that design and development should respond to the user’s behavior and environment based on screen size, platform and orientation.

_[Smashing Magazine](https://www.smashingmagazine.com/2011/01/guidelines-for-responsive-web-design/)_

--

#### How do we this?

Media Queries

```css
.grid {
    display: flex;
    flex-direction: column;
}
@media(min-width: 600px) {
    .grid {
        flex-direction: row;
        flex-wrap: wrap;
    }
    .grid > * {
        width: 50%;
    }
}
@media(min-width: 800px) {
    .grid > * {
        width: 33.333%;
    }
}
```
See _[Using Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)_ for a more detailed spec

--

#### What's this actually doing?

Across all devices (note: no media query), we add this ruleset

 ```css
.grid {
    display: flex;
    flex-direction: column;
}
```

When the screen >= 600px wide, we _also_ add these rulesets

```css
@media(min-width: 600px) {
    .grid {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .grid > * {
        width: 50%;
    }
}
```

--

#### What are the net styles at this point?

screen width \>= 600px

```css
.grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.grid > * {
    width: 50%;
}
```

screen width \>= 800px

```css
.grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.grid > * {
    width: 33.333%;
}
```

--

#### A note on specificity

Media queries do **not** add specificty.

```css

.grid {
    display: flex;
    flex-direction: column;
}

@media(min-width: 600px) {
    .grid {
        flex-direction: row;
        flex-wrap: wrap;
    }
}
```
Each instance of `.grid` have equal specificity. So why does the one in the media query win?


Note:

In CSS, when two things have equal specificity, the last one wins

---

## Building RWD responsibly

--

## Mobile First

1. Start by building the UI for the smallest screen you plan to support (typically phones)
2. Upon completion, incrementally expand your device size (both width _and_ height) until it warrants a change (read: add a media query here)
3. Rinse and repeat step 2 until you've reached desktop size
4. Call it a day (not really)

--

### Why mobile first?

* **Constraints**: When developing, its easier to loosen constraints as you build rather than adding them after the fact. Small screen = most constrained. Large scree = least constrained
* **Priorities**: Small screens force you to consider what matters most to customers/business. 
* **Performance**: Starting mobile first makes it much easier to consider bandwidth constraints and slower device performance (_think_ low powered devices on poor 3G connections)

> Small screen sizes force you to prioritize what really matters to your customers and business. There simply isn’t room for anything else. Slow connections and limited data plans require you to “be vigilant about performance, resulting in fast-loading websites everywhere.

_Luke Wroblewski - "Mobile First"_

--

### Let's look at some code again

Mobile First

```css
.grid {
    display: flex;
    flex-direction: column;
}
@media(min-width: 600px) {
    .grid {
        flex-direction: row;
        flex-wrap: wrap;
    }
    .grid > * {
        width: 50%;
    }
}
@media(min-width: 800px) {
    .grid > * {
        width: 33.333%;
    }
}
```

Desktop First (3 more lines of code)
```css
.grid {
    display: flex;
    flex-wrap: wrap;
}
.grid > * {
    width: 33.333%;
}
@media(max-width: 799px) {
    .grid > * {
        width: 50%;
    }
}
@media(max-width: 599px) {
    .grid {
        flex-direction: column;
        flex-wrap: nowrap;
    }
    .grid > * {
        width: 100%;
    }
}
```

--
### Using SCSS

```scss
.grid {
    display: flex;
    flex-direction: column;

    @media(min-width: 600px) {
        flex-direction: row;
        flex-wrap: wrap;

        .grid > * {
            width: 50%;
        }
    }
    @media(min-width: 800px) {
        .grid > * {
            width: 33.333%;
        }
    }
}
```

--
### Tip

Write your media queries _with_ your responsive components. Do not write them all at the end of some massive CSS document.

---

## Responsive Patterns

---

## Questions? 🙄

