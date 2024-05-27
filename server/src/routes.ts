import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import {
  createSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";

import {
  createPackageHandler,
  deletePackageHandler,
  getAllPackagesHandler,
  getPackageHandler,
  updatePackageHandler,
} from "./controller/package.controller";
import {
  createPackageSchema,
  requiredPackageSchema,
} from "./schema/package.schema";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createSessionHandler
  );

  app.get("/api/sessions", requireUser(), getUserSessionsHandler);

  app.delete("/api/sessions", requireUser(), deleteSessionHandler);

  app.get("/api/packages", requireUser(), getAllPackagesHandler);

  app.post(
    "/api/package",
    [requireUser(), validateResource(createPackageSchema)],
    createPackageHandler
  );
  app.get(
    "/api/package/:id",
    [requireUser(), validateResource(requiredPackageSchema)],
    getPackageHandler
  );
  app.put(
    "/api/package/:id",
    [requireUser(), validateResource(requiredPackageSchema)],
    updatePackageHandler
  );
  app.delete(
    "/api/package/:id",
    [requireUser(), validateResource(requiredPackageSchema)],
    deletePackageHandler
  );
}

export default routes;
