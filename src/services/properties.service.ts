import AppDataSource from "../data-source";
import Address from "../entities/Address.entity";
import Category from "../entities/Category.entity";
import Property from "../entities/Property.entity";
import AppError from "../errors/AppError";
import { IPropertyRequest } from "../interfaces/properties";

export const createPropertyService = async ({
	value,
	size,
	address,
	categoryId,
}: IPropertyRequest): Promise<Property> => {
	const propertyRepository = AppDataSource.getRepository(Property);
	const categoryRepository = AppDataSource.getRepository(Category);
	const addressRepository = AppDataSource.getRepository(Address);

	// if (address.state.length > 2 || address.zipCode.length > 8) {
	// 	throw new AppError(400, "State or ZipCode input not valid.");
	// }

	const properties = await propertyRepository.find();

	const categorySelected = await categoryRepository.findOne({
		where: { id: categoryId },
	});

	if (!categorySelected) {
		throw new AppError(404, "Category not found.");
	}

	const addressAlreadyExists = properties.find(
		(property) => property.address?.zipCode === address.zipCode
	);

	if (addressAlreadyExists) {
		throw new AppError(400, "Address already registered.");
	}

	const createdAddress = addressRepository.create({
		district: address.district,
		zipCode: address.zipCode,
		number: address.number,
		city: address.city,
		state: address.state,
	});

	await addressRepository.save(createdAddress);

	const property = propertyRepository.create({
		value,
		size,
		address: createdAddress,
		category: categorySelected,
	});

	await propertyRepository.save(property);

	return property;
};

export const listPropertyService = async (): Promise<Property[]> => {
	const propertyRepository = AppDataSource.getRepository(Property);

	const properties = await propertyRepository.find();

	return properties;
};
