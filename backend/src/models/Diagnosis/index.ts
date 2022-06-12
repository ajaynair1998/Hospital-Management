import { database } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";
export interface IDiagnosis
	extends Model<
		InferAttributes<IDiagnosis>,
		InferCreationAttributes<IDiagnosis>
	> {
	id: CreationOptional<number>;
	diagnosis: string;
	time?: string;
	details: string;
	treatmentDetailId?: number;
}
const Diagnosis = database.define<IDiagnosis>("Diagnosis", {
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
	},
});

// `sequelize.define` also returns the model
console.log(Diagnosis === database.models.Diagnosis, "Diagnosis"); // true
export default Diagnosis;
