import { database } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface IFavourite
	extends Model<
		InferAttributes<IFavourite>,
		InferCreationAttributes<IFavourite>
	> {
	id?: CreationOptional<number>;
	data: string;
	category: string;
	time?: string;
}

const Favourite = database.define<IFavourite>("Favourite", {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		allowNull: false,
	},
	data: {
		type: DataTypes.STRING(1000),
	},
	category: {
		type: DataTypes.STRING,
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(Favourite === database.models.Favourite); // true
export default Favourite;
