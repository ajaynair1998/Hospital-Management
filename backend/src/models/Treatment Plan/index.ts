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
}

const TreatmentPlan = database.define<ITreatmentPlan>("TreatmentPlan", {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		allowNull: false,
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
});

// `sequelize.define` also returns the model
console.log(TreatmentPlan === database.models.TreatmentPlan); // true
export default TreatmentPlan;
