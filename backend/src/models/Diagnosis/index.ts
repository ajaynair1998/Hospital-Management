import { database } from "../../configs/sqlite";
import { DataTypes } from "sequelize";

const Diagnosis = database.define("Diagnosis", {
	diagnosis: {
		type: DataTypes.STRING(1000),
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(Diagnosis === database.models.Diagnosis); // true
export default Diagnosis;
