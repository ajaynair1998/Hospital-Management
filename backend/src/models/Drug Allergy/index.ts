import { database } from "../../configs/sqlite";
import { DataTypes } from "sequelize";

const DrugAllergy = database.define("DrugAllergy", {
	history: {
		type: DataTypes.STRING(1000),
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(DrugAllergy === database.models.DrugAllergy); // true
export default DrugAllergy;
