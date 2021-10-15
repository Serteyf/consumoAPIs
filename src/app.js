// Express
const express = require('express');
const app = express();
const PORT = 3000;

// CORS
const cors = require("cors");
app.use(cors('*'));

// app.set("views", [__dirname + "/views",]);

// Seteo la carpeta public como estatica (image, js y css)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server running on port 3000.");
});

// Routes
const APIRouter = require("./routes/APIRouter.js");
const mainRouter = require("./routes/mainRouter.js")


app.use("/", mainRouter);
app.use("/api", APIRouter);

app.use((req, res, next) => {
    res.status(404).send("not-found");
    next();
});



