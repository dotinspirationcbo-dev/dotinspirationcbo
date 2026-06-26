import express from "express";
import cors from "cors";
import { runMigrations } from "./migrate";
import router from "./router";
import { errorHandler, notFound } from "./middleware/errorHandler";

const PORT = parseInt(process.env.API_PORT ?? "5001", 10);

async function bootstrap(): Promise<void> {
  await runMigrations();

  const app = express();

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", router);

  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[server] API running on http://0.0.0.0:${PORT}/api`);
  });
}

bootstrap().catch((err) => {
  console.error("[server] Fatal startup error:", err);
  process.exit(1);
});
