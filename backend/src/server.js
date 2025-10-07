import app from "./app.js";
import { createTableIfNotExists } from "./db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await createTableIfNotExists();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();