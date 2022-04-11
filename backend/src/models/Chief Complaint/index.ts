import { database } from "../../configs/sqlite";
import { DataTypes } from "sequelize";

const ChiefComplaint = database.define("ChiefComplaint", {
	complaint: {
		type: DataTypes.STRING(500),
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(ChiefComplaint === database.models.ChiefComplaint); // true
export default ChiefComplaint;
