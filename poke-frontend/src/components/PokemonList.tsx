// react
import { useEffect, useState } from "react"
// api
import pokemonApi from "../api"
// types
import { Pokemon } from "../types"
// css
import "./css/PokemonList.css"

const PokemonList = ({
	hoveredPokemonId,
	selectedPokemonId,
	onPokemonHover,
	onPokemonClick,
}: {
	hoveredPokemonId?: number
	selectedPokemonId?: number
	onPokemonHover?: (id: number) => void
	onPokemonClick?: (id: number) => void
}) => {
	const [pokemons, setPokemons] = useState<Pokemon[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		pokemonApi.getPokemons().then((data: Pokemon[]) => {
			setPokemons(data)
			setLoading(false)
		})
	}, [])
	return (
		<div className="pokemon-list">
			{loading ? (
				<p>Loading...</p>
			) : (
				<ul>
					{pokemons.map((pokemon) => (
						<li
							key={pokemon.id}
							onMouseEnter={() =>
								onPokemonHover && onPokemonHover(pokemon.id)
							}
							onClick={() =>
								onPokemonClick && onPokemonClick(pokemon.id)
							}
							className={
								selectedPokemonId === pokemon.id
									? "selected"
									: hoveredPokemonId === pokemon.id
									? "hovered"
									: ""
							}
						>
							{pokemon.name}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default PokemonList
