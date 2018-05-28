
//profiles

document.getElementById('softwareprojectslinkid').addEventListener("click", function () {
       $.ajax({
            type: "post",
            url: "/profiles/software-projects",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});

document.getElementById('linkedinprofileid').addEventListener("click", function () {
       $.ajax({
            type: "post",
            url: "/profiles/linkedin",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});

// blog

document.getElementById('programmingid').addEventListener("click", function () {
       $.ajax({
            type: "post",
            url: "/blog/programming",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});

document.getElementById('scienceid').addEventListener("click", function () {
       $.ajax({
            type: "post",
            url: "/blog/science",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});

document.getElementById('philosophyid').addEventListener("click", function () {
       $.ajax({
            type: "post",
            url: "/blog/philosophy",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});
document.getElementById('mathematicsid').addEventListener("click", function () {
       $.ajax({
            type: "post",
            url: "/blog/mathematics",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});

// social media links

document.getElementById('facebookid').addEventListener("click", function () {
       $.ajax({
            type: "post",
            url: "/social/facebook",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});
//googleid
document.getElementById('googleid').addEventListener("click", function () {
       $.ajax({
            type: "post",
            url: "/social/google",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});
// twitterid
document.getElementById('twitterid').addEventListener("click", function () {
       $.ajax({
            type: "post",
            url: "/social/twitter",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});

document.getElementById('twitterid').addEventListener("click", function () {
       $.ajax({
            type: "post",
            url: "/social/twitter",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});

//youtubeid
document.getElementById('youtubeid').addEventListener("click", function () {
       $.ajax({
            type: "post",
            url: "/social/youtube",
            data: "",
            cache: false,
            success: function (html) {
                $('#mainbodyinfdiv').html(html)
            }
        });
});
