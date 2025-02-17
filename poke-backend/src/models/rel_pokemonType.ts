import { Model, DataTypes } from "sequelize"
import sequelize from "../config/database"

class Rel_pokemonType extends Model {
	public id!: number
	public pokemon_id!: string
	public type_id!: string
}

Rel_pokemonType.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		pokemon_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		type_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "rel_pokemon_types",
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	}
)

export default Rel_pokemonType
