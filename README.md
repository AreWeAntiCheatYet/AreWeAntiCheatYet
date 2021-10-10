# Are We Anti-Cheat Yet?

A website dedicated to keeping track of which games have committed to bringing anti-cheat support to GNU/Linux. This project was born out of the fact that I could not find a definite list or source of truth for games that are committing to full GNU/Linux support. So in the spirit of transparency and keeping these companies accountable, I decided to take it upon myself to found this project so that there actually a single place where this information is compiled into a single document, and is a trustworthy and reliable source.

## How does this work?

A list is maintained in `bin/games.txt`, then the actual JSON table is generated from running `bin/Make-List.ps1`, and placed in `src/static/`. On a new commit, the website is automatically statically regenerated.

## I'd like to contribute to the list!

First, make sure that the game you'd like to add isn't actually on the list. In the event that it isn't, **make sure there isn't an issue for it already**, and then file a new issue and follow the template and fill out all the required fields.

## Technologies Used
- Node.js
- JavaScript
- Jest
- Vue.js
- Nuxt.js
- Buefy

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work with Nuxt, check out the [documentation](https://nuxtjs.org).
