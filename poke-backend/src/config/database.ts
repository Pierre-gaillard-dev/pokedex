import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
	throw new Error("Missing DB_USER or DB_PASSWORD")
}

const sequelize = new Sequelize(
	"pokedex",
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: "localhost",
		dialect: "mariadb",
		dialectOptions: {
			timezone: "Etc/GMT-2",
		},
		logging: false,
	}
)

const dbSync = async () => {
	if (process.env.DB_RESET === "true") {
		return await sequelize.sync({ force: true })
	} else {
		return await sequelize.sync({ alter: true })
	}
}

const initDB = async () => {
	return await dbSync()
		.then(() => {
			console.log("Successfully connected to the database")
		})
		.catch((err) => {
			console.error("Unable to connect to the database:", err)
		})
}

export default sequelize
export { initDB }
