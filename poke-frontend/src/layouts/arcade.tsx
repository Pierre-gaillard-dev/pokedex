// components
import ArcadeUi from "../ui/ArcadeUi"
// css
import "./css/Arcade.css"

const Arcade: React.FC = () => {
	return (
		<div className="arcade">
			<div className="arcade-part arcade-front">
				<div></div>
			</div>
			<div className="arcade-roof-container">
				<div className="arcade-part arcade-roof">
					<div></div>
				</div>
			</div>
			<div className="arcade-part">
				<div>
					<div className="arcade-screen">
						<ArcadeUi />
					</div>
				</div>
			</div>
			<div className="arcade-floor-container">
				<div className="arcade-part arcade-floor">
					<div className="arcade-buttons">
						<div className="button red"></div>
						<div className="button blue"></div>
						<div className="button yellow"></div>
					</div>
				</div>
			</div>
			<div className="arcade-part arcade-front">
				<div></div>
			</div>
		</div>
	)
}

export default Arcade
