  // Initialize Firebase
try{
var config =
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
}else {
}
}catch (err){
}
  var uiConfig = {
	signInSuccessUrl: 'https://easyhosting.site',
	signInOptions: [
	  // Leave the lines as is for the providers you want to offer your users.
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.GoogleAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl: 'https://sa-sms.appspot.com'
  };
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
