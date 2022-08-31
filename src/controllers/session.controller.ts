import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users";
import { createSessionService } from "../services/session.service";

export const createSessionController = async (req: Request, res: Response) => {
	const { email, password }: IUserLogin = req.body;
	const token = await createSessionService({ email, password });

	return res.status(200).send({ token });
};
