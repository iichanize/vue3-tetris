const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "dist",
  publicPath: "./",
  devServer: {
    host: "0.0.0.0",
  },
});
