const express = require("express");
const morgan = require("morgan"); // show logs requests
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

const SERVER_LOAD_BALANCER = "http://localhost:4000/";
app.use(morgan("tiny"));
morgan(":method :url :status :res[content-length] - :response-time ms");
const port = 3000;
const proxy = createProxyMiddleware({
  target: SERVER_LOAD_BALANCER,
  changeOrigin: true,
  xfwd: true,
});

app.use("/api", proxy);
app.use("/", (req, res) => res.send("API GATEWAY"));

app.listen(port, () => {
  console.log(`API GATEWAY running on PORT http://localhost:${port}`);
});
