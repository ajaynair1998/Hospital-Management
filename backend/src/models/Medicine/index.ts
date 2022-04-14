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
	medicine_name: string;
	medicine_type: string;
	frequency: string;
	time: string;
}

const Medicine = database.define<IMedicine>("Medicine", {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		allowNull: false,
	},
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
