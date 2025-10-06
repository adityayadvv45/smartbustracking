const mysql = require("mysql2");

// MySQL connection (use your actual credentials)
const db = mysql.createConnection({
  host: "localhost",
  user: "Aditya",
  password: "aadi@sql1",
  database: "bus_tracking",
});

// Connect to DB
db.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to MySQL for simulation!");
});

// Starting coordinates (Lucknow)
let lat = 26.8467;
let lng = 80.9462;

// Function to update location
function updateLocation() {
  // Simulate movement by adding small random changes
  lat += (Math.random() - 0.5) * 0.001;
  lng += (Math.random() - 0.5) * 0.001;

  const query = `
    INSERT INTO bus_location (lat, lng, timestamp)
    VALUES (${lat}, ${lng}, NOW())
    ON DUPLICATE KEY UPDATE lat=${lat}, lng=${lng}, timestamp=NOW()
  `;

  db.query(query, (err, result) => {
    if (err) console.error("Error updating location:", err);
    else console.log(`🚍 Bus moved to: ${lat.toFixed(5)}, ${lng.toFixed(5)}`);
  });
}

// Update every 5 seconds
setInterval(updateLocation, 5000);
