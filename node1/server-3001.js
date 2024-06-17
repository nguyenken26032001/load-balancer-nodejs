const express = require("express");
const morgan = require("morgan");

const PORT = 3001;
const app = express();
app.use(morgan("tiny"));
morgan(":method :url :status :res[content-length] - :response-time ms");

app.use("/hello", (req, res) => res.send("Hello from server 1"));

app.listen(PORT, () => console.log(`Server 1 running on PORT ${PORT}`));
