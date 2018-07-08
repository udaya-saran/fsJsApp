$(document).ready(function(){
    $(document).on('click', '.create-device-button', function(){
        var create_device_html="";

        create_device_html+="<div id='read-devices' class='btn btn-primary pull-right m-b-15px read-devices-button'>";
            create_device_html+="<span class='glyphicon glyphicon-list'></span> List";
        create_device_html+="</div>";

        create_device_html+="<form id='create-device-form' action='#' method='post' border='0'>";
            create_device_html+="<table class='table table-hover table-responsive table-bordered'>";
                create_device_html+="<tr>";
                    create_device_html+="<td>Device Label</td>";
                    create_device_html+="<td><input type='text' name='label' class='form-control' required /></td>";
                create_device_html+="</tr>";
                create_device_html+="<tr>";
                    create_device_html+="<td></td>";
                    create_device_html+="<td>";
                        create_device_html+="<button type='submit' class='btn btn-primary'>";
                            create_device_html+="<span class='glyphicon glyphicon-plus'></span> Create Device";
                        create_device_html+="</button>";
                    create_device_html+="</td>";
                create_device_html+="</tr>";
            create_device_html+="</table>";
        create_device_html+="</form>";

        $("#page-content").html(create_device_html);
        changePageTitle("Create Device");
    });

    $(document).on('submit', '#create-device-form', function() {
        var form_data=JSON.stringify($(this).serializeObject());

        $.ajax({
            url: "http://localhost/fsRestApi/Device/create.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                showDevices();
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

        return false;
    });
});
