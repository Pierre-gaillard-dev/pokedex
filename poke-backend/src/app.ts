import express from "express"
import dotenv from "dotenv"
//import sequelize from "./db/sequelize"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})

app.get("/", (req, res) => {
	res.send("Hello World!")
})
