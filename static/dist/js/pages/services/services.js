const hireme_fields = document.getElementsByName('hireme');
function verify(){
    for (i = 0; i < hireme_fields.length; i++){
        if ((hireme_fields[i].value === null) || (hireme_fields[i].value === "")){
            return false
        } else{
            return true
        }
    }
}


document.getElementById('hiremesend').addEventListener("click", function () {

    if (verify() === true){
        const route = "hireme";
        const names = document.getElementById('namesid').value;
        const cell = document.getElementById('cellid').value;
        const email = document.getElementById('emailid').value;
        const website = document.getElementById('websiteid').value;
        const myfacebook = document.getElementById('facebookid').value;
        const mytwitter = document.getElementById('twitterid').value;
        const company = document.getElementById('companyid').value;
        const freelancing = document.getElementById('freelancingid').value;
        const project_type = document.getElementById('projecttypeid').value;
        const project_title = document.getElementById('projecttitleid').value;
        const project_description = document.getElementById('projectdescriptionid').value;

        const form_data ='&route=' + route + '&names=' + names + '&cell=' + cell + '&email=' + email + '&website=' + website + '&myfacebook=' + myfacebook +
            '&mytwitter=' + mytwitter + '&company=' + company + '&freelancing=' + freelancing + '&projecttype=' + project_type +
            '&projecttitle=' + project_title + '&projectdescription=' + project_description;

        $.ajax({
            type: 'post',
            url: '/services',
            data: form_data,
            cache: false,
            success: function (result) {
                $('#hiremeinf').html(result)
            }
        });
    }else{
        document.getElementById('hiremeinf').innerHTML = "please fill in all the fields";
    }
});