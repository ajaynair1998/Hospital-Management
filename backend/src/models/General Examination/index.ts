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
	time?: string;
	treatmentDetailId?: number;
}

const GeneralExamination = database.define<IGeneralExamination>(
	"GeneralExamination",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
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
	GeneralExamination === database.models.GeneralExamination,
	"General Examination"
); // true
export default GeneralExamination;
