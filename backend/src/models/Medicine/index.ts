import { database } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface IMedicine
	extends Model<
		InferAttributes<IMedicine>,
		InferCreationAttributes<IMedicine>
	> {
	id: CreationOptional<number>;
	name?: string;
	strength?: string;
	medicine_form?: string;
	description?: string;
	time?: string;
}

const Medicine = database.define<IMedicine>("Medicine", {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
	},
	strength: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.STRING,
	},
	medicine_form: {
		type: DataTypes.STRING,
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(Medicine === database.models.Medicine, "Medicine"); // true
export default Medicine;
