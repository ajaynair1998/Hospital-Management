import { database } from "../../configs/sqlite";
import { DataTypes } from "sequelize";

const FollowUp = database.define("FollowUp", {
	follow_up_text: {
		type: DataTypes.STRING(1000),
	},
	follow_up_date: {
		type: DataTypes.STRING,
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(FollowUp === database.models.FollowUp); // true
export default FollowUp;
