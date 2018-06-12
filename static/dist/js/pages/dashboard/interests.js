

document.getElementById('interesttopicid').addEventListener('click', function(event){
    const topicid = this.value;
    const route = "subjectfromtopicid";
    const my_data ='&route=' + route + '&topicid=' + topicid;
   // console.log(my_data);

    $.ajax({
        type: "post",
        url: "/dashboard",
        data: my_data,
        cache: false,
        success: function(response){

            document.getElementById('topicsubjectsid').value = response;
        }
    });
});

document.getElementById('addsubjectsbutt').addEventListener('click', function(){
    const topicid = document.getElementById('interesttopicid').value;
    const subjects_list = document.getElementById('addsubjectsid').value;
    const route = "addsubjectstotopicid";
    const my_data = '&route=' + route + '&topicid=' + topicid + '&subjects-list=' + subjects_list;
    console.log(subjects_list);
    console.log(my_data);
    $.ajax({
        type: 'post',
        url: '/dashboard',
        data: my_data,
        cache: false,
        success: function(response){
            $('#formresponseid').html(response);
        }
    });
});

document.getElementById('removesubjectsbutt').addEventListener("click", function(){
    const topicid = document.getElementById('interesttopicid').value;
    const subjects_list = document.getElementById('topicsubjectsid').value;
    const route = "removesubjectstopicid";
    const my_data = '&route=' + route + '&topicid=' + topicid + '&subjects-list=' + subjects_list;
    console.log(my_data);
    $.ajax({
        type:'post',
        url: '/dashboard',
        data: my_data,
        cache: false,
        success: function(response){
            $('#formresponseid').html(response);
        }

    });
});

document.getElementById('createtopicbutt').addEventListener("click", function(){
    const topicid = document.getElementById('mynewtopicid').value;
    const topic_label = document.getElementById('mynewtopiclabelid').value;
    const route = "createtopic";
    const my_data = '&route=' + route + '&topicid=' + topicid + '&topiclabel=' + topic_label;
    console.log(my_data);
    $.ajax({
        type: "post",
        url: "/dashboard",
        data: my_data,
        cache: false,
        success: function(response){
            $('#createtopicsform').html(response)
        }
    });
});