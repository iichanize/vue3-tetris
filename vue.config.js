const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "docs",
  publicPath: "./",
  devServer: {
    port: process.env.PORT,
    allowedHosts: ["vue3-tetris.herokuapp.com", "localhost"],
  },
});
