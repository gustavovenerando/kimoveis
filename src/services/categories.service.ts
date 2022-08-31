import AppDataSource from "../data-source";
import Category from "../entities/Category.entity";
import Property from "../entities/Property.entity";
import AppError from "../errors/AppError";
import { ICategoryRequest } from "../interfaces/categories";

export const createCategoryService = async ({
	name,
}: ICategoryRequest): Promise<Category> => {
	const categoryRepository = AppDataSource.getRepository(Category);

	const categoryAlreadyExists = await categoryRepository.findOne({
		where: { name },
	});

	if (categoryAlreadyExists) {
		throw new AppError(400, "Category already exists.");
	}

	const category = categoryRepository.create({ name });

	await categoryRepository.save(category);

	return category;
};

export const listCategoryService = async (): Promise<Category[]> => {
	const categoryRepository = AppDataSource.getRepository(Category);

	const categories = await categoryRepository.find();

	return categories;
};

export const listPropertiesByCategoryService = async (
	id: string
): Promise<Category> => {
	const propertyRepository = AppDataSource.getRepository(Property);

	const categoryRepository = AppDataSource.getRepository(Category);

	const category = await categoryRepository.findOne({
		where: { id },
		relations: { properties: true },
	});

	if (!category) {
		throw new AppError(404, "Category not found.");
	}

	return category;
};
