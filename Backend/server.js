const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "Aditya",
  password: "aadi@sql1",
  database: "bus_tracking",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL Connected...");
});

db.query(
  `CREATE TABLE IF NOT EXISTS bus_location (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lat DOUBLE NOT NULL,
    lng DOUBLE NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  (err) => {
    if (err) throw err;
    console.log("✅ Table Ready");
  }
);

app.get("/getLocation", (req, res) => {
  db.query("SELECT * FROM bus_location ORDER BY id DESC LIMIT 1", (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) {
      return res.json({ lat: 26.8467, lng: 80.9462 });
    }
    res.json(result[0]);
  });
});

app.post("/updateLocation", (req, res) => {
  const { lat, lng } = req.body;
  if (!lat || !lng) return res.status(400).send("Invalid coordinates");
  db.query("INSERT INTO bus_location (lat, lng) VALUES (?, ?)", [lat, lng], (err) => {
    if (err) return res.status(500).send(err);
    res.send("✅ Location Updated");
  });
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
