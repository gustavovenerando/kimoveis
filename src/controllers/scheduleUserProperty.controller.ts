import { Request, Response } from "express";
import {
	createScheduleService,
	listScheduleByPropertyService,
} from "../services/scheduleUserProperty.service";

export const createScheduleController = async (req: Request, res: Response) => {
	const userId = req.user.id;

	const { propertyId, date, hour } = req.body;

	const scheduleDone = await createScheduleService({
		userId,
		propertyId,
		date,
		hour,
	});

	res.status(201).send({ message: "Schedule done." });
};

export const listScheduleByPropertyController = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;
	const property_id: string = id;

	const property = await listScheduleByPropertyService(property_id);

	res.status(200).send(property);
};
