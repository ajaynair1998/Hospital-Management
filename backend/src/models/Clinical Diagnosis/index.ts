import { database } from "../../configs/sqlite";
import { DataTypes } from "sequelize";

const ClinicalDiagnosis = database.define("ClinicalDiagnosis", {
	diagnosis: {
		type: DataTypes.STRING(1000),
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(ClinicalDiagnosis === database.models.ClinicalDiagnosis); // true
export default ClinicalDiagnosis;
