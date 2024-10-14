var crypto_symbol;
var crypto_url;
var crypto_ad_url;
var crypto_cl_url;
var exchange_rate;
var toro_bal;
var op2;
var admin = "0xea45bcd1b04233f9240c01d52f773b832704fed0";
var adminpwd = "toronet";

$(function () {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    $('#addresslbl').text("Address: " + params.addr);

    $('#link_wallet').attr("href", "./wallet.html?addr=" + params.addr);
    $('#link_token').attr("href", "./wallet_token.html?addr=" + params.addr);
    $('#link_currency').attr("href", "./wallet_currency.html?addr=" + params.addr);
    $('#link_crypto').attr("href", "./wallet_crypto.html?addr=" + params.addr);
    $('#link_tns').attr("href", "./wallet_tns.html?addr=" + params.addr);

    $('#cryptoSelect').change(function () {

        $("div.spanner").addClass("show");
        $("div.overlay").addClass("show");
        $(".logo > p").text("Refreshing ...");

        if ($(this).val() == "eth") {
            crypto_symbol = "ETH";
            crypto_url = "https://testnet.toronet.org/api/crypto/eth/";
            crypto_ad_url = "https://testnet.toronet.org/api/crypto/eth/ad";
            crypto_cl_url = "https://testnet.toronet.org/api/crypto/eth/cl";
            op2 = "getaddrtransactions_eth";
        }

        $('#importBtn').text(`Import some ${crypto_symbol} to test`);
        $('#importModalLabel').text(`Import ${crypto_symbol}`);
        $('#sendModalLabel').text(`Send ${crypto_symbol}`);
        $('.exchangeRateLabel').text(`Exchange Rate [TORO/${crypto_symbol}]:`);
        $('#buyAmountLabel').text(`${crypto_symbol} Amount to Spend:`);
        $('#addLinkModalLabel').text(`Add ${crypto_symbol} Link`);
        if ($(this).val() == "eth") {
            $('#addLinkAmountLabel').text(`${crypto_symbol} Address (Ropsten):`);
        }
        $('#deleteLinkModalLabel').text(`Delete ${crypto_symbol} Link`);
        $('#deleteLinkAmountLabel').text(`Choose a linked ${crypto_symbol} Address:`);
        $('#depositModalLabel').text(`Deposit ${crypto_symbol} to Toronet`);
        $('#withdrawModalLabel').text(`Withdraw ${crypto_symbol}`);
        if ($(this).val() == "eth") {
            $('#withdrawAddressLabel').text(`${crypto_symbol} Address (Ropsten) to Receive:`);
        }

        setTimeout(function () {
            getData(params.addr);
        }, 2000);
    });
    $('#cryptoSelect').change();

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

    $('#importModalForm').on('submit', function (e) {
        e.preventDefault();

        $("div.spanner").addClass("show");
        $("div.overlay").addClass("show");
        $(".logo > p").text("Processing ...");

        var request = {}
        request["op"] = "importcrypto";
        request["params"] = [];
        request.params.push({
            "name": "admin",
            "value": admin
        });
        request.params.push({
            "name": "adminpwd",
            "value": adminpwd
        });
        request.params.push({
            "name": "addr",
            "value": params.addr
        });
        request.params.push({
            "name": "val",
            "value": $('#importAmount').val()
        });
        var body = JSON.stringify(request)
        console.log(body);
        $.ajax({
            url: crypto_ad_url,
            contentType: "application/json",
            data: body,
            dataType: "json",
            type: 'POST',
            success: (data, textStatus, xhr) => {
                if (data.result) {
                    $('#importModal').modal('hide');
                    $('#successmsg').text(`${$('#importAmount').val()} ${crypto_symbol} is imported into ${params.addr}`);
                    $("#successMsgAlert").addClass('show');

                    getData(params.addr);
                }
                else {
                    $('#importModal').modal('hide');

                    console.log(data);
                    $('#errtitle').text('Invalid transaction!');
                    $('#errmsg').text(data.error);
                    $("#errorMsgAlert").addClass('show');

                    $("div.spanner").removeClass("show");
                    $("div.overlay").removeClass("show");
                }

            },
            error: function (xhr, status, error) {
                $('#importModal').modal('hide');

                var errorMessage = xhr.status + ': ' + xhr.statusText
                $('#errtitle').text('Invalid transaction!');
                $('#errmsg').text(errorMessage);
                $("#errorMsgAlert").addClass('show');

                $("div.spanner").removeClass("show");
                $("div.overlay").removeClass("show");
            }
        });
    });

    $('#sendModalForm').on('submit', function (e) {
        e.preventDefault();

        $("div.spanner").addClass("show");
        $("div.overlay").addClass("show");
        $(".logo > p").text("Processing ...");

        var request = {}
        request["op"] = "calculatetxfee";
        request["params"] = [];
        request.params.push({
            "name": "client",
            "value": params.addr
        });
        request.params.push({
            "name": "val",
            "value": $('#sendAmount').val()
        });
        var body = JSON.stringify(request)
        console.log(body);
        $.ajax({
            url: crypto_cl_url,
            data: $.param(request),
            dataType: "json",
            processData: false,
            type: 'GET',
            success: (data, textStatus, xhr) => {
                if (data.result) {
                    $('#sendModal').modal('hide');
                    $("div.spanner").removeClass("show");
                    $("div.overlay").removeClass("show");
                    bootbox.confirm({
                        message: `The transaction fee will be ${data.fee} ${crypto_symbol}. Do you want to continue the transaction?`,
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
                                        request["op"] = "transfer";
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
                                            "name": "to",
                                            "value": $('#toAddr').val()
                                        });
                                        request.params.push({
                                            "name": "val",
                                            "value": $('#sendAmount').val()
                                        });
                                        var body = JSON.stringify(request)
                                        console.log(body);
                                        $.ajax({
                                            url: crypto_cl_url,
                                            contentType: "application/json",
                                            data: body,
                                            dataType: "json",
                                            type: 'POST',
                                            success: (data, textStatus, xhr) => {
                                                if (data.result) {
                                                    $('#successmsg').text(`${params.addr} successfully send ${$('#sendAmount').val()} ${crypto_symbol} to ${$('#toAddr').val()}`);
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
                }
                else {
                    $('#sendModal').modal('hide');
                    console.log(data);
                    $('#errtitle').text('Invalid transaction!');
                    $('#errmsg').text(data.error);
                    $("#errorMsgAlert").addClass('show');

                    $("div.spanner").removeClass("show");
                    $("div.overlay").removeClass("show");
                }

            },
            error: function (xhr, status, error) {
                $('#sendModal').modal('hide');

                var errorMessage = xhr.status + ': ' + xhr.statusText
                $('#errtitle').text('Invalid transaction!');
                $('#errmsg').text(errorMessage);
                $("#errorMsgAlert").addClass('show');

                $("div.spanner").removeClass("show");
                $("div.overlay").removeClass("show");
            }
        });
    });

    $('#buyModalForm').on('submit', function (e) {
        e.preventDefault();

        $("div.spanner").addClass("show");
        $("div.overlay").addClass("show");
        $(".logo > p").text("Processing ...");

        var request1 = {}
        request1["op"] = "calculatebuyfee";
        request1["params"] = [];
        request1.params.push({
            "name": "client",
            "value": params.addr
        });
        request1.params.push({
            "name": "val",
            "value": $('#buyAmount').val()
        });

        var request2 = {}
        request2["op"] = "calculatebuyresult";
        request2["params"] = [];
        request2.params.push({
            "name": "client",
            "value": params.addr
        });
        request2.params.push({
            "name": "val",
            "value": $('#buyAmount').val()
        });

        $.when(
            $.ajax({
                url: crypto_cl_url,
                data: $.param(request1),
                dataType: "json",
                processData: false,
                type: 'GET',
            }),
            $.ajax({
                url: crypto_cl_url,
                data: $.param(request2),
                dataType: "json",
                processData: false,
                type: 'GET',
            }),
        ).then(
            (data1, data2) => {
                console.log(data1, data2);
                $('#buyModal').modal('hide');
                $("div.spanner").removeClass("show");
                $("div.overlay").removeClass("show");
                if (!data1[0].result) {
                    $('#buyModal').modal('hide');
                    console.log(data);
                    $('#errtitle').text('Invalid transaction!');
                    $('#errmsg').text(data1[0].error);
                    $("#errorMsgAlert").addClass('show');

                    $("div.spanner").removeClass("show");
                    $("div.overlay").removeClass("show");
                }
                else if (!data2[0].result) {
                    $('#buyModal').modal('hide');
                    console.log(data);
                    $('#errtitle').text('Invalid transaction!');
                    $('#errmsg').text(data2[0].error);
                    $("#errorMsgAlert").addClass('show');

                    $("div.spanner").removeClass("show");
                    $("div.overlay").removeClass("show");
                }
                else {
                    bootbox.confirm({
                        message: `The purchase fee will be ${data1[0].fee} ${crypto_symbol}. ${data2[0].amount} TORO will be obtained. Do you want to continue the transaction?`,
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
                                        request["op"] = "buytoro";
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
                                            "name": "val",
                                            "value": $('#buyAmount').val()
                                        });
                                        var body = JSON.stringify(request)
                                        console.log(body);
                                        $.ajax({
                                            url: crypto_cl_url,
                                            contentType: "application/json",
                                            data: body,
                                            dataType: "json",
                                            type: 'POST',
                                            success: (data, textStatus, xhr) => {
                                                if (data.result) {
                                                    $('#successmsg').text(`${params.addr} successfully buy TORO with ${$('#buyAmount').val()} ${crypto_symbol}`);
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
                }
            },
            err => {
                $('#buyModal').modal('hide');

                console.log(err);
                $('#errtitle').text('Error!');
                $('#errmsg').text('Unexpected error! Please contact us!');
                $("#errorMsgAlert").addClass('show');

                $("div.spanner").removeClass("show");
                $("div.overlay").removeClass("show");
            }
        );
    });

    $('#sellModalForm').on('submit', function (e) {
        e.preventDefault();

        $("div.spanner").addClass("show");
        $("div.overlay").addClass("show");
        $(".logo > p").text("Processing ...");

        var request1 = {}
        request1["op"] = "calculatesellfee";
        request1["params"] = [];
        request1.params.push({
            "name": "client",
            "value": params.addr
        });
        request1.params.push({
            "name": "val",
            "value": $('#sellAmount').val()
        });

        var request2 = {}
        request2["op"] = "calculatesellresult";
        request2["params"] = [];
        request2.params.push({
            "name": "client",
            "value": params.addr
        });
        request2.params.push({
            "name": "val",
            "value": $('#sellAmount').val()
        });

        $.when(
            $.ajax({
                url: crypto_cl_url,
                data: $.param(request1),
                dataType: "json",
                processData: false,
                type: 'GET',
            }),
            $.ajax({
                url: crypto_cl_url,
                data: $.param(request2),
                dataType: "json",
                processData: false,
                type: 'GET',
            }),
        ).then(
            (data1, data2) => {
                console.log(data1, data2);
                $('#sellModal').modal('hide');
                $("div.spanner").removeClass("show");
                $("div.overlay").removeClass("show");
                if (!data1[0].result) {
                    $('#sellModal').modal('hide');
                    console.log(data);
                    $('#errtitle').text('Invalid transaction!');
                    $('#errmsg').text(data1[0].error);
                    $("#errorMsgAlert").addClass('show');

                    $("div.spanner").removeClass("show");
                    $("div.overlay").removeClass("show");
                }
                else if (!data2[0].result) {
                    $('#sellModal').modal('hide');
                    console.log(data);
                    $('#errtitle').text('Invalid transaction!');
                    $('#errmsg').text(data2[0].error);
                    $("#errorMsgAlert").addClass('show');

                    $("div.spanner").removeClass("show");
                    $("div.overlay").removeClass("show");
                }
                else {
                    bootbox.confirm({
                        message: `The purchase fee will be ${data1[0].fee} ${crypto_symbol}. ${data2[0].amount} TORO will be obtained. Do you want to continue the transaction?`,
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
                                        request["op"] = "selltoro";
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
                                            "name": "val",
                                            "value": $('#sellAmount').val()
                                        });
                                        var body = JSON.stringify(request)
                                        console.log(body);
                                        $.ajax({
                                            url: crypto_cl_url,
                                            contentType: "application/json",
                                            data: body,
                                            dataType: "json",
                                            type: 'POST',
                                            success: (data, textStatus, xhr) => {
                                                if (data.result) {
                                                    $('#successmsg').text(`${params.addr} successfully sell ${$('#sellAmount').val()} TORO to ${crypto_symbol}`);
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
                }
            },
            err => {
                $('#sellModal').modal('hide');

                console.log(err);
                $('#errtitle').text('Error!');
                $('#errmsg').text('Unexpected error! Please contact us!');
                $("#errorMsgAlert").addClass('show');

                $("div.spanner").removeClass("show");
                $("div.overlay").removeClass("show");
            }
        );
    });

    $('#addLinkModalForm').on('submit', function (e) {
        e.preventDefault();
        $('#addLinkModal').modal('hide');
        bootbox.prompt({
            title: `Input password to unlock the address!`,
            inputType: 'password',
            callback: function (pwd) {
                $("div.spanner").addClass("show");
                $("div.overlay").addClass("show");
                $(".logo > p").text("Processing ...");

                var request = {}
                request["op"] = "addextlink";
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
                    "name": "crypto",
                    "value": $('#addLinkInput').val()
                });
                var body = JSON.stringify(request)
                console.log(body);
                $.ajax({
                    url: crypto_cl_url,
                    contentType: "application/json",
                    data: body,
                    dataType: "json",
                    type: 'POST',
                    success: (data, textStatus, xhr) => {
                        if (data.result) {
                            $('#successmsg').text(`${params.addr} successfully add link to ETH address ${$('#addLinkInput').val()}`);
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

    $('#deleteLinkModalForm').on('submit', function (e) {
        e.preventDefault();
        $('#deleteLinkModal').modal('hide');
        bootbox.prompt({
            title: `Input password to unlock the address!`,
            inputType: 'password',
            callback: function (pwd) {
                $("div.spanner").addClass("show");
                $("div.overlay").addClass("show");
                $(".logo > p").text("Processing ...");

                var request = {}
                request["op"] = "removeextlink";
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
                    "name": "crypto",
                    "value": $('#deleteLinkSelect').val()
                });
                var body = JSON.stringify(request)
                console.log(body);
                $.ajax({
                    url: crypto_cl_url,
                    contentType: "application/json",
                    data: body,
                    dataType: "json",
                    type: 'POST',
                    success: (data, textStatus, xhr) => {
                        if (data.result) {
                            $('#successmsg').text(`${params.addr} successfully delete link to ETH address ${$('#deleteLinkSelect').val()}`);
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

    $('#withdrawModalForm').on('submit', function (e) {
        e.preventDefault();

        $("div.spanner").addClass("show");
        $("div.overlay").addClass("show");
        $(".logo > p").text("Processing ...");

        var request = {}
        request["op"] = "calculateexportfee";
        request["params"] = [];
        request.params.push({
            "name": "client",
            "value": params.addr
        });
        request.params.push({
            "name": "val",
            "value": $('#withdrawAmount').val()
        });
        var body = JSON.stringify(request)
        console.log(body);
        $.ajax({
            url: crypto_cl_url,
            data: $.param(request),
            dataType: "json",
            processData: false,
            type: 'GET',
            success: (data, textStatus, xhr) => {
                if (data.result) {
                    $('#withdrawModal').modal('hide');
                    $("div.spanner").removeClass("show");
                    $("div.overlay").removeClass("show");
                    bootbox.confirm({
                        message: `The withdraw fee will be ${data.fee} ${crypto_symbol}. Do you want to continue the transaction?`,
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
                                        request["op"] = "withdrawcrypto";
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
                                            "name": "val",
                                            "value": $('#withdrawAmount').val()
                                        });
                                        request.params.push({
                                            "name": "crypto",
                                            "value": $('#withdrawAddressInput').val()
                                        });
                                        var body = JSON.stringify(request)
                                        console.log(body);
                                        $.ajax({
                                            url: crypto_cl_url,
                                            contentType: "application/json",
                                            data: body,
                                            dataType: "json",
                                            type: 'POST',
                                            success: (data, textStatus, xhr) => {
                                                if (data.result) {
                                                    $('#successmsg').text(`${params.addr} successfully withdraw ${$('#withdrawAmount').val()} ${crypto_symbol}. Note that the transaction may take at least 15 minutes to complete.`);
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
                }
                else {
                    $('#withdrawModal').modal('hide');
                    console.log(data);
                    $('#errtitle').text('Invalid transaction!');
                    $('#errmsg').text(data.error);
                    $("#errorMsgAlert").addClass('show');

                    $("div.spanner").removeClass("show");
                    $("div.overlay").removeClass("show");
                }

            },
            error: function (xhr, status, error) {
                $('#withdrawModal').modal('hide');

                var errorMessage = xhr.status + ': ' + xhr.statusText
                $('#errtitle').text('Invalid transaction!');
                $('#errmsg').text(errorMessage);
                $("#errorMsgAlert").addClass('show');

                $("div.spanner").removeClass("show");
                $("div.overlay").removeClass("show");
            }
        });
    });
});

function getData(addr) {

    var url1 = crypto_url;
    var request1 = {}
    request1["op"] = "getbalance";
    request1["params"] = [];
    request1.params.push({
        "name": "addr",
        "value": addr
    });

    var url2 = "https://testnet.toronet.org/api/query";
    var request2 = {}
    request2["op"] = op2;
    request2["params"] = [];
    request2.params.push({
        "name": "addr",
        "value": addr
    });
    request2.params.push({
        "name": "count",
        "value": "5"
    });

    var url3 = crypto_url;
    var request3 = {}
    request3["op"] = "getexchangerate";
    request3["params"] = [];

    var url4 = "https://testnet.toronet.org/api/token/toro/";
    var request4 = {}
    request4["op"] = "getbalance";
    request4["params"] = [];
    request4.params.push({
        "name": "addr",
        "value": addr
    });

    var url5 = crypto_url;
    var request5 = {}
    request5["op"] = "getallextlinks";
    request5["params"] = [];
    request5.params.push({
        "name": "toro",
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
        $.ajax({
            url: url3,
            data: $.param(request3),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),
        $.ajax({
            url: url4,
            data: $.param(request4),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),
        $.ajax({
            url: url5,
            data: $.param(request5),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),
    ).then(
        (data1, data2, data3, data4, data5) => {
            console.log(data1, data2, data3, data4, data5);
            if (data1[0].result) {
                $('#crypto-bal').text(data1[0].balance + " " + crypto_symbol);
            }
            else {
                $('#errtitle').text('Error!');
                $('#errmsg').text(data1[0].error);
                $("#errorMsgAlert").addClass('show');
            }

            if (data2[0].result) {
                let tbdata = processTxData(data2[0].data);
                $('#txtable').bootstrapTable({
                    data: tbdata,
                });
                $('#txtable').bootstrapTable('load', tbdata);
            }
            else {
                $('#errtitle').text('Error!');
                $('#errmsg').text(data2[0].error);
                $("#errorMsgAlert").addClass('show');
            }

            if (data3[0].result) {
                exchange_rate = data3[0].exchangerate;
                $('.exchangeRateVal').val(exchange_rate);
            }
            else {
                $('#errtitle').text('Error!');
                $('#errmsg').text(data2[0].error);
                $("#errorMsgAlert").addClass('show');
            }

            if (data4[0].result) {
                toro_bal = data4[0].balance;
                $('#sellToroBal').val(toro_bal);
            }
            else {
                $('#errtitle').text('Error!');
                $('#errmsg').text(data2[0].error);
                $("#errorMsgAlert").addClass('show');
            }

            if (data5[0].result) {
                $('#extlinktable').bootstrapTable({
                    data: data5[0].links,
                });
                $('#extlinktable').bootstrapTable('load', data5[0].links);

                if (data5[0].links.length > 0) {
                    console.log(data5[0].links);
                    $("#deleteLinkSelect").selectpicker('destroy');
                    $("#deleteLinkSelect").empty();
                    for (let i = 0; i < data5[0].links.length; i++) {
                        $("#deleteLinkSelect").append('<option value="' + data5[0].links[i].link + '">' + data5[0].links[i].link + '</option>')
                    }
                    $("#deleteLinkSelect").selectpicker('render');
                    $('#deleteLinkSelect').selectpicker('val', data5[0].links[0].link);
                }
            }
            else {
                $('#errtitle').text('Error!');
                $('#errmsg').text(data5[0].error);
                $("#errorMsgAlert").addClass('show');
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