$(function () {

    $('#searchForm').on('submit', function (e) {
        e.preventDefault();
        var request = {}
        request["op"] = "isaddress";
        request["params"] = [];
        request.params.push({
            "name": "addr",
            "value": $('#searchInput').val()
        });
        var body = JSON.stringify(request)
        console.log(body);
        $.ajax({
            url: "https://testnet.toronet.org/api/util",
            data: $.param(request),
            dataType: "json",
            processData: false,
            type: 'GET',
            success: (data, textStatus, xhr) => {
                if (data.result) {
                    window.location.href = './wallet.html?addr=' + data.addr;
                }
                else {
                    console.log(data);
                    $('#errtitle').text('Invalid address!');
                    $('#errmsg').text(data.error);
                    $("#errorMsgAlert").addClass('show');
                }
            },
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                $('#errtitle').text('Invalid address!');
                $('#errmsg').text(errorMessage);
                $("#errorMsgAlert").addClass('show');
            }
        });
    });

    $('#createAddrSuccessClose').click(function () {
        $("#createAddrSuccess").removeClass('show');
    });

    $('#errorMsgClose').click(function () {
        $("#errorMsgAlert").removeClass('show');
    });

    $('#createAddrForm').on('submit', function (e) {
        e.preventDefault();
        var data = {}
        data["op"] = "createkey";
        data["params"] = [];
        data.params.push({
            "name": "pwd",
            "value": $('#password1').val()
        });
        var body = JSON.stringify(data)
        $.ajax({
            url: "https://testnet.toronet.org/api/keystore",
            contentType: "application/json",
            data: body,
            dataType: "json",
            type: 'POST',
            success: (data, textStatus, xhr) => {
                if (data.result) {
                    $('#createAddrModal').modal('hide');
                    $('#addrval').text(data.address);
                    $('#searchInput').val(data.address);
                    $('#createAddrSuccess a').attr("href", './wallet.html?addr=' + data.address);
                    $("#createAddrSuccess").addClass('show');
                }
                else {
                    $('#errtitle').text('Failed to create address!');
                    $('#errmsg').text(data.error);
                    $("#errorMsgAlert").addClass('show');
                }
            },
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                $('#errtitle').text('Failed to create address!');
                $('#errmsg').text(errorMessage);
                $("#errorMsgAlert").addClass('show');
            }
        });
    });
});