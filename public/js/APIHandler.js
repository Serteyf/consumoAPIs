const { liveness } = require("../../src/controllers/APIController");

const sessionIdUrl = 'https://sandboxapi.7oc.cl/session-manager/v1/session-id';
const faceAndDocumentUrl = 'https://sandbox-api.lodot.cl/v2/face-and-document';
const faceAndTokenUrl = 'https://sandbox-api.lodot.cl/v2/face-and-token';
const faceAndFaceUrl = 'https://sandbox-api.lodot.cl/v2/face-and-face';
const codeReaderURl = 'https://sandbox-api.lodot.cl/v3/code-reader';

const docForm = document.getElementById('doc-form');
const frontForm = document.getElementById('front-form');
const backForm = document.getElementById('back-form');

function getSessionID(params){
  let sessionId;
  const sessionIdResponse = await fetch(sessionIdUrl, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {"Content-type": "multipart/form-data"},
  })
  if (sessionIdResponse.ok) { 
    let data = await sessionIdResponse.json();
    sessionId = data.session_id;
    return sessionId;
  } else console.error("HTTP-Error: " + response.status);
}
function getFaceAndDoc(idFront, idBack, selfie, docType){
  const faceAndDocResponse = await fetch(faceAndDocumentUrl, {
    method: "POST",
    body: JSON.stringify({ apiKey: 'API_KEY', id_front: idFront, id_back: idBack, documentType: docType, selfie: selfie, sign_extract: 'false'}),
    headers: {"Content-type": "multipart/form-data"},
  })
  if (faceAndDocResponse.ok) { 
    let data = await faceAndDocResponse.json();
    return data;
  } else console.error("HTTP-Error: " + faceAndDocResponse.status);
}
function getCodeReaderData(idFront, idBack, docType){
  const codeReaderResponse = await fetch(codeReaderURl, {
    method: "POST",
    body: JSON.stringify({ apiKey: 'API_KEY', id_front: idFront, id_back: idBack, documentType: docType}),
    headers: {"Content-type": "multipart/form-data"},
  })
  if (sessionIdResponse.ok) { 
    let data = await codeReaderResponse.json();
    return data;
  } else console.error("HTTP-Error: " + sessionIdResponse.status);
}
window.addEventListener('load',async () => {

  const autoCaptureID = getSessionID({apiKey: 'API_KEY', autocapture: 'true', liveness: 'true', fake_detector: 'true'});
  const livenessID = getSessionID({ apiKey: 'API_KEY', liveness: true, mode: 1, autocapture: true, liveness_passive: true, use_small_image: true });
  
  docForm.addEventListener("submit", () => {
    const selectedDoc = document.querySelector('#doc-select').value;
    const autocaptureFrontDiv = document.querySelector('.autocapture-front');
    const autocaptureBackDiv = document.querySelector('.autocapture-back');
    const livenessDiv = document.querySelector('.liveness')

    frontForm.addEventListener('submit', () => {
      autocapture(autocaptureFrontDiv, {
        locale: "es",
        session_id: autoCaptureID,
        document_type: selectedDoc,
        document_side: "front",
        callback: function(captured_token1, image1){ alert(token1); },
        failure: function(error){ alert(error); } }
      );
    })
    autocaptureFrontDiv.innerHTML = '';

    backForm.addEventListener('submit', () => {
      autocapture(autocaptureBackDiv, {
        locale: "es",
        session_id: autoCaptureID,
        document_type: selectedDoc,
        document_side: "back",
        callback: function(captured_token2, image2){ alert(token2); },
        failure: function(error){ alert(error); } }
      );
    })
    autocaptureBackDiv.innerHTML = '';

    const info = getCodeReaderData(captured_token1, captured_token2, selectedDoc).information_from_document;
    if (info.type !== selectedDoc){
      location.reload();
    }

    liveness(livenessDiv, {
      locale: "es",
      session_id: livenessID,
      callback: function(token, image){ 
        const biometricResults = getFaceAndDoc(idFront, idBack, token, selectedDoc).biometric_result;
        if(biometricResults === -1) location.reload();
        else if(biometricResults === 1){'Success!'}
      },
      failure: function(error){ alert(error); }
    });

    
    
  })
  
  




 
})
  




