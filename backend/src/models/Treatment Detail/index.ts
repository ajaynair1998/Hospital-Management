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
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	time: {
		type: DataTypes.STRING,
	},
	patientId: {
		type: DataTypes.INTEGER,
		references: {
			model: "Patients", // 'fathers' refers to table name
			key: "id", // 'id' refers to column name in fathers table
		},
		onDelete: "CASCADE",
	},
});

// `sequelize.define` also returns the model
console.log(
	TreatmentDetail === sequelize.models.TreatmentDetail,
	"Treatment Detail"
); // true
export default TreatmentDetail;
