import { database } from "../../configs/sqlite";
import { DataTypes } from "sequelize";

const TreatmentPlan = database.define("TreatmentPlan", {
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
