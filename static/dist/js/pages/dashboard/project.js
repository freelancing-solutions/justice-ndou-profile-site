
//note consider writing separate validity checks

//hiremeinf
document.getElementById('hiremesend').addEventListener("click", function(){
    const projectid = document.getElementById('projectid').value;
    const names = document.getElementById('namesid').value;
    const cell = document.getElementById('cellid').value;
    const email = document.getElementById('emailid').value;
    const website = document.getElementById('websiteid').value;
    const facebook = document.getElementById('facebookid').value;
    const twitter = document.getElementById('twitterid').value;
    const company = document.getElementById('companyid').value;
    const freelancing = document.getElementById('freelancingid').value;
    const project_type = document.getElementById('projecttypeid').value;
    const project_title = document.getElementById('projecttitleid').value;
    const project_description = document.getElementById('projectdescriptionid').value;
    const estimated_budget = document.getElementById('estimatedbudgetid').value;
    const start_date = document.getElementById('startdateid').value;
    const project_status = document.getElementById('projectstatusid').value;
    //test for validity
    const route = "update-project";
    const my_data = '&route=' + route + '&projectid=' + projectid + '&names=' + names + '&cell=' + cell + '&email=' + email +
    '&website=' + website + '&facebook=' + facebook + '&twitter=' + twitter + '&company=' + company + 
    '&freelancing=' + freelancing + '&project-type=' + project_type + '&project-title=' + project_title + 
    '&project-description=' + project_description + '&estimated-budget='+ estimated_budget + 
    '&start-date=' + start_date + '&project-status=' + project_status;
    console.log(my_data);
    $.ajax({
        type: 'post',
        url: '/dashboard',
        data: my_data,
        cache: false,
        success: function(response){
            $('#hiremeinf').html(response);
        }
    })
    


})