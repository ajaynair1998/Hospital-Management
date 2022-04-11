import { database } from "../../configs/sqlite";
import { DataTypes } from "sequelize";

const Favourite = database.define("Favourite", {
	data: {
		type: DataTypes.STRING(1000),
	},
	category: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(Favourite === database.models.Favourite); // true
export default Favourite;
