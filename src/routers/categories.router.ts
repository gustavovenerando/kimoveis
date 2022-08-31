import { Router } from "express";
import {
	createCategoryController,
	listCategoryController,
	listPropertiesByCategoryController,
} from "../controllers/categories.controller";
import validationAdmMiddleware from "../middlewares/validationAdm.middleware";
import { validationAuthMiddleware } from "../middlewares/validationAuth.middleware";

const categoriesRouter = Router();

categoriesRouter.get("", listCategoryController);
categoriesRouter.get("/:id/properties", listPropertiesByCategoryController);
categoriesRouter.post(
	"",
	validationAuthMiddleware,
	validationAdmMiddleware,
	createCategoryController
);

export default categoriesRouter;
