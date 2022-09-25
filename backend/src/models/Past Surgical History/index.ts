import { database } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface IPastSurgicalHistory
	extends Model<
		InferAttributes<IPastSurgicalHistory>,
		InferCreationAttributes<IPastSurgicalHistory>
	> {
	id: CreationOptional<number>;
	history: string;
	time?: string;
	details?: string;
	duration?: string;
	treatmentDetailId?: number;
}

const PastSurgicalHistory = database.define<IPastSurgicalHistory>(
	"PastSurgicalHistory",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		history: {
			type: DataTypes.STRING(2000),
		},
		// time: {
		// 	type: DataTypes.STRING,
		// },
		// duration: {
		// 	type: DataTypes.STRING(500),
		// },
		// details: {
		// 	type: DataTypes.STRING(1000),
		// },
		treatmentDetailId: {
			type: DataTypes.INTEGER.UNSIGNED,
			references: {
				model: "TreatmentDetails", // 'fathers' refers to table name
				key: "id", // 'id' refers to column name in fathers table
			},
			onDelete: "CASCADE",
		},
	}
);

// `sequelize.define` also returns the model
console.log(
	PastSurgicalHistory === database.models.PastSurgicalHistory,
	"Past Surgical History"
); // true
export default PastSurgicalHistory;
