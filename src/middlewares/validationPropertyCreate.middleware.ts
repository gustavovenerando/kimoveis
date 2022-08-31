import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import AppError from "../errors/AppError";
import { IPropertyRequest } from "../interfaces/properties";

export const propertyCreateSchema: SchemaOf<IPropertyRequest> = yup
	.object()
	.shape({
		value: yup.number().required(),
		size: yup.number().required(),
		address: yup
			.object({
				district: yup.string().required(),
				zipCode: yup.string().max(8).required(),
				number: yup.string(),
				city: yup.string().required(),
				state: yup.string().max(2).required(),
			})
			.required(),
		categoryId: yup.string().required(),
	});

const validationPropertyCreateMiddleware =
	(schema: SchemaOf<IPropertyRequest>) =>
	async (req: Request, res: Response, next: NextFunction) => {
		const data = req.body;

		try {
			const validatedData = await schema.validate(data, {
				abortEarly: false,
				stripUnknown: true,
			});

			next();
		} catch (err: any) {
			throw new AppError(400, err.errors?.join(", "));
		}
	};

export default validationPropertyCreateMiddleware;
