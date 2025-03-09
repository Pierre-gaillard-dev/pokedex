import axios from "axios"

const apiClient = axios.create({
	baseURL: "http://pokedex.pierre-gaillard.mds-vannes.yt/api",
	headers: {
		"Content-Type": "application/json",
	},
})

export default apiClient
