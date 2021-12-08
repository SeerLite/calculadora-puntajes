// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    css: "/css",
    ts: "/js",
    static: {url: "/", static: true},
  },
  plugins: [
    "@snowpack/plugin-postcss",
    "@snowpack/plugin-typescript",
  ],
  devOptions: {
    open: "none",
    tailwindConfig: "./tailwind.config.js",
    port: 8000,
  },
};
