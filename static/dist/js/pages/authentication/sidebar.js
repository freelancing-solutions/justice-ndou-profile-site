 
  // Initialize Firebase
try{
let config =
{
    apiKey: "AIzaSyAjcO6wmvJ29XNZrw50hFRLyXzkpN6GHL0",
    authDomain: "justice-ndou.firebaseapp.com",
    databaseURL: "https://justice-ndou.firebaseio.com",
    projectId: "justice-ndou",
    storageBucket: "justice-ndou.appspot.com",
    messagingSenderId: "956700057603"


};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}else { alert('firebase not initializing');
}
}catch (err){

}

function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    // [START_EXCLUDE silent]

    // [END_EXCLUDE]
    if (user) {
      // User is signed in.
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      // [START_EXCLUDE]
      document.getElementById('strSideUserImageID').src =photoURL;
      document.getElementById('strSideUserNameID').textContent =displayName;

      if (!emailVerified) {
          let route = 'email-not-verified';
          let mydata = "&route=" + route;
          let myInit = {
                    method: 'POST',
                    headers: myHeaders,
                    mode: 'cors', credentials: 'same-origin',
                    body: mydata,
                    cache: 'no-cache'
          };
          let myrequest = new Request('/login', myInit);
          let formresponse = document.getElementById('SideBarMenu');
          myFetch(myrequest,formresponse);
      }else
          {
          let route = 'email-verified';
          let mydata = "&route=" + route;
          let myInit = {
                    method: 'POST',
                    headers: myHeaders,
                    mode: 'cors', credentials: 'same-origin',
                    body: mydata,
                    cache: 'no-cache'
          };
          let myrequest = new Request('/login', myInit);
          let formresponse = document.getElementById('SideBarMenu');
          myFetch(myrequest,formresponse);

          }
      // [END_EXCLUDE]
    } else
        {
      // User is signed out.
          let route = 'user-not-loggedin';
          let mydata = "&route=" + route;
          let myInit = {
                    method: 'POST',
                    headers: myHeaders,
                    mode: 'cors', credentials: 'same-origin',
                    body: mydata,
                    cache: 'no-cache'
          };
          let myrequest = new Request('/login', myInit);
          let formresponse = document.getElementById('SideBarMenu');
          myFetch(myrequest,formresponse);
    }
  });
}
initApp();
