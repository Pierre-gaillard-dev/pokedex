import { Model, DataTypes } from "sequelize"
import sequelize from "../config/database"
import Pokemon from "./pokemon"

class PokemonFamily extends Model {
	public id!: number

	public pokemons!: Pokemon[]
}

PokemonFamily.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
	},
	{
		sequelize,
		tableName: "pokemon_families",
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	}
)

export default PokemonFamily
