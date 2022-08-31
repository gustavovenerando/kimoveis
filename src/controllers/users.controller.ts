import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users/index";
import {
	createUserService,
	deleteUserService,
	listUserService,
} from "../services/users.service";

export const createUserController = async (req: Request, res: Response) => {
	const { name, email, isAdm, password }: IUserRequest = req.body;

	const user = await createUserService({ name, email, isAdm, password });

	return res.status(201).send(instanceToPlain(user));
};

export const listUserController = async (req: Request, res: Response) => {
	const users = await listUserService();

	return res.status(200).send(instanceToPlain(users));
};

export const deleteUserController = async (req: Request, res: Response) => {
	const { id } = req.params;
	const isActive: boolean = req.user.isActive;

	await deleteUserService(id, isActive);

	return res.status(204).send({ message: "User deleted sucessfully." });
};
