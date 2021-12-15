import { defineConfig } from "vite"
import checker from "vite-plugin-checker"
import windicss from "vite-plugin-windicss"

export default defineConfig({
	base: "",
	server: {
		port: 8000,
	},
	plugins: [
		checker({
			typescript: true,
			eslint: {
				files: ["./ts"],
				extensions: [".ts"],
			}
		}),
		windicss(),
	],
})
