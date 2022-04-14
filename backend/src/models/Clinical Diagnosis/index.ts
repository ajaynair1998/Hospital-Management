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
	time: string;
}
const ClinicalDiagnosis = database.define<IClinicalDiagnosis>(
	"ClinicalDiagnosis",
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER.UNSIGNED,
		},
		diagnosis: {
			type: DataTypes.STRING(1000),
		},
		time: {
			type: DataTypes.STRING,
		},
	}
);

// `sequelize.define` also returns the model
console.log(ClinicalDiagnosis === database.models.ClinicalDiagnosis); // true
export default ClinicalDiagnosis;
