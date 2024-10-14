
$(function () {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    $('#addresslbl').text("Address: " + params.addr);

    $('#link_wallet').attr("href", "./wallet.html?addr=" + params.addr);
    $('#link_token').attr("href", "./wallet_token.html?addr=" + params.addr);
    $('#link_currency').attr("href", "./wallet_currency.html?addr=" + params.addr);
    $('#link_crypto').attr("href", "./wallet_crypto.html?addr=" + params.addr);
    $('#link_tns').attr("href", "./wallet_tns.html?addr=" + params.addr);

    $('#refreshBtn').click(function () {
        $("div.spanner").addClass("show");
        $("div.overlay").addClass("show");
        $(".logo > p").text("Refreshing ...");
        setTimeout(function () {
            getData(params.addr);
        }, 2000);
    });

    $('#successMsgClose').click(function () {
        $("#successMsgAlert").removeClass('show');
    });

    $('#errorMsgClose').click(function () {
        $("#errorMsgAlert").removeClass('show');
    });

    setTimeout(function () {
        getData(params.addr);
    }, 2000);

    $('#addModalForm').on('submit', function (e) {
        e.preventDefault();

        $('#addModal').modal('hide');

        bootbox.prompt({
            title: `Input password to unlock the address!`,
            inputType: 'password',
            callback: function (pwd) {
                $("div.spanner").addClass("show");
                $("div.overlay").addClass("show");
                $(".logo > p").text("Processing ...");

                var request = {}
                request["op"] = "setname";
                request["params"] = [];
                request.params.push({
                    "name": "client",
                    "value": params.addr
                });
                request.params.push({
                    "name": "clientpwd",
                    "value": pwd
                });
                request.params.push({
                    "name": "name",
                    "value": $('#addNameInput').val()
                });
                var body = JSON.stringify(request)
                console.log(body);
                $.ajax({
                    url: "https://testnet.toronet.org/api/tns/cl",
                    contentType: "application/json",
                    data: body,
                    dataType: "json",
                    type: 'POST',
                    success: (data, textStatus, xhr) => {
                        if (data.result) {
                            $('#successmsg').text(`tns name ${$('#addNameInput').val()} is set to ${params.addr}`);
                            $("#successMsgAlert").addClass('show');

                            getData(params.addr);
                        }
                        else {
                            console.log(data);
                            $('#errtitle').text('Invalid transaction!');
                            $('#errmsg').text(data.error);
                            $("#errorMsgAlert").addClass('show');

                            $("div.spanner").removeClass("show");
                            $("div.overlay").removeClass("show");
                        }

                    },
                    error: function (xhr, status, error) {
                        var errorMessage = xhr.status + ': ' + xhr.statusText
                        $('#errtitle').text('Invalid transaction!');
                        $('#errmsg').text(errorMessage);
                        $("#errorMsgAlert").addClass('show');

                        $("div.spanner").removeClass("show");
                        $("div.overlay").removeClass("show");
                    }
                });
            },
            centerVertical: true
        });
    });

    $('#updateModalForm').on('submit', function (e) {
        e.preventDefault();

        $('#updateModal').modal('hide');

        bootbox.prompt({
            title: `Input password to unlock the address!`,
            inputType: 'password',
            callback: function (pwd) {
                $("div.spanner").addClass("show");
                $("div.overlay").addClass("show");
                $(".logo > p").text("Processing ...");

                var request = {}
                request["op"] = "updatename";
                request["params"] = [];
                request.params.push({
                    "name": "client",
                    "value": params.addr
                });
                request.params.push({
                    "name": "clientpwd",
                    "value": pwd
                });
                request.params.push({
                    "name": "name",
                    "value": $('#updateNameInput').val()
                });
                var body = JSON.stringify(request)
                console.log(body);
                $.ajax({
                    url: "https://testnet.toronet.org/api/tns/cl",
                    contentType: "application/json",
                    data: body,
                    dataType: "json",
                    type: 'POST',
                    success: (data, textStatus, xhr) => {
                        if (data.result) {
                            $('#successmsg').text(`tns name ${$('#updateNameInput').val()} is set to ${params.addr}`);
                            $("#successMsgAlert").addClass('show');

                            getData(params.addr);
                        }
                        else {
                            console.log(data);
                            $('#errtitle').text('Invalid transaction!');
                            $('#errmsg').text(data.error);
                            $("#errorMsgAlert").addClass('show');

                            $("div.spanner").removeClass("show");
                            $("div.overlay").removeClass("show");
                        }

                    },
                    error: function (xhr, status, error) {
                        var errorMessage = xhr.status + ': ' + xhr.statusText
                        $('#errtitle').text('Invalid transaction!');
                        $('#errmsg').text(errorMessage);
                        $("#errorMsgAlert").addClass('show');

                        $("div.spanner").removeClass("show");
                        $("div.overlay").removeClass("show");
                    }
                });
            },
            centerVertical: true
        });
    });

    $('#deleteBtn').click(function () {
        $("div.spanner").removeClass("show");
        $("div.overlay").removeClass("show");
        bootbox.confirm({
            message: `Are you sure you want to delete the tns name?`,
            buttons: {
                confirm: {
                    label: 'Yes',
                },
                cancel: {
                    label: 'No',
                }
            },
            callback: function (result) {
                if (result) {
                    bootbox.prompt({
                        title: `Input password to unlock the address!`,
                        inputType: 'password',
                        callback: function (pwd) {
                            $("div.spanner").addClass("show");
                            $("div.overlay").addClass("show");
                            $(".logo > p").text("Processing ...");

                            var request = {}
                            request["op"] = "deletename";
                            request["params"] = [];
                            request.params.push({
                                "name": "client",
                                "value": params.addr
                            });
                            request.params.push({
                                "name": "clientpwd",
                                "value": pwd
                            });
                            var body = JSON.stringify(request)
                            console.log(body);
                            $.ajax({
                                url: "https://testnet.toronet.org/api/tns/cl",
                                contentType: "application/json",
                                data: body,
                                dataType: "json",
                                type: 'POST',
                                success: (data, textStatus, xhr) => {
                                    if (data.result) {
                                        $('#successmsg').text(`tns name for ${params.addr} is successfully deleted`);
                                        $("#successMsgAlert").addClass('show');

                                        getData(params.addr);
                                    }
                                    else {
                                        console.log(data);
                                        $('#errtitle').text('Invalid transaction!');
                                        $('#errmsg').text(data.error);
                                        $("#errorMsgAlert").addClass('show');

                                        $("div.spanner").removeClass("show");
                                        $("div.overlay").removeClass("show");
                                    }

                                },
                                error: function (xhr, status, error) {
                                    var errorMessage = xhr.status + ': ' + xhr.statusText
                                    $('#errtitle').text('Invalid transaction!');
                                    $('#errmsg').text(errorMessage);
                                    $("#errorMsgAlert").addClass('show');

                                    $("div.spanner").removeClass("show");
                                    $("div.overlay").removeClass("show");
                                }
                            });
                        },
                        centerVertical: true
                    });
                }
            },
            centerVertical: true
        });
    });
});

