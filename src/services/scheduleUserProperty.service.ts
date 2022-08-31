import AppDataSource from "../data-source";
import Property from "../entities/Property.entity";
import ScheduleUserProperty from "../entities/ScheduleUserProperty";
import User from "../entities/User.entity";
import AppError from "../errors/AppError";
import { IScheduleRequest } from "../interfaces/schedules";

export const createScheduleService = async ({
	userId,
	propertyId,
	date,
	hour,
}: IScheduleRequest): Promise<ScheduleUserProperty> => {
	const userRepositoy = AppDataSource.getRepository(User);
	const user = await userRepositoy.findOneBy({ id: userId });

	const propertyRepositoy = AppDataSource.getRepository(Property);
	const property = await propertyRepositoy.findOneBy({ id: propertyId });

	const scheduleRepository =
		AppDataSource.getRepository(ScheduleUserProperty);

	if (!user || !property) {
		throw new AppError(404, "User or Property not found");
	}

	const schedule = scheduleRepository.create({
		date,
		hour,
		user,
		property,
	});

	await scheduleRepository.save(schedule);

	return schedule;
};

export const listScheduleByPropertyService = async (property_id: string) => {
	const propertyRepository = AppDataSource.getRepository(Property);
	const scheduleRepository =
		AppDataSource.getRepository(ScheduleUserProperty);

	const property = await propertyRepository.findOne({
		where: { id: property_id },
		relations: { schedules: true },
	});

	if (!property) {
		throw new AppError(404, "Property not found");
	}

	return property;
};
