import { defineConfig } from "windicss/helpers"

export default defineConfig({
	darkMode: "media",
	extract: {
		include: [
			"./index.html",
			"./ts/**/*.ts",
		],
	},
});
