import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import Property from "../entities/Property.entity";
import AppError from "../errors/AppError";
import { IScheduleMiddleware } from "../interfaces/schedules";

const validationSchedulesMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { propertyId, date, hour }: IScheduleMiddleware = req.body;
	const userId = req.user.id;

	const propertyRepository = AppDataSource.getRepository(Property);
	const property = await propertyRepository.findOne({
		where: { id: propertyId },
		relations: { schedules: true },
	});
	// console.log(property);
	if (!property) {
		throw new AppError(404, "Property not found.");
	}

	const allSchedulesByProperty = property.schedules;

	const [hourTime, minTime] = hour.split(":").map((elem) => +elem);
	const [year, month, day] = date.split("/").map((elem) => +elem);

	const dateObj = new Date(year, month - 1, day, hourTime, minTime);

	allSchedulesByProperty.forEach((schedule) => {
		const [hourTime, minTime] = schedule.hour
			.split(":")
			.map((elem) => +elem);
		const [year, month, day] = schedule.date
			.split("-")
			.map((elem) => +elem);

		const scheduleDateObj = new Date(
			year,
			month - 1,
			day,
			hourTime,
			minTime
		);

		if (scheduleDateObj.getTime() === dateObj.getTime()) {
			throw new AppError(
				400,
				"Property already have shedule for this date and hour."
			);
		}

		if (schedule.user.id === userId) {
			throw new AppError(
				400,
				"You already have a schedule in this property."
			);
		}
	});

	const startBusinessHour = new Date();
	startBusinessHour.setTime(0);
	startBusinessHour.setHours(8);

	const endBusinessHour = new Date();
	endBusinessHour.setTime(0);
	endBusinessHour.setHours(18);

	const scheduleHour = new Date();
	scheduleHour.setTime(0);
	scheduleHour.setHours(hourTime);
	scheduleHour.setMinutes(minTime);

	if (
		!(
			scheduleHour.getTime() >= startBusinessHour.getTime() &&
			scheduleHour.getTime() <= endBusinessHour.getTime()
		)
	) {
		throw new AppError(400, "Cannot make schedule outside business hours.");
	}

	if (dateObj.getDay() === 0 || dateObj.getDay() === 6) {
		throw new AppError(400, "Cannot make schedule outside workdays.");
	}

	next();
};

export default validationSchedulesMiddleware;
