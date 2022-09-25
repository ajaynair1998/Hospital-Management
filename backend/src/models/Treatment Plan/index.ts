import { database as sequelize } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface ITreatmentPlan
	extends Model<
		InferAttributes<ITreatmentPlan>,
		InferCreationAttributes<ITreatmentPlan>
	> {
	id?: CreationOptional<number>;
	treatment: string;
	time?: string;
	duration: string;
	details: string;
	treatmentDetailId?: number;
}

const TreatmentPlan = sequelize.define<ITreatmentPlan>("TreatmentPlan", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	treatment: {
		type: DataTypes.STRING(500),
	},
	duration: {
		type: DataTypes.STRING(500),
	},
	time: {
		type: DataTypes.STRING,
	},
	details: {
		type: DataTypes.STRING(1000),
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
console.log(TreatmentPlan === sequelize.models.TreatmentPlan, "Treatment Plan"); // true
export default TreatmentPlan;
