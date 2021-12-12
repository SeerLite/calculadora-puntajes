import { defineConfig } from "windicss/helpers"

export default defineConfig({
	darkMode: true,
	extract: {
		include: [
			"./index.html",
			"./ts/**/*.ts",
		],
		exclude: [
			"./node_modules/**/*",
			"./.git/**/*",
		]
	},
});
