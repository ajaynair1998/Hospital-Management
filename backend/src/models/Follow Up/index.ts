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
	follow_up_date: Date;
	time?: string;
	purpose: string;
	treatmentDetailId?: number;
}

const FollowUp = database.define<IFollowUp>("FollowUp", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	follow_up_text: {
		type: DataTypes.STRING(1000),
	},
	follow_up_date: {
		type: DataTypes.DATE,
	},
	purpose: {
		type: DataTypes.STRING(100),
	},
	time: {
		type: DataTypes.STRING,
	},
	treatmentDetailId: {
		type: DataTypes.INTEGER.UNSIGNED,
		references: {
			model: "TreatmentDetails", // 'fathers' refers to table name
			key: "id", // 'id' refers to column name in fathers table
		},
		onDelete: "CASCADE",
	},
});

// `sequelize.define` also returns the model
console.log(FollowUp === database.models.FollowUp, "Follow Up"); // true
export default FollowUp;
