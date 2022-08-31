import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	Timestamp,
	UpdateDateColumn,
} from "typeorm";
import Property from "./Property.entity";
import User from "./User.entity";

@Entity("schedules_users_properties")
class ScheduleUserProperty {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "date" })
	date: string;

	@Column({ type: "time" })
	hour: string;

	@ManyToOne(() => Property, (property) => property.schedules, {
		eager: true,
	})
	property: Property;

	@ManyToOne(() => User, { eager: true })
	user: User;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

export default ScheduleUserProperty;
