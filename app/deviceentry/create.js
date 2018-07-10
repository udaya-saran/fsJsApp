$(document).ready(function() {
    $(document).on('click', '.create-device-entry-button', function() {
        var device_id = parseInt($(this).attr('data-device-id'));
        var deviceListUrl = restApiUrl + deviceUrl + readAllPath;

        $.getJSON(deviceListUrl, function(data) {
            // console.log("URL: " + deviceListUrl);
            var device_option_list="<select name='device_id' class='form-control'>";
            var selected_attr = "";
            $.each(data.records, function(key, val) {
                if (device_id === parseInt(val.id)) {
                    selected_attr = " SELECTED";
                }
                device_option_list+="<option value='" + val.id + "'" + selected_attr + ">" + val.label + "</option>";
                selected_attr = "";
            });
            device_option_list+="</select>";
            var create_device_entries_html="";            
            create_device_entries_html+="<div id='read-devices' class='btn btn-primary pull-right m-b-15px read-device-button'>";
                create_device_entries_html+="<span class='glyphicon glyphicon-list'></span> Device List";
            create_device_entries_html+="</div>";

            create_device_entries_html+="<form id='create-device-entry-form' action='#' method='post' border='0' data-device-id='" + device_id + "'>";
                create_device_entries_html+="<table class='table table-hover table-responsive table-bordered'>";

                    create_device_entries_html+="<tr>";
                        create_device_entries_html+="<td>Device Label</td>";
                        create_device_entries_html+="<td>";
                        create_device_entries_html+=device_option_list;
                        create_device_entries_html+="</td>";
                    create_device_entries_html+="</tr>";

                    create_device_entries_html+="<tr>";
                        create_device_entries_html+="<td>Latitude</td>";
                        create_device_entries_html+="<td><input type='text' name='latitude' class='form-control' required /></td>";
                    create_device_entries_html+="</tr>";

                    create_device_entries_html+="<tr>";
                        create_device_entries_html+="<td>Longitude</td>";
                        create_device_entries_html+="<td><input type='text' name='longitude' class='form-control' required /></td>";
                    create_device_entries_html+="</tr>";

                    create_device_entries_html+="<tr>";
                        create_device_entries_html+="<td></td>";
                        create_device_entries_html+="<td>";
                            create_device_entries_html+="<button type='submit' class='btn btn-primary'>";
                                create_device_entries_html+="<span class='glyphicon glyphicon-plus'></span> Create Entry";
                            create_device_entries_html+="</button>";
                        create_device_entries_html+="</td>";
                    create_device_entries_html+="</tr>";
                create_device_entries_html+="</table>";
            create_device_entries_html+="</form>";

            $("#page-content").html(create_device_entries_html);
            changePageTitle("Create Entry");
        });
    });

    $(document).on('submit', '#create-device-entry-form', function() {
        var device_id = $(this).attr('data-device-id');
        var form_data=JSON.stringify($(this).serializeObject());
        var framedUrl = restApiUrl + deviceEntryUrl + createPath;

        $.ajax({
            url: framedUrl,
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                showDeviceEntries(device_id);
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

        return false;
    });
});
