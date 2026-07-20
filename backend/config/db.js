const mysql = require("mysql2");

const connection = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "password",

    database: "ERP_db"

});

connection.connect((error) => {

    if (error) {

        console.log("❌ Database Connection Failed");

        console.log(error);

        return;

    }

    console.log("✅ Connected to MySQL Database");

});

module.exports = connection;