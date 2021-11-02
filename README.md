### Misc

- [ ] **Add workflow scripts**
  - [x] build - webpack build ./web into ./public folder
  - [ ] dev - start a nodemon server && start webpack dev server
  - [ ] deploy to heroku

### Front

- [ ] **make better design**
- [x] **home page** - /app
  - [x] url shorten input -> POST /api/shrten/ { url: <input url> }
  - [x] bootstrap sexy design
  - [x] nice error display
- [ ] **stats page** /app/<UID>
  - [ ] requests the stats from -> GET /api/stats/<UID>
  - [ ] error display
  - [ ] add dashboard with stats display:
    - [ ] locations of requests
    - [ ] unique requesters
    - [ ] usage graph

### Back

- [x] POST /api/shorten/ { url: <input url> }
  - [x] validate url
  - [x] check if already was shortened
  - [x] return the shorterned url
  - [x] check if uid is realy unique
- [x] GET /<UID>
  - [x] store user req data
  - [x] redirect to the URL
- [x] GET /app
  - [x] serve the static from ./public folder
- [x] GET /api/stats/<UID>
  - [x] respond with JSON of the stats
- [x] **refactoring**
