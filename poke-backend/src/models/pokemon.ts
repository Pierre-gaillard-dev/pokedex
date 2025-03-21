import { Model, DataTypes } from "sequelize"
import sequelize from "../config/database"
import PokemonFamily from "./pokemonFamily"
import Type from "./type"

class Pokemon extends Model {
	public id!: number
	public name!: string
	public hp!: number
	public cp!: number
	public picture!: string

	public family_id!: number
	public family!: PokemonFamily
	public evolutions!: Pokemon[]
	public types!: Type[]
}

Pokemon.init(
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
		hp: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		cp: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		picture: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "pokemons",
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	}
)

export default Pokemon
