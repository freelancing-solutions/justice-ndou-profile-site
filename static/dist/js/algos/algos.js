/**
let myHeaders = new Headers();
document.getElementById('strangeattractorsid').addEventListener("click", function (ev) {
   console.log(ev);
   let router = "strange";
   let mydata = '&route=' + router;
   let formresponse = document.getElementById('mainbodyinf');
   let myInit = {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors', credentials: 'same-origin',
                body: mydata,
                cache: 'no-cache'
   };
   let myrequest = new Request('/algorithms',myInit);
   fetch(myrequest).then(function (response) {
       if(!response.ok){
           console.log(response.statusText);
           formresponse.innerHTML = response.statusText;
       }else{
           response.text();
       }
   }).then(function (data) {
       formresponse.innerHTML = data;
   }).catch(function(error){
       formresponse.innerHTML = error;
       console.log(error);
   })

});
 **/
