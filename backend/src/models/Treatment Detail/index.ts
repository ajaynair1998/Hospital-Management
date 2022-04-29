import { database as sequelize } from "../../configs/sqlite";
import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";

export interface ITreatmentDetail
	extends Model<
		InferAttributes<ITreatmentDetail>,
		InferCreationAttributes<ITreatmentDetail>
	> {
	id?: CreationOptional<number>;
	time?: string;
	patientId?: number;
}

const TreatmentDetail = sequelize.define<ITreatmentDetail>("TreatmentDetail", {
	id: {
		// type: DataTypes.UUID,
		// defaultValue: DataTypes.UUIDV4,
		// primaryKey: true,
		primaryKey: true,
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		allowNull: false,
	},
	time: {
		type: DataTypes.STRING,
	},
	patientId: {
		type: DataTypes.INTEGER.UNSIGNED,
		references: {
			model: "Patients", // 'fathers' refers to table name
			key: "id", // 'id' refers to column name in fathers table
		},
	},
});

// `sequelize.define` also returns the model
console.log(TreatmentDetail === sequelize.models.TreatmentDetail); // true
export default TreatmentDetail;
