import { database } from "../../configs/sqlite";
import { DataTypes } from "sequelize";

const Investigation = database.define("Investigation", {
	file: {
		type: DataTypes.STRING(1000),
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(Investigation === database.models.Investigation); // true
export default Investigation;
