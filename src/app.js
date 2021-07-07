// Express
const express = require('express');
const app = express();

// CORS
const cors = require("cors");
app.use(cors('*'));

// Seteo EJS como el template engine
app.set("view engine", "ejs");
app.set("views", [__dirname + "/views",]);

// Seteo la carpeta public como estatica (js y css)
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
const APIRouter = require("./routes/APIRouter");

// Declare locals
app.locals.data = {};

// Servidor levantado en puerto 3000 (http://localhost:3000)
app.listen(3000, () => {
    console.log("Server running on port 3000.");
});

// Renderizo la vista principal
app.use("/", (req, res) => {
    res.render('index')
});

// Endpoints de APIs
app.use("/api", APIRouter);

