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
	time?: string;
	duration?: string;
	details?: string;
	treatmentDetailId?: number;
}

const PastMedicalHistory = database.define<IPastMedicalHistory>(
	"PastMedicalHistory",
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
	PastMedicalHistory === database.models.PastMedicalHistory,
	"Past Medical History"
); // true
export default PastMedicalHistory;
