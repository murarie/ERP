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

app.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);

});