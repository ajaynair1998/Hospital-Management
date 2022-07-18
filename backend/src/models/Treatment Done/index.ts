import { database as sequelize } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface ITreatmentDone
	extends Model<
		InferAttributes<ITreatmentDone>,
		InferCreationAttributes<ITreatmentDone>
	> {
	id?: CreationOptional<number>;
	treatment: string;
	time?: string;
	duration: string;
	details: string;
	treatmentDetailId?: number;
}

const TreatmentDone = sequelize.define<ITreatmentDone>("TreatmentDone", {
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
	},
});

// `sequelize.define` also returns the model
console.log(TreatmentDone === sequelize.models.TreatmentDone, "Treatment Done"); // true
export default TreatmentDone;
