import checker from "vite-plugin-checker"
import WindiCSS from "vite-plugin-windicss"

export default {
	server: {
		port: 8000,
	},
	plugins: [
		checker({ typescript: true }),
		WindiCSS(),
	],
}
