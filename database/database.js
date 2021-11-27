const express = require("express");
const mysql = require("mysql");

const db = mysql.createPool({
    host : "us-cdbr-east-04.cleardb.com",
    user : "b6c989c9cbbbab",
    password : "122320e8",
    database : "heroku_40d9afe054a21f7"
})

module.exports = db;
