export interface IScheduleRequest {
	userId: string;
	propertyId: string;
	date: string;
	hour: string;
}

export interface IScheduleMiddleware {
	propertyId: string;
	date: string;
	hour: string;
}
