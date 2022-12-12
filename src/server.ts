import app from "./app";
import AppDataSource from "./data-source";

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.log("Error during Data Source initialization", err);
  });

  app.listen(3333, () => {
    console.log("Server running on port 3333");
  });
})();
