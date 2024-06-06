import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";
import http from "http";
import { WebSocketServer } from "./websockets";

const PORT = config.get<number>("port");

const app = express();

app.use(cors());

app.use(express.json());

app.use(deserializeUser);

const server = http.createServer(app);

server.listen(PORT, async () => {
  logger.info(`App is running at ${PORT}`);
  await connect();
  routes(app);
  app.use(errorHandler);
  WebSocketServer(server);
});
