import { database } from "../../configs/sqlite";
import { DataTypes } from "sequelize";

const GeneralExamination = database.define("GeneralExamination", {
	bp: {
		type: DataTypes.STRING,
	},
	temperature: {
		type: DataTypes.STRING,
	},
	oxygen_saturation: {
		type: DataTypes.STRING,
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(GeneralExamination === database.models.GeneralExamination); // true
export default GeneralExamination;
