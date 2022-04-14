import { database } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface IInvestigation
	extends Model<
		InferAttributes<IInvestigation>,
		InferCreationAttributes<IInvestigation>
	> {
	id: CreationOptional<number>;
	file: string;
	time: string;
}

const Investigation = database.define<IInvestigation>("Investigation", {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		allowNull: false,
	},
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
