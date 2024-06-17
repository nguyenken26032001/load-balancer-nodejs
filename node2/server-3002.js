const express = require("express");
const morgan = require("morgan");

const PORT = 3002;
const app = express();
app.use(morgan("tiny"));
morgan(":method :url :status :res[content-length] - :response-time ms");

app.use("/hello", (req, res) => res.send("Hello from server 2"));

app.listen(PORT, () => console.log(`Server 2 running on PORT ${PORT}`));
