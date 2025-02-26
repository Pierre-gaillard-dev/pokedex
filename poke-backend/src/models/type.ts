import { Model, DataTypes } from "sequelize"
import sequelize from "../config/database"
import Pokemon from "./pokemon"

class Type extends Model {
	public id!: number
	public name!: string
	public image!: string

	public pokemons!: Pokemon[]
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
		image: {
			type: DataTypes.STRING,
			allowNull: true,
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
