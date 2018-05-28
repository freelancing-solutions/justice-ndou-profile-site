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

var thisLogOutButton = document.getElementById("LogOutButton");
thisLogOutButton.addEventListener("click", signOut);
  function signOut()
  {
        firebase.auth().signOut().then(function() {
          console.log('Signed Out');
          alert("Successfully signed out");
          thisLogOutButton.disabled = true;
        }, function(error) {
          console.error('Sign Out Error', error);
        });
  }
