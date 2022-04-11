import { database } from "../../configs/sqlite";
import { DataTypes } from "sequelize";

const LocalExamination = database.define("LocalExamination", {
	extra_oral: {
		type: DataTypes.STRING,
	},
	intra_oral: {
		type: DataTypes.STRING,
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(LocalExamination === database.models.LocalExamination); // true
export default LocalExamination;
