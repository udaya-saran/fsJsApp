$(document).ready(function(){

    $(document).on('click', '.delete-device-button', function(){
        var dev_id = $(this).attr('data-id');

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
                    $.ajax({
                        url: "http://localhost/fsRestApi/Device/delete.php",
                        type : "POST",
                        dataType : 'json',
                        data : JSON.stringify({ id: dev_id }),
                        success : function(result) {
                            showDevices();
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
