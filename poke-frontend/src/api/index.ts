import apiClient from "./apiClient"
import { Pokemon } from "../types"

const pokemonAPI = {
	async getPokemons(): Promise<Pokemon[]> {
		const response = await apiClient.get("/pokemons")
		return response.data
	},
	async getPokemon(id: number): Promise<Pokemon> {
		const response = await apiClient.get(`/pokemons/${id}`)
		return response.data
	},
}

export default pokemonAPI
