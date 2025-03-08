import { useEffect, useState } from "react"
// types
import { Pokemon } from "../types"
// api
import pokemonAPI from "../api"
// css
import "./css/PokemonDetail.css"
import Carousel from "./Carousel"

const PokemonDetail = ({
	PokemonId,
	setPokemonId,
}: {
	PokemonId: number
	setPokemonId: (id: number) => any
}) => {
	const [pokemon, setPokemon] = useState<Pokemon | null>(null)
	const [familyId, setFamilyId] = useState<number | null>(null)
	const [evolutionImages, setEvolutionImages] = useState<string[]>([])

	useEffect(() => {
		pokemonAPI.getPokemonById(PokemonId).then((pokemon) => {
			setPokemon(pokemon)
		})
	}, [PokemonId])

	useEffect(() => {
		if (pokemon) {
			if (pokemon.family_id !== familyId) {
				setFamilyId(pokemon.family_id)
				setEvolutionImages([])
			}
			pokemon.family.pokemons.forEach((pokemon) => {
				pokemonAPI.getPokemonById(pokemon.id).then((pokemon) => {
					if (evolutionImages.includes(pokemon.picture)) return
					setEvolutionImages((images) => [...images, pokemon.picture])
				})
			})
		}
	}, [pokemon])

	const previousIndex = () => {
		if (pokemon && pokemon.family) {
			let newIndex =
				pokemon.family.pokemons.findIndex((a) => a.id === PokemonId) - 1
			if (newIndex < 0) {
				newIndex = 0
			}
			setPokemonId(pokemon.family.pokemons[newIndex].id)
		}
	}

	const nextIndex = () => {
		if (pokemon && pokemon.family) {
			let newIndex =
				pokemon.family.pokemons.findIndex((a) => a.id === PokemonId) + 1
			if (newIndex >= pokemon.family.pokemons.length) {
				newIndex = pokemon.family.pokemons.length - 1
			}
			setPokemonId(pokemon.family.pokemons[newIndex].id)
		}
	}

	return (
		<div className="pokemon-detail">
			{!pokemon && <p>Loading...</p>}
			<Carousel
				images={evolutionImages}
				index={
					pokemon && pokemon.family
						? pokemon.family.pokemons.findIndex(
								(a) => a.id === PokemonId
						  )
						: 0
				}
				previousIndex={previousIndex}
				nextIndex={nextIndex}
			/>
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
