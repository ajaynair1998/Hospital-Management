import { database } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";
export interface IClinicalDiagnosis
	extends Model<
		InferAttributes<IClinicalDiagnosis>,
		InferCreationAttributes<IClinicalDiagnosis>
	> {
	id: CreationOptional<number>;
	diagnosis: string;
	time?: string;
	details: string;
	treatmentDetailId?: number;
}
const ClinicalDiagnosis = database.define<IClinicalDiagnosis>(
	"ClinicalDiagnosis",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		diagnosis: {
			type: DataTypes.STRING(1000),
		},
		time: {
			type: DataTypes.STRING,
		},
		details: {
			type: DataTypes.STRING,
		},
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
	ClinicalDiagnosis === database.models.ClinicalDiagnosis,
	"Clinical Diagnosis"
); // true
export default ClinicalDiagnosis;
