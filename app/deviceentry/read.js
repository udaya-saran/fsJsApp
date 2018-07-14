var entry_page = 1;

function getTzOff()
{
    var timezone_offset_minutes = new Date().getTimezoneOffset();
    if (timezone_offset_minutes < -720 && timezone_offset_minutes > 840) {
        timezone_offset_minutes = 0;
    }
    return(timezone_offset_minutes);
}

function showDeviceEntries(device_id)
{
    var param = "?tiZo=" + getTzOff() + "&device_id=" + device_id + "&page=" + entry_page;
    var framedUrl = restApiUrl + deviceEntryUrl + readPath + param;
    $.getJSON(framedUrl, function(data) {
        var read_device_entries_html="";

        read_device_entries_html+="<div id='create-device-entry' class='btn btn-primary pull-right m-b-15px m-l-10px create-device-entry-button' data-device-id='" + device_id + "'>";
            read_device_entries_html+="<span class='glyphicon glyphicon-plus'></span> Create Entry";
        read_device_entries_html+="</div>";
        
        read_device_entries_html+="<div class='btn btn-primary pull-right m-b-15px read-device-button'>";
            read_device_entries_html+="<span class='glyphicon glyphicon-list'></span> Device List";
        read_device_entries_html+="</div>";

        var page_option_list="";
        if (data.paging.totalRecords > 0 && data.paging.page > 0 && data.paging.rpp > 0) {
            var totalPages = parseInt((data.paging.totalRecords % data.paging.rpp > 0) ? (data.paging.totalRecords / data.paging.rpp + 1) : (data.paging.totalRecords / data.paging.rpp));
            if (totalPages > 1) {
                page_option_list+="<div class='pull-left m-b-20px'>Page: </div>";
                page_option_list+="<div class='pull-left m-b-15px m-l-10px'>";
                page_option_list+="<select name='page' class='form-control read-device-entry-bypage' data-id='" + device_id + "'>";
                var selected_attr = "";
                for (var pageNo = 1; pageNo <= totalPages; pageNo++) {
                    if (parseInt(data.paging.page) === pageNo) {
                        selected_attr = " selected='selected'";
                    }
                    page_option_list+="<option value='" + pageNo + "'" + selected_attr + ">" + pageNo + "</option>";
                    selected_attr = "";
                }
                page_option_list+="</select>";
                page_option_list+="</div>";
                page_option_list+="<div class='pull-left m-b-20px m-l-10px'> / " + totalPages + " </div>";
            }
        }
        read_device_entries_html+=page_option_list;

        read_device_entries_html+="<table class='table table-bordered table-hover'>";
            read_device_entries_html+="<tr>";
                read_device_entries_html+="<th class='w-5-pct'>ID</th>";
                read_device_entries_html+="<th class='w-20-pct'>Device</th>";
                read_device_entries_html+="<th class='w-10-pct'>Latitude</th>";
                read_device_entries_html+="<th class='w-10-pct'>Longitude</th>";
                read_device_entries_html+="<th class='w-10-pct'>Reported On</th>";
                read_device_entries_html+="<th class='w-20-pct text-align-center'>Action</th>";
            read_device_entries_html+="</tr>";
            var recordFound = 0;
            $.each(data.records, function(key, val) {
                recordFound = 1;
                if (val.reported_at === null) {
                    val.reported_at = "";
                }

                read_device_entries_html+="<tr>";
                    read_device_entries_html+="<td>" + val.entry_id + "</td>";
                    read_device_entries_html+="<td><span class='update-device-button' data-id='" + val.device_id + "'>";
                    read_device_entries_html+= val.label + "</span></td>";
                    read_device_entries_html+="<td>" + val.latitude + "</td>";
                    read_device_entries_html+="<td>" + val.longitude + "</td>";
                    read_device_entries_html+="<td>" + val.reported_at + "</td>";

                    read_device_entries_html+="<td>";
                        read_device_entries_html+="<button class='btn btn-info m-r-10px update-device-entry-button' data-entry-id='" + val.entry_id + "'>";
                            read_device_entries_html+="<span class='glyphicon glyphicon-edit'></span> Edit";
                        read_device_entries_html+="</button>";
                        read_device_entries_html+="<button class='btn btn-danger delete-device-entry-button' data-entry-id='" + val.entry_id + "' data-device-id='" + val.device_id + "'>";
                            read_device_entries_html+="<span class='glyphicon glyphicon-remove'></span> Delete";
                        read_device_entries_html+="</button>";
                    read_device_entries_html+="</td>";
                read_device_entries_html+="</tr>";
            });
            
            if (recordFound === 0) {
                read_device_entries_html+="<tr><td colspan='6' class='text-align-center'>" + data.message + "</td></tr>";
            }

        read_device_entries_html+="</table>";
        $("#page-content").html(read_device_entries_html);
        changePageTitle("Entry List");
    });
}

$(document).on('click', '.read-device-entry-button', function() {
    var device_id = $(this).attr('data-id');
    showDeviceEntries(device_id);
});

$(document).on('change', '.read-device-entry-bypage', function(){
    var device_id = $(this).attr('data-id');
    entry_page = parseInt($(this).val());
    showDeviceEntries(device_id);
});
