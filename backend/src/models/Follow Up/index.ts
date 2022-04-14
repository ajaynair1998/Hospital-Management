import { database } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface IFollowUp
	extends Model<
		InferAttributes<IFollowUp>,
		InferCreationAttributes<IFollowUp>
	> {
	id: CreationOptional<number>;
	follow_up_text: string;
	follow_up_date: string;
	time: string;
}

const FollowUp = database.define<IFollowUp>("FollowUp", {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		allowNull: false,
	},
	follow_up_text: {
		type: DataTypes.STRING(1000),
	},
	follow_up_date: {
		type: DataTypes.STRING,
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(FollowUp === database.models.FollowUp); // true
export default FollowUp;
