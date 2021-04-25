// This settings are only for jest settings and not for webpack,
// build configs are located in webpack config files
module.exports = {
  env: {
    test: {
      plugins: [
        "react-loadable/babel",
        "@babel/plugin-syntax-dynamic-import"
      ],
      presets: [
        "@babel/preset-env",
        "@babel/preset-typescript",
        "@babel/preset-react"
      ]
    }
  }
};