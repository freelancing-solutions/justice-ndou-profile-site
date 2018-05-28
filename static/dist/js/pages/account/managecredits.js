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
}else{

}

}catch (err){

}

var thisTransferBulkButt = document.getElementById('TransferBulkButt');
var thisTransferAdvertsButt = document.getElementById("TransferAdvertsButt");
var thisTransferSurveyButt = document.getElementById("TransferSurveyButt");
var thisTransferAffiliateButt = document.getElementById("TransferAffiliateButt");
thisTransferBulkButt.addEventListener("click", function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.getIdToken().then(function (accessToken) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var providerData = user.providerData;
                var struid = user.uid;

                var vstrChoice = 0;
                var vstrBulkCredits = document.getElementById('strBulkCredits').value;
                var vstrBulkTransferCredits = document.getElementById('strBulkTransferCredits').value;

                var dataString = '&vstrChoice=' + vstrChoice + '&vstrBulkCredits=' + vstrBulkCredits + '&vstrBulkTransferCredits=' + vstrBulkTransferCredits + '&vstrUserID=' + struid + '&vstrEmail=' + email + '&vstrAccessToken=' + accessToken;
                $.ajax({
                    type: "post",
                    url: "/accounts/credits",
                    data: dataString,
                    cache: false,
                    success: function (html) {
                        $('#TransferBulkINFDIV').html(html)
                    }
                });
            })
        }
    })
});



thisTransferAdvertsButt.addEventListener("click", function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.getIdToken().then(function (accessToken) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var providerData = user.providerData;
                var struid = user.uid;

                var vstrChoice = 1;
                var vstrAdvertsCredits = document.getElementById("strAdvertsCredits").value;
                var vstrAdvertsTransferCredits = document.getElementById("strAdvertsTransferCredits").value;
                var dataString = '&vstrChoice=' + vstrChoice + '&vstrAdvertsCredits=' + vstrAdvertsCredits + '&vstrAdvertsTransferCredits=' + vstrAdvertsTransferCredits + '&vstrUserID=' + struid + '&vstrEmail=' + email + '&vstrAccessToken=' + accessToken;
                $.ajax({
                    type: "post",
                    url: "/accounts/credits",
                    data: dataString,
                    cache: false,
                    success: function (data) {
                        $('#TransferAdvertsINFDIV').html(data)
                    }
                });
            })
        }
    })
});

thisTransferSurveyButt.addEventListener("click", function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.getIdToken().then(function (accessToken) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var providerData = user.providerData;
                var struid = user.uid;

                var vstrChoice = 2;
                var vstrSurveyCredits = document.getElementById("strSurveyCredits").value;
                var vstrSurveyTransferCredits = document.getElementById("strSurveyTransferCredits").value;
                var dataString = '&vstrChoice=' + vstrChoice + '&vstrSurveyCredits=' + vstrSurveyCredits + '&vstrSurveyTransferCredits=' + vstrSurveyTransferCredits + '&vstrUserID=' + struid + '&vstrEmail=' + email + '&vstrAccessToken=' + accessToken;
                $.ajax({
                    type: "post",
                    url: "/accounts/credits",
                    data: dataString,
                    cache: false,
                    success: function (data) {
                        $('#TransferSurveysINFDIV').html(data)

                    }
                });
            })
        }
    })
});
thisTransferAffiliateButt.addEventListener("click", function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.getIdToken().then(function (accessToken) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var providerData = user.providerData;
                var struid = user.uid;

                var vstrChoice = 3;
                var vstrAffiliateCredits = document.getElementById("strAffiliateCredits").value;
                var vstrAffiliateTransferCredits = document.getElementById("strAffiliateTransferCredits").value;
                var dataString = '&vstrChoice=' + vstrChoice + '&vstrAffiliateCredits=' + vstrAffiliateCredits + '&vstrAffiliateTransferCredits=' + vstrAffiliateTransferCredits + '&vstrUserID=' + struid + '&vstrEmail=' + email + '&vstrAccessToken=' + accessToken;

                $.ajax({
                    type: "post",
                    url: "/accounts/credits",
                    data: dataString,
                    cache: false,
                    success: function (data) {
                        $('#TransferAffiliateINFDIV').html(data)

                    }
                });

            })
        }
    })
});
