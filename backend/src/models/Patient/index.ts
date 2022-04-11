import { database } from "../../configs/sqlite";
import { DataTypes } from "sequelize";

const Patient = database.define(
	"Patient",
	{
		// Model attributes are defined here
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		time: {
			type: DataTypes.STRING,
			// allowNull: false,
		},
		date: {
			type: DataTypes.STRING,
			// allowNull: false,
			// allowNull defaults to true
		},
		image: {
			type: DataTypes.BLOB("long"),
		},
		nationality: {
			type: DataTypes.STRING,
		},
		age: {
			type: DataTypes.NUMBER,
		},
		date_of_birth: {
			type: DataTypes.STRING,
		},
		gender: {
			type: DataTypes.ENUM({ values: ["male", "female", "other"] }),
		},
		address: {
			type: DataTypes.STRING(500),
		},
		blood_group: {
			type: DataTypes.STRING,
		},
		phone_number: {
			type: DataTypes.STRING,
		},
		mobile_number: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		marital_status: {
			type: DataTypes.STRING,
		},
		occupation: {
			type: DataTypes.STRING,
		},
		doctor_name: {
			type: DataTypes.STRING,
		},
		purpose: {
			type: DataTypes.STRING,
		},
		reffered_by: {
			type: DataTypes.STRING,
		},
	},
	{
		// Other model options go here
	}
);

// `sequelize.define` also returns the model
console.log(Patient === database.models.Patient); // true

export default Patient;
