import { useState } from "react"
//components
import PokemonList from "../components/PokemonList"
// css
import "./css/ArcadeUi.css"
import PokemonDetail from "../components/PokemonDetail"

const ArcadeUi = () => {
	const [hoveredPokemonId, setHoveredPokemonId] = useState<number>(0)
	const [selectedPokemonId, setSelectedPokemonId] = useState<
		number | undefined
	>(undefined)
	const handlePokemonHover = (id: number) => {
		setHoveredPokemonId(id)
	}
	const handlePokemonClick = (id: number) => {
		setSelectedPokemonId(id)
	}

	return (
		<div className="arcade-ui screen">
			<div className="container">
				<PokemonList
					hoveredPokemonId={hoveredPokemonId}
					selectedPokemonId={selectedPokemonId}
					onPokemonHover={handlePokemonHover}
					onPokemonClick={handlePokemonClick}
				/>
			</div>
			{selectedPokemonId && (
				<div className="container">
					<PokemonDetail
						PokemonId={selectedPokemonId}
						setPokemonId={setSelectedPokemonId}
					/>
				</div>
			)}
		</div>
	)
}

export default ArcadeUi
