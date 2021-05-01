var thisSendMessageButt = document.getElementById("SendMessageButt");
var thisContactFormButt = document.getElementById("ContactFormButt");
var thisSupportTicketsButt = document.getElementById("SupportTicketsButt");
var thisAddressButt = document.getElementById("AddressButt");
//Send Message Handler

thisSendMessageButt.addEventListener("click", function() {


                var route = 0;
                var names = document.getElementById('strnames').value;
                var cell = document.getElementById('strcell').value;
                var email = document.getElementById('stremail').value;
                var subject = document.getElementById('strsubject').value;
                var message = document.getElementById('strmessage').value;


                function verify_message() {

                    if (isEmpty(names) == true){

                        return false
                    }

                    if (isCell(cell) == false){
                        return false
                    }

                    if (validateEmail(email) == false){
                        return false
                    }

                    if (isEmpty(subject) == true){
                        return false
                    }

                    if (isEmpty(message) == true ){
                        return false
                    }

                    return true

                }


                if (verify_message()){
                    var dataString = '&vstrChoice=' + route + '&vstrNames=' + names + '&vstrCell=' + cell + '&vstrEmail=' + email +
                        '&vstrSubject=' + subject + '&vstrMessage=' + message;

                    $.ajax({
                        type: "post",
                        url: "/contact",
                        data: dataString,
                        cache: false,
                        success: function (html) {
                            $('#FormResponseDiv').html(html)
                        }
                    });
                }else{
                    response = document.getElementById("FormResponseDiv");
                    response.innerHTML = `<strong> Please complete all fields before you can send us a message</strong>`
                }
});





//Contact Form Handler
thisContactFormButt.addEventListener("click",function () {

                var vstrChoice = 1;
                var dataString = '&vstrChoice=' + vstrChoice ;
                $.ajax({
                    type: "post",
                    url: "/contact",
                    data: dataString,
                    cache: false,
                    success: function (html) {
                        $('#ContactINFDIV').html(html)
                    }
                });
    });
//Support Ticket Handler
thisSupportTicketsButt.addEventListener("click", function() {

    var vstrChoice = 2;
    var dataString = '&vstrChoice=' + vstrChoice;
    $.ajax({
        type: "post",
        url: "/contact",
        data: dataString,
        cache: false,
        success: function (html) {
            $('#ContactINFDIV').html(html)
        }
    });

});

thisAddressButt.addEventListener("click", function () {
                var vstrChoice = 4;
                var dataString = '&vstrChoice=' + vstrChoice;
                $.ajax({
                    type: "post",
                    url: "/contact",
                    data: dataString,
                    cache: false,
                    success: function (Response) {
                        $('#ContactINFDIV').html(Response)
                    }
                })
});
