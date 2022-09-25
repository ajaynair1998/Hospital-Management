import { database } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface IMedicine
	extends Model<
		InferAttributes<IMedicine>,
		InferCreationAttributes<IMedicine>
	> {
	id: CreationOptional<number>;
	medicine_name: string;
	medicine_type: string;
	frequency: string;
	time: string;
	treatmentDetailId?: number;
}

const Medicine = database.define<IMedicine>("Medicine", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	medicine_type: {
		type: DataTypes.STRING,
	},
	medicine_name: {
		type: DataTypes.STRING,
	},
	frequency: {
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
});

// `sequelize.define` also returns the model
console.log(Medicine === database.models.Medicine, "Medicine"); // true
export default Medicine;
