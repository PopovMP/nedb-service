# Loads and provides NEDB connections 

**nedb-service** loads NEDB dat abases from a folder and provides connections. It flushes the DB connections every hour.

The lib provides singleton persistent connections, which can be used in different modules of the application.  

Homepage: https://github.com/popovmp/nedb-service

## Synopsis

```javascript
// Init in your `index.js`
const dbService = require("@popovmp/nedb-service");
dbService.init(path.join(__dirname, "db-folder"), ".db");

// Use in all other files
const pageDb = dbService.getConnection("page");

pageDb.fineOne({author: "popov"}, {_id: 0},
   pageDb_findOne_ready);

function pageDb_findOne_ready(err, data) {
   console.log(JSON.stringify(data));
}
````

## Installation

```
npm install @popovmp/nedb-srevice
```

## Logging errors

**nedb-service** uses the **micro-logger** ( https://npmjs.com/package/@popovmp/micro-logger ) package for logging errors.

When **micro-logger** is not initialized, it logs in the console.
If you want to log the errors in a log file, init **micro-logger** in your `index.js` as follows;

```javascript
const logger = require("micro-logger").init("./logs/log.txt");
```

## Methods

**nedb-service** exports two methods:

```javascript
/**
 * Initialize the DB Service
 * Reads the DB files and sets a connection for each of them
 *
 * @param {string} dbDirectory - directory containing the DB files
 * @param {string} dbFileExt - DB files extension (including the dot)
 */
function init(dbDirectory, dbFileExt)
````

```javascript
/**
 * Gets a connection to a DB
 *
 * @param {string} dbName
 * @returns {DataStore}
 */
function getConnection(dbName)
````

## License

`nedb-service` is free for use and modification. No responsibilities for damages of any kind.

Copyright (c) 2020 Miroslav Popov
