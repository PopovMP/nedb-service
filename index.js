"use strict";

/**
 * DB service module
 *
 * @module nedb-service
 */

const fs   = require("fs");
const path = require("path");
const DataStore = require("nedb");

const logger = require("@popovmp/micro-logger");

const dataStoreHolder = {};

/**
 * Initialize the DB Service
 * Reads the DB files and sets a connection for each of them
 *
 * @param {string} dbDirectory - directory containing the DB files
 * @param {string} dbFileExt - DB files extension (including the dot)
 */
function init(dbDirectory, dbFileExt) {
    /** @type {string[]} */
    const dbFiles = fs.readdirSync(dbDirectory)
        .filter( fileName => String(fileName).endsWith(dbFileExt) );

    if (!dbFiles.length) {
        logger.error("Cannot find DB files in: " + dbDirectory, "nedb-service::init");
        return;
    }

    dbFiles.map( fileName => path.win32.basename(fileName, dbFileExt) )
        .forEach( fileName => setConnection(dbDirectory, fileName, dbFileExt) );
}

/**
 * Sets a connection for an individual DB file
 *
 * @param {string} dbDirectory
 * @param {string} dbName - file name without path and extension
 * @param {string} dbFileExt
 */
function setConnection(dbDirectory, dbName, dbFileExt) {
    const dbFileName = path.join(dbDirectory, dbName + dbFileExt);
    const dataStoreOptions = {filename: dbFileName, autoload: true};

    // noinspection JSCheckFunctionSignatures
    dataStoreHolder[dbName] = new DataStore(dataStoreOptions);
    dataStoreHolder[dbName].persistence.setAutocompactionInterval(60 * 60 * 1000);
}

/**
 * Gets a connection to a DB
 *
 * @param {string} dbName
 * @returns {DataStore}
 */
function getConnection(dbName) {
    if (!dataStoreHolder[dbName]) {
        logger.error("Cannot find connection to: " + dbName, "nedb-service::getConnection");
    }

    return dataStoreHolder[dbName];
}

module.exports = {
    init,
    getConnection,
};
