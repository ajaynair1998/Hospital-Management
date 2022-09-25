import { database } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";
export interface IHistoryOfComplaint
	extends Model<
		InferAttributes<IHistoryOfComplaint>,
		InferCreationAttributes<IHistoryOfComplaint>
	> {
	id: CreationOptional<number>;
	complaint: string;
	time?: string;
	details: string;
	treatmentDetailId?: number;
}
const HistoryOfComplaint = database.define<IHistoryOfComplaint>(
	"HistoryOfComplaint",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		complaint: {
			type: DataTypes.STRING(1000),
		},
		time: {
			type: DataTypes.STRING,
		},
		details: {
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
	HistoryOfComplaint === database.models.HistoryOfComplaint,
	"HistoryOfComplaint"
); // true
export default HistoryOfComplaint;
