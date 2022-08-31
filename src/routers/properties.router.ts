import { Router } from "express";
import {
	createPropertyController,
	listPropertyController,
} from "../controllers/properties.controller";
import validationAdmMiddleware from "../middlewares/validationAdm.middleware";
import { validationAuthMiddleware } from "../middlewares/validationAuth.middleware";
import validationPropertyCreateMiddleware, {
	propertyCreateSchema,
} from "../middlewares/validationPropertyCreate.middleware";

const propertiesRouter = Router();

propertiesRouter.get("", listPropertyController);
propertiesRouter.post(
	"",
	validationAuthMiddleware,
	validationAdmMiddleware,
	validationPropertyCreateMiddleware(propertyCreateSchema),
	createPropertyController
);

export default propertiesRouter;
