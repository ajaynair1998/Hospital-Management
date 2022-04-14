import { database } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface IPastMedicalHistory
	extends Model<
		InferAttributes<IPastMedicalHistory>,
		InferCreationAttributes<IPastMedicalHistory>
	> {
	id: CreationOptional<number>;
	history: string;
	time: string;
}

const PastMedicalHistory = database.define<IPastMedicalHistory>(
	"PastMedicalHistory",
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
console.log(PastMedicalHistory === database.models.PastMedicalHistory); // true
export default PastMedicalHistory;
