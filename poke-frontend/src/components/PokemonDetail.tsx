import { useEffect, useState } from "react"
// types
import { Pokemon } from "../types"
// api
import pokemonAPI from "../api"
// css
import "./css/PokemonDetail.css"

const PokemonDetail = ({ PokemonId }: { PokemonId: number }) => {
	const [pokemon, setPokemon] = useState<Pokemon | null>(null)

	useEffect(() => {
		pokemonAPI.getPokemonById(PokemonId).then((pokemon) => {
			setPokemon(pokemon)
		})
	}, [PokemonId])

	return (
		<div className="pokemon-detail">
			<img src={pokemon?.picture}></img>
			<h2>{pokemon?.name}</h2>
			<div className="types">
				<h3>Types:</h3>
				<ul>
					{pokemon?.types.map((type) => (
						<li key={type.id}>{type.name}</li>
					))}
				</ul>
			</div>
			<div className="stats">
				<h3>Stats:</h3>
				<ul>
					<li>HP: {pokemon?.hp}</li>
					<li>CP: {pokemon?.cp}</li>
				</ul>
			</div>
		</div>
	)
}

export default PokemonDetail
