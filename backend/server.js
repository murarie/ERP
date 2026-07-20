const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const db = require("./config/db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// ---------------- HOME ----------------

app.get("/", (req, res) => {

    db.query("SELECT * FROM students", (error, results) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(results);

    });

});


// ---------------- REGISTER ----------------

app.post("/register", async (req, res) => {

    const {

        full_name,
        roll_number,
        email,
        password

    } = req.body;

    try {

        // Check if email already exists

        db.query(

            "SELECT * FROM students WHERE email = ?",

            [email],

            async (error, emailResult) => {

                if (error) {

                    return res.status(500).json({
                        message: "Database Error"
                    });

                }

                if (emailResult.length > 0) {

                    return res.status(400).json({
                        message: "Email already exists"
                    });

                }

                // Check if roll number already exists

                db.query(

                    "SELECT * FROM students WHERE roll_number = ?",

                    [roll_number],

                    async (error, rollResult) => {

                        if (error) {

                            return res.status(500).json({
                                message: "Database Error"
                            });

                        }

                        if (rollResult.length > 0) {

                            return res.status(400).json({
                                message: "Roll Number already exists"
                            });

                        }

                        // Hash password

                        const hashedPassword =
                            await bcrypt.hash(password, 10);

                        // Insert student

                        const sql = `
                            INSERT INTO students
                            (full_name, roll_number, email, password)
                            VALUES (?, ?, ?, ?)
                        `;

                        db.query(

                            sql,

                            [

                                full_name,

                                roll_number,

                                email,

                                hashedPassword

                            ],

                            (error, result) => {

                                if (error) {

                                    return res.status(500).json({
                                        message: "Registration Failed"
                                    });

                                }

                                res.json({

                                    message: "Registration Successful"

                                });

                            }

                        );

                    }

                );

            }

        );

    }

    catch (err) {

        res.status(500).json({

            message: "Server Error"

        });

    }

});

// ---------------- LOGIN ----------------

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    db.query(

        "SELECT * FROM students WHERE email = ?",

        [email],

        async (error, results) => {

            if (error) {

                return res.status(500).json({
                    message: "Database Error"
                });

            }

            if (results.length === 0) {

                return res.status(401).json({
                    message: "Invalid Email or Password"
                });

            }

            const student = results[0];

            const isMatch = await bcrypt.compare(
                password,
                student.password
            );

            if (!isMatch) {

                return res.status(401).json({
                    message: "Invalid Email or Password"
                });

            }

            res.json({

                message: "Login Successful",

                student: {

                    id: student.id,
                    full_name: student.full_name,
                    roll_number: student.roll_number,
                    email: student.email

                }

            });

        }

    );

});

app.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);

});