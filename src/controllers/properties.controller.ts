import { Request, Response } from "express";
import { IPropertyRequest } from "../interfaces/properties";
import {
	createPropertyService,
	listPropertyService,
} from "../services/properties.service";

export const createPropertyController = async (req: Request, res: Response) => {
	const { value, size, address, categoryId }: IPropertyRequest = req.body;

	const property = await createPropertyService({
		value,
		size,
		address,
		categoryId,
	});

	return res.status(201).send(property);
};

export const listPropertyController = async (req: Request, res: Response) => {
	const property = await listPropertyService();

	return res.status(200).send(property);
};
