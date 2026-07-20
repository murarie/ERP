const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    db.query("SELECT * FROM students", (error, results) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(results);

    });

});

app.post("/register", (req, res) => {

    const {

        full_name,

        roll_number,

        email,

        password

    } = req.body;

    const sql = `
        INSERT INTO students
        (full_name, roll_number, email, password)
        VALUES (?, ?, ?, ?)
    `;

    db.query(

        sql,

        [full_name, roll_number, email, password],

        (error, result) => {

            if (error) {

                console.log(error);

                return res.status(500).json({

                    message: "Registration Failed"

                });

            }

            res.json({

                message: "Registration Successful"

            });

        }

    );

});

app.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);

});