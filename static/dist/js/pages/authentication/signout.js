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
