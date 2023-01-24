import app from "./app";
import AppDataSource from "./data-source";

const PORT = process.env.PORT || 3333;

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.log("Error during Data Source initialization", err);
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
