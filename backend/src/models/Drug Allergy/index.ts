import { database } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface IDrugAllergy
	extends Model<
		InferAttributes<IDrugAllergy>,
		InferCreationAttributes<IDrugAllergy>
	> {
	id: CreationOptional<number>;
	allergy: string;
	details?: string;
	time?: string;
	treatmentDetailId?: number;
}

const DrugAllergy = database.define<IDrugAllergy>("DrugAllergy", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	allergy: {
		type: DataTypes.STRING(1000),
	},
	details: {
		type: DataTypes.STRING(1000),
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
});

// `sequelize.define` also returns the model
console.log(DrugAllergy === database.models.DrugAllergy, "Drug Allergy"); // true
export default DrugAllergy;
