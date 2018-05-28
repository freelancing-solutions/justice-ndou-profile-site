  // Initialize Firebase
try{
var config =
{
  apiKey: "AIzaSyCeSBAHvyUs12TkilAJJA2Hq8exbXdv3jI",
  authDomain: "easy-hosting.firebaseapp.com",
  databaseURL: "https://easy-hosting.firebaseio.com",
  projectId: "easy-hosting",
  storageBucket: "https://easy-hosting.appspot.com",
  messagingSenderId: "321876361624"
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
