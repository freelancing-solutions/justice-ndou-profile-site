
//profiles

document.getElementById('softwareprojectslinkid').addEventListener("click", function () {
       $.ajax({
            type: "get",
            url: "/profiles/software-projects",
            data: "",
            cache: true,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});

document.getElementById('linkedinprofileid').addEventListener("click", function () {
       $.ajax({
            type: "get",
            url: "/profiles/linkedin",
            data: "",
            cache: true,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});

// blog

document.getElementById('programmingid').addEventListener("click", function () {
       $.ajax({
            type: "get",
            url: "/blog/programming",
            data: "",
            cache: true,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});

document.getElementById('scienceid').addEventListener("click", function () {
       $.ajax({
            type: "get",
            url: "/blog/science",
            data: "",
            cache: true,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});

document.getElementById('philosophyid').addEventListener("click", function () {
       $.ajax({
            type: "get",
            url: "/blog/philosophy",
            data: "",
            cache: true,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});
document.getElementById('mathematicsid').addEventListener("click", function () {
       $.ajax({
            type: "get",
            url: "/blog/mathematics",
            data: "",
            cache: true,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});

// social media links

document.getElementById('facebookid').addEventListener("click", function () {
       $.ajax({
            type: "get",
            url: "/social/facebook",
            data: "",
            cache: true,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});
//googleid
document.getElementById('googleid').addEventListener("click", function () {
       $.ajax({
            type: "get",
            url: "/social/google",
            data: "",
            cache: true,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});
// twitterid
document.getElementById('twitterid').addEventListener("click", function () {
       $.ajax({
            type: "get",
            url: "/social/twitter",
            data: "",
            cache: true,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});


//youtubeid
document.getElementById('youtubeid').addEventListener("click", function () {
       $.ajax({
            type: "get",
            url: "/social/youtube",
            data: "",
            cache: true,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});
