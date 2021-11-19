const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
    app.use(
        "/v1/",
        createProxyMiddleware({
            target: "https://api.pullgo.kr",
            changeOrigin: true
        })
    );
    app.use(
        "/1/",
        createProxyMiddleware({
            target: "https://api.imgbb.com",
            changeOrigin: true
        })
    );
};
