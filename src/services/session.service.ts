import { compare } from "bcryptjs";
import AppDataSource from "../data-source";
import User from "../entities/User.entity";
import AppError from "../errors/AppError";
import { IUserLogin } from "../interfaces/users";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createSessionService = async ({
	email,
	password,
}: IUserLogin): Promise<string> => {
	const userRepository = AppDataSource.getRepository(User);

	const user = await userRepository.findOne({
		where: {
			email,
		},
	});

	if (!user) {
		throw new AppError(403, "Invalid email or password");
	}

	if (!user.isActive) {
		throw new AppError(400, "Invalid user");
	}

	const matchPassword = await compare(password, user.password);

	if (!matchPassword) {
		throw new AppError(403, "Invalid email or password");
	}

	const token = jwt.sign(
		{
			isAdm: user.isAdm,
			isActive: user.isActive,
		},
		process.env.SECRET_KEY as string,
		{
			subject: user.id,
			expiresIn: "2h",
		}
	);

	console.log(token);
	return token;
};
