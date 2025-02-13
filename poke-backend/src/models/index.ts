import fs from "fs"
import path from "path"

const basename = path.basename(__filename)

console.log("Initializing models")

const models: { [key: string]: any } = {}

fs.readdirSync(__dirname)
	.filter((file) => {
		return file !== basename && file.endsWith(".ts")
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))
		if (model.default) {
			const new_model = model.default
			models[model.default.name] = new_model
			console.log(`Model ${model.default.name} initialized`)
		}
	})
