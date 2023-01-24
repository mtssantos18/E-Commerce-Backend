import "dotenv/config";
import path from "path";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/*.{js,ts}");
  const migrationsPath: string = path.join(__dirname, "./migrations/*.{js,ts}");
  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [entitiesPath],
      migrations: [migrationsPath],
    };
  }

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: ["src/entities/*.ts"],
    };
  }

  return {
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    logging: false,
    synchronize: false,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
};

const AppDataSource = new DataSource(dataSourceConfig());

export default AppDataSource;
