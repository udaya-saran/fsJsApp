$(document).ready(function(){
    showDevices();
});

function showDevices()
{
    $.getJSON("http://localhost/fsRestApi/Device/read.php", function(data) {
//        console.log(data);
        var read_devices_html="";

        // when clicked, it will load the create product form
        read_devices_html+="<div id='create-device' class='btn btn-primary pull-right m-b-15px create-device-button'>";
            read_devices_html+="<span class='glyphicon glyphicon-plus'></span> Create Device";
        read_devices_html+="</div>";

        read_devices_html+="<table class='table table-bordered table-hover'>";

            // creating our table heading
            read_devices_html+="<tr>";
                read_devices_html+="<th class='w-5-pct'>ID</th>";
                read_devices_html+="<th class='w-25-pct'>Label</th>";
                read_devices_html+="<th class='w-15-pct'>Last Reported</th>";
                read_devices_html+="<th class='w-10-pct'>Status</th>";
                read_devices_html+="<th class='w-20-pct text-align-center'>Action</th>";
            read_devices_html+="</tr>";

            $.each(data.records, function(key, val) {
                if (val.last_reported_at === null) {
                    val.last_reported_at = "";
                }

                read_devices_html+="<tr>";
                    read_devices_html+="<td>" + val.id + "</td>";
                    read_devices_html+="<td>" + val.label + "</td>";
                    read_devices_html+="<td>" + val.last_reported_at + "</td>";
                    read_devices_html+="<td>ONLINE</td>";

                    read_devices_html+="<td>";
                        read_devices_html+="<button class='btn btn-primary m-r-10px read-device-entry-button' data-id='" + val.id + "'>";
                            read_devices_html+="<span class='glyphicon glyphicon-eye-open'></span> Entries";
                        read_devices_html+="</button>";
                        read_devices_html+="<button class='btn btn-info m-r-10px update-device-button' data-id='" + val.id + "'>";
                            read_devices_html+="<span class='glyphicon glyphicon-edit'></span> Edit";
                        read_devices_html+="</button>";
                        read_devices_html+="<button class='btn btn-danger delete-device-button' data-id='" + val.id + "'>";
                            read_devices_html+="<span class='glyphicon glyphicon-remove'></span> Delete";
                        read_devices_html+="</button>";
                    read_devices_html+="</td>";
                read_devices_html+="</tr>";
            });

        read_devices_html+="</table>";
        $("#page-content").html(read_devices_html);
        changePageTitle("Device List");
    });
}

$(document).on('click', '.read-device-button', function(){
    showDevices();
});
