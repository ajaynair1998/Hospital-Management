import { database } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface IPastDentalHistory
	extends Model<
		InferAttributes<IPastDentalHistory>,
		InferCreationAttributes<IPastDentalHistory>
	> {
	id: CreationOptional<number>;
	history: string;
	time: string;
}

const PastDentalHistory = database.define<IPastDentalHistory>(
	"PastDentalHistory",
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			allowNull: false,
		},
		history: {
			type: DataTypes.STRING(500),
		},
		time: {
			type: DataTypes.STRING,
		},
	}
);

// `sequelize.define` also returns the model
console.log(PastDentalHistory === database.models.PastDentalHistory); // true
export default PastDentalHistory;
