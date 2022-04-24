// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/pokedex/" : "/pokedex/",
  outputDir: path.resolve(__dirname, "./docs"),
  assetsDir: ""
}
