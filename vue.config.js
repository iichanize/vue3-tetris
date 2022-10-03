const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "docs",
  publicPath: "./",
  devServer: {
    port: process.env.PORT,
    allowedHost: ["vue3-tetris.herokuapp.com", "localhost"],
  },
});
