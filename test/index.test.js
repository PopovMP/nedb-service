"use strict"

const assert = require("assert");
const {init, test, ensure} = require("@popovmp/micro-tester");

const dbService = require("../index.js");
dbService.init(__dirname, ".db");

const db = dbService.getConnection("test");

init("Test nedb-service");

test("Read a record", () => {
    const query      = { answer: 42 };
    const projection = {_id: 0};

    db.findOne(query, projection,
        db_findOne_ready);
});

function db_findOne_ready(err, data) {
    if (err) {
        throw new Error("Error with reading data: " + err);
    }

    test("Finds correct record", () => {
        assert.strictEqual(data.answer, 42);
    });

    ensure();

    // Because we cannot close NEDB
    process.exit(0);
}

