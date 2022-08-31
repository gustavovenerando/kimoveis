import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { IAddressRequest } from "../interfaces/properties";
import Address from "./Address.entity";
import Category from "./Category.entity";
import ScheduleUserProperty from "./ScheduleUserProperty";

@Entity("properties")
class Property {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "decimal", precision: 12, scale: 2 })
	value: number;

	@Column({ type: "integer" })
	size: number;

	@Column({ default: false })
	sold: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	//Ao usar somnente a ManyToOne (sem adicionar OneToMany do outro lado da relacao), na base de dados o "Id" é colocado automaticamente no nome. Assim, no db fica categoryId. (fonte: typeORM documentation)
	@ManyToOne(() => Category, (categories) => categories.properties, {
		eager: true,
	})
	category: Category;

	@OneToMany(() => ScheduleUserProperty, (schedules) => schedules.property)
	schedules: ScheduleUserProperty[];

	@OneToOne(() => Address, { eager: true })
	@JoinColumn()
	address: IAddressRequest;
}

export default Property;
