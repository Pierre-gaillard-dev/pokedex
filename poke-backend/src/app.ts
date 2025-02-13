import express from "express"
import dotenv from "dotenv"
// db
import sequelize, { initDB } from "./config/database"
import "./models/index"
import { fillDB } from "./utils/fillDB"
// routes
import routes from "./routes"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

initDB().then(() => {
	if (process.env.DB_RESET === "true") {
		fillDB()
	}
})

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.use(express.json())
app.use("/api", routes)
