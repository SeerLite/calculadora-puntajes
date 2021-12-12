import checker from "vite-plugin-checker"

export default {
	server: {
		port: 8000,
	},
	plugins: [
		checker({ typescript: true }),
	],
}
