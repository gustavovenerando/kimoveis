import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Property from "./Property.entity";

@Entity("categories")
class Category {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	name: string;

	@OneToMany(() => Property, (properties) => properties.category)
	properties: Property[];
}

export default Category;
