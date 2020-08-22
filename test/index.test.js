"use strict"

const {init, test, done} = require("@popovmp/micro-tester");

const dbService = require("../index.js");
dbService.init(__dirname, ".db");

const db = dbService.getConnection("test");

init("Test nedb-service");

test("Read a record", () => {
    const query      = { answer: 42 };
    const projection = {_id: 0};

    db.findOne(query, projection,
        db_findOne_ready);

    return true;
});

function db_findOne_ready(err, data) {
    if (err) {
        throw new Error("Error with reading data: " + err);
    }

    if (data.answer === 42) {
        console.log("Found answer: " + data.answer);
    } else {
        throw new Error("Error data match. Expected: " + 42 + ", Actual: " + data.answer);
    }

    done();

    // Because we cannot close NEDB
    process.exit(0);
}

