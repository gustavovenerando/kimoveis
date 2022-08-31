import { Exclude } from "class-transformer";
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import ScheduleUserProperty from "./ScheduleUserProperty";

@Entity("users")
class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	isAdm: boolean;

	@Column({ default: true })
	isActive: boolean;

	@Column()
	@Exclude()
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany(() => ScheduleUserProperty, (schedules) => schedules.user)
	schedules: ScheduleUserProperty[];
}

export default User;
