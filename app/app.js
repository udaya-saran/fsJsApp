var restApiUrl = "http://localhost/fsRestApi/";
var deviceUrl = "Device/";
var deviceEntryUrl = "DeviceEntry/";
var readPath = "read.php";
var readAllPath = "readAll.php";
var createPath = "create.php";
var updatePath = "update.php";
var deletePath = "delete.php";

$(document).ready(function(){
    app_html="";
    app_html+="<div class='container'>";
        app_html+="<div class='page-header'>";
            app_html+="<h2 id='page-title'>Device List</h2>";
        app_html+="</div>";
        app_html+="<div id='page-content'></div>";
    app_html+="</div>";
    $("#app").html(app_html);
});

function changePageTitle(page_title)
{
    $('#page-title').text(page_title);
    document.title=page_title;
}

// function to make form values to json format
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });

    return o;
};
