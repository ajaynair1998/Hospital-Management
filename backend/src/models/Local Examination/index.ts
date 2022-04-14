import { database } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface ILocalExamination
	extends Model<
		InferAttributes<ILocalExamination>,
		InferCreationAttributes<ILocalExamination>
	> {
	id: CreationOptional<number>;
	extra_oral: string;
	intra_oral: string;
	time: string;
}

const LocalExamination = database.define<ILocalExamination>(
	"LocalExamination",
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			allowNull: false,
		},
		extra_oral: {
			type: DataTypes.STRING,
		},
		intra_oral: {
			type: DataTypes.STRING,
		},
		time: {
			type: DataTypes.STRING,
		},
	}
);

// `sequelize.define` also returns the model
console.log(LocalExamination === database.models.LocalExamination); // true
export default LocalExamination;
