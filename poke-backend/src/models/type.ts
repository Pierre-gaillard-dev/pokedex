import { Model, DataTypes } from "sequelize"
import sequelize from "../config/database"

class Type extends Model {
	public id!: number
	public name!: string
}

Type.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize,
		tableName: "types",
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	}
)

export default Type
