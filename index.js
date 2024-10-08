const express = require("express");
const app = express();
const Myrouter = require("./router/routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
require("dotenv").config();

const PORT = 8080;

app.use("/", Myrouter);

app.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`);
});
