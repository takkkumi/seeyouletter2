module.exports = {
    reactStrictMode: true,
    trailingSlash: true,
    // ここから
    webpackDevMiddleware: config => {

        config.watchOptions = {
            poll: 800,
            aggregateTimeout: 300,
        }
        return config
    },
    // ここまで
}