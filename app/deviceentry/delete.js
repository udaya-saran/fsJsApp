$(document).ready(function(){

    $(document).on('click', '.delete-device-entry-button', function(){
        var dev_entry_id = $(this).attr('data-entry-id');
        var dev_id = $(this).attr('data-device-id');

        bootbox.confirm({
            message: "<h4>Are you sure?</h4>",
            buttons: {
                confirm: {
                    label: '<span class="glyphicon glyphicon-ok"></span> Yes',
                    className: 'btn-danger'
                },
                cancel: {
                    label: '<span class="glyphicon glyphicon-remove"></span> No',
                    className: 'btn-primary'
                }
            },
            callback: function (result) {
                if (result == true) {
                    var framedUrl = restApiUrl + deviceEntryUrl + deletePath;
                    $.ajax({
                        url: framedUrl,
                        type : "POST",
                        dataType : 'json',
                        data : JSON.stringify({ entry_id: dev_entry_id }),
                        success : function(result) {
                            showDeviceEntries(dev_id);
                        },
                        error: function(xhr, resp, text) {
                            console.log(xhr, resp, text);
                        }
                    });
                }
            }
        });
    });

});
