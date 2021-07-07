const sessionIdUrl = 'https://sandboxapi.7oc.cl/session-manager/v1/session-id';
const faceAndDocumentUrl = 'https://sandbox-api.lodot.cl/v2/face-and-document';
const faceAndTokenUrl = 'https://sandbox-api.lodot.cl/v2/face-and-token';
const faceAndFaceUrl = 'https://sandbox-api.lodot.cl/v2/face-and-face';
const codeReaderURl = 'https://sandbox-api.lodot.cl/v3/code-reader';

const docForm = document.getElementById('doc-form');
const autocaptureFrontDiv = document.querySelector('.autocapture-front');
const autocaptureBackDiv = document.querySelector('.autocapture-back');
const livenessDiv = document.querySelector('.liveness')
const autoCaptureID = getSessionID({apiKey: 'API_KEY', autocapture: 'true', liveness: 'true', fake_detector: 'true'});
const livenessID = getSessionID({ apiKey: 'API_KEY', liveness: true, mode: 1, autocapture: true, liveness_passive: true, use_small_image: true });
let ct1;
let ct2;
let sd;


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

  docForm.addEventListener("submit", (e) => {
    const selectedDoc = document.querySelector('#doc-select').value;
    return sd = selectedDoc;
  });
  autocapture(autocaptureFrontDiv, {
    locale: "es",
    session_id: autoCaptureID,
    document_type: sd,
    document_side: "front",
    callback: function(captured_token1, image1){ return ct1 = captured_token1; },
    failure: function(error){ alert(error); e.preventDefault();} }
  );
  autocaptureFrontDiv.innerHTML = '';

  autocapture(autocaptureBackDiv, {
    locale: "es",
    session_id: autoCaptureID,
    document_type: sd,
    document_side: "back",
    callback: function(captured_token2, image2){ return token },
    failure: function(error){ alert(error);} 
  });
  autocaptureBackDiv.innerHTML = '';

  const info = getCodeReaderData(ct1, ct2, sd).information_from_document;
  if (info.type !== sd){
    location.reload();
  }

  liveness(livenessDiv, {
    locale: "es",
    session_id: livenessID,
    callback: function(token, image){ 
      const biometricResults = getFaceAndDoc(ct1, ct2, token, sd).biometric_result;
      if(biometricResults === -1) e.preventDefault();
      else if(biometricResults === 1){'Success!'}
    },
    failure: function(error){ alert(error); }

    
    
  })
  
  




 
})
  




