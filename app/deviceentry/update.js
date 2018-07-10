$(document).ready(function(){

    $(document).on('click', '.update-device-button', function(){
        var id = $(this).attr('data-id');
        $.getJSON("http://localhost/fsRestApi/Device/read.php?id=" + id, function(data) {
            var label = data.records[0].label;
            var update_device_html="";

            update_device_html+="<div id='read-devices' class='btn btn-primary pull-right m-b-15px read-device-button'>";
                update_device_html+="<span class='glyphicon glyphicon-list'></span> List";
            update_device_html+="</div>";
            update_device_html+="<form id='update-device-form' action='#' method='post' border='0'>";
                update_device_html+="<table class='table table-hover table-responsive table-bordered'>";
                    update_device_html+="<tr>";
                        update_device_html+="<td>Device Label</td>";
                        update_device_html+="<td><input value='" + label + "' type='text' name='label' class='form-control' required /></td>";
                    update_device_html+="</tr>";
                    update_device_html+="<tr>";
                        update_device_html+="<td><input value='" + id + "' name='id' type='hidden' /></td>";
                        update_device_html+="<td>";
                            update_device_html+="<button type='submit' class='btn btn-info'>";
                                update_device_html+="<span class='glyphicon glyphicon-edit'></span> Update Device";
                            update_device_html+="</button>";
                        update_device_html+="</td>";
                    update_device_html+="</tr>";
                update_device_html+="</table>";
            update_device_html+="</form>";

            $("#page-content").html(update_device_html);
            changePageTitle("Update Device");
        });
    });

    $(document).on('submit', '#update-device-form', function() {
        var form_data = JSON.stringify($(this).serializeObject());

        $.ajax({
            url : "http://localhost/fsRestApi/Device/update.php",
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
