import { database } from "../../configs/sqlite";
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
	id: CreationOptional<number>;
	treatment_plan: string;
	treatment: string;
	time: string;
	treatmentDetailId?: number;
}

const TreatmentPlan = database.define<ITreatmentPlan>("TreatmentPlan", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	treatment_plan: {
		type: DataTypes.STRING(1000),
	},
	treatment: {
		type: DataTypes.STRING(1000),
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
	},
});

// `sequelize.define` also returns the model
console.log(TreatmentPlan === database.models.TreatmentPlan, "Treatment Plan"); // true
export default TreatmentPlan;
