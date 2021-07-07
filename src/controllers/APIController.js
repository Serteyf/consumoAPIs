const axios = require('axios');

const API = {
    autocapture: async (req, res) => {
        const response = await axios.post(
            'sandboxapi.7oc.cl/session-manager/v1/session-id',
            { apiKey: 'API_KEY', autocapture: true, liveness: true, fake_detector: true, mode: 1 },
            { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' }
        )
        if (response.status === 200) {
            return response.data
        }
        return console.log(`Error number: ${response.status}`)
    },
    liveness: async (req, res) => {
        const response = await axios.post(
            'sandboxapi.7oc.cl/session-manager/v1/session-id',
            { apiKey: 'API_KEY', liveness: true, mode: 1, autocapture: true, liveness_passive: true, use_small_image: true },
            { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' }
        )
        if (response.status === 200) {
            return response.data
        }
        return console.log(`Error number: ${response.status}`)
    }, 
    codeReader: async (req, res) => {
        const response = await axios.post(
            'https://sandbox-api.lodot.cl/v3/code-reader',
            { apiKey: 'API_KEY', id_front: req.body.token, documentType: req.body.selectedDoc},
            { 'Cache-Control': 'no-cache', 'Content-Type': 'multipart/form-data' }
        )
        if (response.status === 200) {
            return response.data
        }
        return console.log(`Error number: ${response.status}`)
    }, 
    faceAndDocument: async (req, res) => {
        const response = await axios.post(
            'https://sandbox-api.lodot.cl/v2/face-and-document',
            { apiKey: 'API_KEY', id_front: req.body.autocaptureToken, selfie: req.body.token, documentType: req.body.selectedDoc, sign_extract: 'false'},
            { 'Cache-Control': 'no-cache', 'Content-Type': 'multipart/form-data' }
        )
        if (response.status === 200) {
            return response.data
        }
        return console.log(`Error number: ${response.status}`)
    }, 
};

module.exports = API;








