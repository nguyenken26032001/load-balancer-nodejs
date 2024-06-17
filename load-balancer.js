const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const servers = [
  { url: "http://localhost:3001" },
  { url: "http://localhost:3002" },
  { url: "http://localhost:3003" },
];
const app = express();
const PORT = 4000;
const proxy = createProxyMiddleware({
  target: servers,
  changeOrigin: true,
  xfwd: true,
  router: (req) => {
    // Select backend server based on a simple round-robin algorithm
    const server = servers.shift();
    servers.push(server);
    console.log("Redirecting request to: " + server.url);
    return server.url;
  },
});

app.use("/load-balancer", (req, res) => res.send("Load Balancer"));
app.use(proxy);
app.listen(PORT, () => console.log(`Load balancer running on PORT ${PORT}`));
