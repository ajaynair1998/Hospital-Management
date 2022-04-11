import { database } from "../../configs/sqlite";
import { DataTypes } from "sequelize";

const PastDentalHistory = database.define("PastDentalHistory", {
	history: {
		type: DataTypes.STRING(500),
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(PastDentalHistory === database.models.PastDentalHistory); // true
export default PastDentalHistory;
