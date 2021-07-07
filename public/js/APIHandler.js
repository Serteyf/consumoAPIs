// Forms
const docForm = document.getElementById('doc-form');
const livenessForm = document.getElementById('liveness-form');

// DIVs for SDK output
const autocaptureDiv = document.querySelector('.autocapture-div');
const livenessDiv = document.querySelector('.liveness-div');

// DIVs for images
const autocaptureImgDiv = document.querySelector('.autocapture-img');
const livenessImgDiv = document.querySelector('.liveness-img');

// Backend endpoints
const autocaptureURL = 'localhost:3000/api/autocapture';
const livenessURL = 'localhost:3000/api/liveness';
const codereaderURL = 'localhost:3000/api/codereader';
const faceanddocumentURL = 'localhost:3000/api/faceanddock';

//Initialization
let sd; // Selected document
let ct1; // Autocapture token
let img1; // Autocapture image

window.addEventListener('load', () => {
  
  // API Fetch
  const getSessionID = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {"Content-type": "multipart/form-data"},
    })
    if (res.ok) { 
      const data = await res.json();
      const sessionID = data.session_id;
      return sessionID;
    }
    console.error("HTTP-Error: " + res.status);
  }

  const getCodeReaderData = async () => {
    const res = await fetch(codereaderURL, {
      method: "GET",
      headers: {"Content-type": "multipart/form-data"},
    })
    if (res.ok) { 
      let data = await res.json();
      return data;
    }
    console.error("HTTP-Error: " + res.status);
  }

  const getFaceAndDocData = async () => {
    const res = await fetch(faceanddocumentUrl, {
      method: "GET",
      headers: {"Content-type": "multipart/form-data"},
    })
    if (res.ok) { 
      let data = await res.json();
      return data;
    }
    console.error("HTTP-Error: " + res.status);
}

  docForm.addEventListener("submit", (e) => {
    
    let selectedDoc = document.querySelector('#doc-select').value;

    autocapture(autocaptureDiv, {
      locale: "es",
      session_id: getSessionID(autocaptureURL),
      document_type: selectedDoc,
      document_side: "front",
      callback: function(captured_token1, image1){
        ct1 = captured_token1;
        img1 = image1;
        sd = selectedDoc;
        fetch(codereaderURL, {
          method: 'POST',
          body: JSON.stringify({token: ct1, docType:sd})
        }) 
      },
      failure: function(error){ alert(error); e.preventDefault();} }
    );

    const info1 = getCodeReaderData().information_from_document;
    if (info1.type !== sd){ // check other errors too
      e.preventDefault();
    }

    autocaptureDiv.innerHTML = '';
    // Submit autocapture IMG to view / TODO
    
    liveness(livenessDiv, {
      locale: "es",
      session_id: getSessionID(livenessURL),
      callback: function(token, image){
        img1 = image; 
        fetch(faceanddocumentURL, {
          method: 'POST',
          body: JSON.stringify({livenessToken: token, autocaptureToken: ct1, selectedDoc: sd})
        })
      },
      failure: function(error){ e.preventDefault(); }

    });

    livenessDiv.innerHTML = '';
    // Submit liveness IMG to view / TODO

    const biometricResults = getFaceAndDocData().biometric_results;
    const info2 = getFaceAndDocData().information_from_document;
    if (info2.type !== sd && biometricResults !== 1){
      e.preventDefault()
    }
    
    // Send succesful message / TODO




    
    
  })
  
  




 
})
  




