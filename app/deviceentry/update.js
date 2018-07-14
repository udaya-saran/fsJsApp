$(document).ready(function() {
    $(document).on('click', '.update-device-entry-button', function() {
        var dev_entry_id = $(this).attr('data-entry-id');
        var deviceEntryReadUrl = restApiUrl + deviceEntryUrl + readPath + "?entry_id=" + dev_entry_id;
        var deviceListUrl = restApiUrl + deviceUrl + readAllPath;
        
        $.getJSON(deviceEntryReadUrl, function(data) {
            var device_id = data.records[0].device_id;
            var latitude = data.records[0].latitude;
            var longitude = data.records[0].longitude;
            $.getJSON(deviceListUrl, function(data) {
                var device_option_list="<select name='device_id' class='form-control'>";
                var selected_attr = "";
                $.each(data.records, function(key, val) {
                    if (parseInt(device_id) === parseInt(val.id)) {
                        selected_attr = " selected='selected'";
                    }
                    device_option_list+="<option value='" + val.id + "'" + selected_attr + ">" + val.label + "</option>";
                    selected_attr = "";
                }, device_id);
                device_option_list+="</select>";

                var update_device_entry_html="";
                
                update_device_entry_html+="<div class='btn btn-primary pull-right m-b-15px m-l-10px read-device-button'>";
                    update_device_entry_html+="<span class='glyphicon glyphicon-list'></span> Device List";
                update_device_entry_html+="</div>";
                
                update_device_entry_html+="<div class='btn btn-primary pull-right m-b-15px read-device-entry-button' data-id='" + device_id + "'>";
                    update_device_entry_html+="<span class='glyphicon glyphicon-list'></span> Entry List";
                update_device_entry_html+="</div>";

                update_device_entry_html+="<form id='update-device-entry-form' action='#' method='post' border='0' data-device-id='" + device_id + "'>";
                    update_device_entry_html+="<table class='table table-hover table-responsive table-bordered'>";

                        update_device_entry_html+="<tr>";
                            update_device_entry_html+="<td>Device Label</td>";
                            update_device_entry_html+="<td>";
                            update_device_entry_html+=device_option_list;
                            update_device_entry_html+="</td>";
                        update_device_entry_html+="</tr>";

                        update_device_entry_html+="<tr>";
                            update_device_entry_html+="<td>Latitude</td>";
                            update_device_entry_html+="<td><input type='text' name='latitude' value='" + latitude + "' class='form-control' required /></td>";
                        update_device_entry_html+="</tr>";

                        update_device_entry_html+="<tr>";
                            update_device_entry_html+="<td>Longitude</td>";
                            update_device_entry_html+="<td><input type='text' name='longitude' value='" + longitude + "' class='form-control' required /></td>";
                        update_device_entry_html+="</tr>";

                        update_device_entry_html+="<tr>";
                            update_device_entry_html+="<td><input value='" + dev_entry_id + "' name='entry_id' type='hidden' /></td>";
                            update_device_entry_html+="<td>";
                                update_device_entry_html+="<button type='submit' class='btn btn-primary'>";
                                    update_device_entry_html+="<span class='glyphicon glyphicon-edit'></span> Update Entry";
                                update_device_entry_html+="</button>";
                            update_device_entry_html+="</td>";
                        update_device_entry_html+="</tr>";
                    update_device_entry_html+="</table>";
                update_device_entry_html+="</form>";

                $("#page-content").html(update_device_entry_html);
                changePageTitle("Update Entry");
            });
        });
    });

    $(document).on('submit', '#update-device-entry-form', function() {
        var device_id = $(this).attr('data-device-id');
        var form_data=JSON.stringify($(this).serializeObject());
        var framedUrl = restApiUrl + deviceEntryUrl + updatePath;

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
