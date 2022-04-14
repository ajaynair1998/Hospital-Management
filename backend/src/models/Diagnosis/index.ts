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
	time: string;
}

const Diagnosis = database.define<IDiagnosis>("Diagnosis", {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		allowNull: false,
	},
	diagnosis: {
		type: DataTypes.STRING(1000),
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(Diagnosis === database.models.Diagnosis); // true
export default Diagnosis;
