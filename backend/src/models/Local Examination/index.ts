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
	time?: string;
	treatmentDetailId?: number;
}

const LocalExamination = database.define<ILocalExamination>(
	"LocalExamination",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		extra_oral: {
			type: DataTypes.STRING(1000),
		},
		intra_oral: {
			type: DataTypes.STRING(2000),
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
	}
);

// `sequelize.define` also returns the model
console.log(
	LocalExamination === database.models.LocalExamination,
	"Local Examination"
); // true
export default LocalExamination;
