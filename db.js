"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db = new Client({
    user: "derek",
    host: "localhost",
    database: "jobly_test",
    password: "new_password", // or omit this line altogether
    port: 5432, // or your PostgreSQL port
});

if (process.env.NODE_ENV === "production") {
    db = new Client({
        user: "derek",
        host: "localhost",
        database: "jobly",
        password: "new_password", // or omit this line altogether
        port: 5432, // or your PostgreSQL port
        // connectionString: getDatabaseUri(),
        ssl: {
            rejectUnauthorized: false,
        },
    });
} else {
    db = new Client({
        user: "derek",
        host: "localhost",
        database: "jobly_test",
        password: "new_password", // or omit this line altogether
        port: 5432, // or your PostgreSQL port
        // connectionString: getDatabaseUri(),
    });
}

db.connect();

module.exports = db;
