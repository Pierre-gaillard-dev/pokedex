import express from "express"
import dotenv from "dotenv"
import cors from "cors"
// db
import sequelize, { initDB } from "./config/database"
import "./models/index"
import { fillDB } from "./utils/fillDB"
// routes
import routes from "./routes"
// types
import types from "./utils/types"
types()

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

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
)
app.use(express.json())
app.use("/api", routes)
