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
    // themeColor: `#e3e5e8`,
    // appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: {
      start_url: `/`
      // background_color: `#f1f2f4`
    },
    workboxOptions: {
      exclude: [`_redirects`, `_headers`]
    }
  }
};
