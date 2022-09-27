import { database as sequelize } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface IPrescription
	extends Model<
		InferAttributes<IPrescription>,
		InferCreationAttributes<IPrescription>
	> {
	id?: CreationOptional<number>;
	treatmentDetailId?: number;
	frequency?: string;
	from?: string;
	to?: string;
	dosage?: string;
	medicine_name?: string;
	medicine_id?: number;
	duration?: string;
}

const Prescription = sequelize.define<IPrescription>("Prescription", {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	treatmentDetailId: {
		type: DataTypes.INTEGER,
		references: {
			model: "TreatmentDetails", // 'fathers' refers to table name
			key: "id", // 'id' refers to column name in fathers table
		},
		onDelete: "CASCADE",
	},
	medicine_name: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	duration: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	frequency: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	from: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	to: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	dosage: {
		type: DataTypes.STRING(255),
		allowNull: false,
		defaultValue: "{}",
	},
	medicine_id: {
		type: DataTypes.INTEGER,
		references: {
			model: "Medicines", // 'fathers' refers to table name
			key: "id", // 'id' refers to column name in fathers table
		},
		onDelete: "CASCADE",
	},
});

// `sequelize.define` also returns the model
console.log(Prescription === sequelize.models.Prescription, "Prescription"); // true
export default Prescription;
