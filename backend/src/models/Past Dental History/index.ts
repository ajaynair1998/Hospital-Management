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
	treatmentDetailId?: number;
}

const PastDentalHistory = database.define<IPastDentalHistory>(
	"PastDentalHistory",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		history: {
			type: DataTypes.STRING(500),
		},
		time: {
			type: DataTypes.STRING,
		},
		treatmentDetailId: {
			type: DataTypes.INTEGER.UNSIGNED,
			references: {
				model: "TreatmentDetails", // 'fathers' refers to table name
				key: "id", // 'id' refers to column name in fathers table
			},
		},
	}
);

// `sequelize.define` also returns the model
console.log(
	PastDentalHistory === database.models.PastDentalHistory,
	"Past Dental History"
); // true
export default PastDentalHistory;
