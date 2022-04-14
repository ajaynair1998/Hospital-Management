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
	id: CreationOptional<number>;
	complaint: string;
	time: string;
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
	time: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(ChiefComplaint === sequelize.models.ChiefComplaint); // true
export default ChiefComplaint;
