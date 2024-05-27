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
import {
  createDeliveryHandler,
  deleteDeliveryHandler,
  getAllDeliveriesHandler,
  getDeliveryHandler,
  updateDeliveryHandler,
} from "./controller/delivery.controller";
import {
  createDeliverySchema,
  requiredDeliverySchema,
  updateDeliverySchema,
} from "./schema/delivery.schema";
import asyncWrapper from "./utils/asyncWrapper";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post(
    "/api/users",
    validateResource(createUserSchema),
    asyncWrapper(createUserHandler)
  );

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    asyncWrapper(createSessionHandler)
  );

  app.get("/api/sessions", requireUser(), asyncWrapper(getUserSessionsHandler));

  app.delete(
    "/api/sessions",
    requireUser(),
    asyncWrapper(deleteSessionHandler)
  );

  app.get("/api/package", requireUser(), asyncWrapper(getAllPackagesHandler));

  app.post(
    "/api/package",
    [requireUser(), validateResource(createPackageSchema)],
    asyncWrapper(createPackageHandler)
  );
  app.get(
    "/api/package/:id",
    [requireUser(), validateResource(requiredPackageSchema)],
    asyncWrapper(getPackageHandler)
  );
  app.put(
    "/api/package/:id",
    [requireUser(), validateResource(requiredPackageSchema)],
    asyncWrapper(updatePackageHandler)
  );
  app.delete(
    "/api/package/:id",
    [requireUser(), validateResource(requiredPackageSchema)],
    asyncWrapper(deletePackageHandler)
  );

  app.get(
    "/api/delivery",
    requireUser(),
    asyncWrapper(getAllDeliveriesHandler)
  );

  app.get(
    "/api/delivery/:id",
    [requireUser(), validateResource(requiredDeliverySchema)],
    asyncWrapper(getDeliveryHandler)
  );

  app.post(
    "/api/delivery",
    [requireUser(), validateResource(createDeliverySchema)],
    asyncWrapper(createDeliveryHandler)
  );

  app.put(
    "/api/delivery/:id",
    [requireUser(), validateResource(updateDeliverySchema)],
    asyncWrapper(updateDeliveryHandler)
  );
  app.delete(
    "/api/delivery/:id",
    [requireUser(), validateResource(requiredDeliverySchema)],
    asyncWrapper(deleteDeliveryHandler)
  );
}

export default routes;
