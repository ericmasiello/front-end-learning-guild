# Webpack Part 2: Work in Progress

---

## Agenda

1. TODO

---

### Sourcemaps

How do I debug this crap?

---

## Webpack Dev Server

“WDS is a development server running in-memory, meaning the bundle contents aren’t written out to files, but stored in memory. This is an important distinction when trying to debug code and styles.

By default WDS refreshes content automatically in the browser while you develop your application so you don’t have to do it yourself. However it also supports an advanced webpack feature, Hot Module Replacement (HMR).”

Excerpt From: Juho Vepsäläinen, Tobias Koppers and Jesús Rodríguez Rodríguez. “SurviveJS - Webpack.” iBooks. 

/***/

“To customize WDS functionality it’s possible to define a devServer field at webpack configuration. ”

Excerpt From: Juho Vepsäläinen, Tobias Koppers and Jesús Rodríguez Rodríguez. “SurviveJS - Webpack.” iBooks. 

--

### Hot Module Replacement

“Hot Module Replacement (HMR) takes things one step further. In the case of React, it allows the application to maintain its state without forcing a refresh. While this does not sound that special, it makes a big difference in practice.”

Excerpt From: Juho Vepsäläinen, Tobias Koppers and Jesús Rodríguez Rodríguez. “SurviveJS - Webpack.” iBooks. 

---

## Custom environment based builds

`webpack --env=dev`
`webpack -p`

“webpack-merge does two things: it concatenates arrays and merges objects instead of overriding them allowing composition.”

Excerpt From: Juho Vepsäläinen, Tobias Koppers and Jesús Rodríguez Rodríguez. “SurviveJS - Webpack.” iBooks. 

---

## Resources & Credits 📚

* [Webpack documentation](https://webpack.js.org/)

---

## Questions? 🙋🏾‍♀️ 🙆🏻‍♂️ 🙋🏻‍♀️

