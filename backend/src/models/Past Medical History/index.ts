import { database } from "../../configs/sqlite";
import { DataTypes } from "sequelize";

const PastMedicalHistory = database.define("PastMedicalHistory", {
	history: {
		type: DataTypes.STRING(500),
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(PastMedicalHistory === database.models.PastMedicalHistory); // true
export default PastMedicalHistory;
