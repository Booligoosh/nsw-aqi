const fs = require(`fs`);

module.exports = {
  devServer: {
    port: 2019,
    https:
      process.env.NODE_ENV === "production"
        ? false
        : {
            key: fs.readFileSync(`${process.env.HOME}/server.key`),
            cert: fs.readFileSync(`${process.env.HOME}/server.crt`),
            ca: fs.readFileSync(`${process.env.HOME}/rootCA.pem`)
          }
  },
  //   css: {
  //     loaderOptions: {
  //       sass: {
  //         prependData: `
  //                 @import "@/scss/_variables.scss";
  //                 `
  //       }
  //     }
  //   },
  pwa: {
    name: `NSW Air Quality Index`,
    themeColor: `#2d3f53`,
    manifestOptions: {
      start_url: `/`,
      short_name: `NSW AQI`,
      background_color: `#ffffff`
    },
    workboxOptions: {
      exclude: [`_redirects`, `_headers`, /\.map$/]
    }
  }
};
