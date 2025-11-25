import express from "express";
import cors from "cors";
import db from "./db.js";   // Database connection

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.get("/test", async (req, res) => {
    try {
        const result = await db.query("SELECT NOW()");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});


app.get("/students", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM students ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch students" });
    }
});

app.post("/students", async (req, res) => {
    try {
        const {
            last_name,
            given_name,
            middle_name,
            extension,
            student_number,
            year_section,
            email
        } = req.body;

        await db.query(
            `INSERT INTO students 
            (last_name, given_name, middle_name, extension, student_number, year_section, email) 
            VALUES ($1,$2,$3,$4,$5,$6,$7)`,
            [last_name, given_name, middle_name, extension, student_number, year_section, email]
        );

        res.json({ message: "Student saved" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database insert error" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