function getData(addr) {

    var url1 = "https://testnet.toronet.org/api/tns";
    var request1 = {}
    request1["op"] = "isaddrassigned";
    request1["params"] = [];
    request1.params.push({
        "name": "addr",
        "value": addr
    });

    var url2 = "https://testnet.toronet.org/api/tns";
    var request2 = {}
    request2["op"] = "getname";
    request2["params"] = [];
    request2.params.push({
        "name": "addr",
        "value": addr
    });

    $.when(
        $.ajax({
            url: url1,
            data: $.param(request1),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),
        $.ajax({
            url: url2,
            data: $.param(request2),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),
    ).then(
        (data1, data2) => {
            console.log(data1, data2);
            if (data1[0].result) {
                if (data1[0].isassigned) {
                    $("#addBtn").addClass('d-none');
                    $("#updateBtn").removeClass('d-none');
                    $("#deleteBtn").removeClass('d-none');
                }
                else {
                    $("#addBtn").removeClass('d-none');
                    $("#updateBtn").addClass('d-none');
                    $("#deleteBtn").addClass('d-none');

                    $("#tnsname").text("n/a");
                }
            }
            else {
                $('#errtitle').text('Error!');
                $('#errmsg').text(data1[0].error);
                $("#errorMsgAlert").addClass('show');
            }

            if (data2[0].result) {
                $("#tnsname").text(data2[0].name);
            }

            $("div.spanner").removeClass("show");
            $("div.overlay").removeClass("show");
        },
        err => {

            $("div.spanner").removeClass("show");
            $("div.overlay").removeClass("show");

            console.log(err);
            $('#errtitle').text('Error!');
            $('#errmsg').text('Unexpected error! Please contact us!');
            $("#errorMsgAlert").addClass('show');
        }
    );

}