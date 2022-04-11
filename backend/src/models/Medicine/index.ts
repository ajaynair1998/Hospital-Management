import { database } from "../../configs/sqlite";
import { DataTypes } from "sequelize";

const Medicine = database.define("Medicine", {
	medicine_type: {
		type: DataTypes.STRING,
	},
	medicine_name: {
		type: DataTypes.STRING,
	},
	frequency: {
		type: DataTypes.STRING,
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(Medicine === database.models.Medicine); // true
export default Medicine;
