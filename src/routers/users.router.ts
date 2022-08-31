import { Router } from "express";
import {
	createUserController,
	deleteUserController,
	listUserController,
} from "../controllers/users.controller";
import validationAdmMiddleware from "../middlewares/validationAdm.middleware";
import { validationAuthMiddleware } from "../middlewares/validationAuth.middleware";

const usersRouter = Router();

usersRouter.get(
	"",
	validationAuthMiddleware,
	validationAdmMiddleware,
	listUserController
);
usersRouter.post("", createUserController);
usersRouter.delete(
	"/:id",
	validationAuthMiddleware,
	validationAdmMiddleware,
	deleteUserController
);

export default usersRouter;
