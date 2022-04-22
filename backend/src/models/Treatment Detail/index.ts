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
	id: CreationOptional<number>;
	time: string;
}

const TreatmentDetail = sequelize.define<ITreatmentDetail>("TreatmentDetail", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(TreatmentDetail === sequelize.models.TreatmentDetail); // true
export default TreatmentDetail;
