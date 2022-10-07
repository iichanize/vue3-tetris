const { defineConfig } = require("@vue/cli-service");
const herokuPORT = process.env.PORT;
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "docs",
  publicPath: "./",
  devServer: {
    port: herokuPORT,
    allowedHosts: ["vue3-tetris.herokuapp.com", "localhost"],
    proxy: {
      "/ws": {
        target: "https://vue3-tetris.herokuapp.com",
        wss: true,
        changeOrigin: true,
      },
    },
  },
});
