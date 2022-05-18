import { database } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface IInvestigation
	extends Model<
		InferAttributes<IInvestigation>,
		InferCreationAttributes<IInvestigation>
	> {
	id: CreationOptional<number>;
	file: string;
	time: string;
	treatmentDetailId?: number;
}

const Investigation = database.define<IInvestigation>("Investigation", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	file: {
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
console.log(Investigation === database.models.Investigation, "Investigation"); // true
export default Investigation;
