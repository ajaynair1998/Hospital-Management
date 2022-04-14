import { database } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface IGeneralExamination
	extends Model<
		InferAttributes<IGeneralExamination>,
		InferCreationAttributes<IGeneralExamination>
	> {
	id: CreationOptional<number>;
	bp: string;
	temperature: string;
	oxygen_saturation: string;
	time: string;
}

const GeneralExamination = database.define<IGeneralExamination>(
	"GeneralExamination",
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			allowNull: false,
		},
		bp: {
			type: DataTypes.STRING,
		},
		temperature: {
			type: DataTypes.STRING,
		},
		oxygen_saturation: {
			type: DataTypes.STRING,
		},
		time: {
			type: DataTypes.STRING,
		},
	}
);

// `sequelize.define` also returns the model
console.log(GeneralExamination === database.models.GeneralExamination); // true
export default GeneralExamination;
