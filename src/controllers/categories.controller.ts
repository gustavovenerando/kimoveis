import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import {
	createCategoryService,
	listCategoryService,
	listPropertiesByCategoryService,
} from "../services/categories.service";

export const createCategoryController = async (req: Request, res: Response) => {
	const { name }: ICategoryRequest = req.body;

	const category = await createCategoryService({ name });

	return res.status(201).send(category);
};

export const listCategoryController = async (req: Request, res: Response) => {
	const categories = await listCategoryService();

	return res.status(200).send(categories);
};

export const listPropertiesByCategoryController = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;

	const properties = await listPropertiesByCategoryService(id);

	return res.status(200).send(properties);
};
