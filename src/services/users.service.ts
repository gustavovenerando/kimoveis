import { hash } from "bcryptjs";
import AppDataSource from "../data-source";
import User from "../entities/User.entity";
import AppError from "../errors/AppError";
import { IUserRequest } from "../interfaces/users";

export const createUserService = async ({
	name,
	email,
	isAdm,
	password,
}: IUserRequest): Promise<User> => {
	const userRepository = AppDataSource.getRepository(User);

	const userAlreadyExists = await userRepository.findOne({
		where: { email },
	});

	if (userAlreadyExists) {
		throw new AppError(400, "User already exists.");
	}

	const hashedPassword = await hash(password, 10);

	const user = userRepository.create({
		name,
		email,
		isAdm,
		password: hashedPassword,
	});

	await userRepository.save(user);

	return user;
};

export const listUserService = async (): Promise<User[]> => {
	const userRepository = AppDataSource.getRepository(User);

	const users = await userRepository.find();

	return users;
};

export const deleteUserService = async (
	id: string,
	isActive: boolean
): Promise<void> => {
	const userRepository = AppDataSource.getRepository(User);

	const user = await userRepository.findOneBy({ id });

	if (!user) {
		throw new AppError(404, "User doesnt exists");
	}

	if (!user.isActive) {
		throw new AppError(400, "Invalid user");
	}

	await AppDataSource.createQueryBuilder()
		.update(User)
		.set({ isActive: false })
		.where("id = :id", { id })
		.execute();
};
