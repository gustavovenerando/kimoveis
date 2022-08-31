import { Router } from "express";
import {
	createScheduleController,
	listScheduleByPropertyController,
} from "../controllers/scheduleUserProperty.controller";
import validationAdmMiddleware from "../middlewares/validationAdm.middleware";
import { validationAuthMiddleware } from "../middlewares/validationAuth.middleware";
import validationSchedulesMiddleware from "../middlewares/validationSchedules.middleware";

const scheduleRouter = Router();

scheduleRouter.get(
	"/properties/:id",
	validationAuthMiddleware,
	validationAdmMiddleware,
	listScheduleByPropertyController
);
scheduleRouter.post(
	"",
	validationAuthMiddleware,
	validationSchedulesMiddleware,
	createScheduleController
);

export default scheduleRouter;
