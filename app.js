const express = require('express');
const session = require('express-session');

const app = express();

app.set("view engine", "ejs");
app.set("views", [__dirname + "/views",]);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "Mensaje secreto" }));

app.listen(3000, () => {
    console.log("Server running on port 3000.");
});

app.get('/', (req, res) => {
    res.render('index')
});
