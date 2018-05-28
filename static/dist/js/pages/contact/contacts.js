var thisSendMessageButt = document.getElementById("SendMessageButt");
var thisContactFormButt = document.getElementById("ContactFormButt");
var thisSupportTicketsButt = document.getElementById("SupportTicketsButt");
var thisAddressButt = document.getElementById("AddressButt");
//Send Message Handler
thisSendMessageButt.addEventListener("click", function() {


                var vstrChoice = 0;
                var varstrNames = document.getElementById('strnames').value;
                var varstrCell = document.getElementById('strcell').value;
                var varstrEmail = document.getElementById('stremail').value;
                var varstrsubject = document.getElementById('strsubject').value;
                var varstrmessage = document.getElementById('strmessage').value;

                var dataString = '&vstrChoice=' + vstrChoice + '&vstrNames=' + varstrNames + '&vstrCell=' + varstrCell + '&vstrEmail=' + varstrEmail +
                    '&vstrSubject=' + varstrsubject + '&vstrMessage=' + varstrmessage;
                $.ajax({
                    type: "post",
                    url: "/contact",
                    data: dataString,
                    cache: false,
                    success: function (html) {
                        $('#FormResponseDiv').html(html)
                    }
                });
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
