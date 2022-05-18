import { database as sequelize } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface IChiefComplaint
	extends Model<
		InferAttributes<IChiefComplaint>,
		InferCreationAttributes<IChiefComplaint>
	> {
	id?: CreationOptional<number>;
	complaint: string;
	time?: string;
	duration: string;
	details: string;
	treatmentDetailId?: number;
}

const ChiefComplaint = sequelize.define<IChiefComplaint>("ChiefComplaint", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	complaint: {
		type: DataTypes.STRING(500),
	},
	duration: {
		type: DataTypes.STRING(500),
	},
	time: {
		type: DataTypes.STRING,
	},
	details: {
		type: DataTypes.STRING(1000),
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
console.log(
	ChiefComplaint === sequelize.models.ChiefComplaint,
	"CHief Complaint"
); // true
export default ChiefComplaint;
