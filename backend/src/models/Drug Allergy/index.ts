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
	history: string;
	time: string;
}

const DrugAllergy = database.define<IDrugAllergy>("DrugAllergy", {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		allowNull: false,
	},
	history: {
		type: DataTypes.STRING(1000),
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(DrugAllergy === database.models.DrugAllergy); // true
export default DrugAllergy;
