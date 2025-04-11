// ================= (Main Entry Point) =================
import dotenv from "dotenv";
dotenv.config();

import app from "./src/app";
import { AppDataSource } from "./src/config/data-source";

const PORT = process.env.PORT || 3000;


// Keep DB Connection Alive by periodic ping
function keepDatabaseAlive() {
  setInterval(async () => {
    try {
      const result = await AppDataSource.query("SELECt 1");
      console.log("DB ping successful:", result);
    } catch (error) {
      console.log("DB ping failed:", error);
    }
  }, 1000 * 60 * 5) // every 5 minutes
}


// DB Connection + Server Bootstrapping
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");

    keepDatabaseAlive()

    // Start Express App
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`)
    });

  } catch (error) {
    console.error("Error initializing server or DB:", error);
    process.exit(1); // exit process if startup fails
  }
}

startServer()
