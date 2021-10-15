const path = require("path")

mainController = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/index.html'));
    },
    selectorDeDocumento: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/selectorDeDocumento.html'));
    },
    capturaFrente: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/capturaFrente.html'));
    },
    capturaDorso: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/capturaDorso.html'));
    },
    liveness: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/liveness.html'));
    },
    verificacion: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/verificacion.html'));
    },
}

module.exports = mainController