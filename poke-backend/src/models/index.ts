import Pokemon from "./pokemon"
import Type from "./type"
import Rel_pokemonType from "./rel_pokemonType"

// définition des relations entre les tables
Pokemon.belongsToMany(Type, {
	through: Rel_pokemonType,
	foreignKey: "pokemon_id",
	otherKey: "type_id",
	as: "types",
})

Type.belongsToMany(Pokemon, {
	through: Rel_pokemonType,
	foreignKey: "type_id",
	otherKey: "pokemon_id",
	as: "pokemons",
})

Rel_pokemonType.belongsTo(Pokemon, {
	foreignKey: "pokemon_id",
	as: "pokemon",
})

Rel_pokemonType.belongsTo(Type, {
	foreignKey: "type_id",
	as: "type",
})

export { Pokemon, Type, Rel_pokemonType }
