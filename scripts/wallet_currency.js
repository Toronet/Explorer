var currency;
var currency_symbol;
var currency_url;
var currency_ad_url;
var currency_cl_url;
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

    $('#currencySelect').change(function () {

        $("div.spanner").addClass("show");
        $("div.overlay").addClass("show");
        $(".logo > p").text("Refreshing ...");

        currency = $(this).val();
        if (currency == "dollar") {
            currency_symbol = "TORO_USD";
            currency_url = "https://testnet.toronet.org/api/currency/dollar/";
            currency_ad_url = "https://testnet.toronet.org/api/currency/dollar/ad";
            currency_cl_url = "https://testnet.toronet.org/api/currency/dollar/cl";
            op2 = "getaddrtransactions_dollar";
            $('#importAmount').attr( 'max','5000');
        }
        else if (currency == "naira") {
            currency_symbol = "TORO_NGN";
            currency_url = "https://testnet.toronet.org/api/currency/naira/";
            currency_ad_url = "https://testnet.toronet.org/api/currency/naira/ad";
            currency_cl_url = "https://testnet.toronet.org/api/currency/naira/cl";
            op2 = "getaddrtransactions_naira";
            $('#importAmount').attr( 'max','20000000');
        }
        else if (currency == "euro") {
            currency_symbol = "TORO_EUR";
            currency_url = "https://testnet.toronet.org/api/currency/euro/";
            currency_ad_url = "https://testnet.toronet.org/api/currency/euro/ad";
            currency_cl_url = "https://testnet.toronet.org/api/currency/euro/cl";
            op2 = "getaddrtransactions_euro";
            $('#importAmount').attr( 'max','5000');
        }
        else if (currency == "pound") {
            currency_symbol = "TORO_GBP";
            currency_url = "https://testnet.toronet.org/api/currency/pound/";
            currency_ad_url = "https://testnet.toronet.org/api/currency/pound/ad";
            currency_cl_url = "https://testnet.toronet.org/api/currency/pound/cl";
            op2 = "getaddrtransactions_pound";
            $('#importAmount').attr( 'max','4000');
        }
        else if (currency == "egp") {
            currency_symbol = "TORO_EGP";
            currency_url = "https://testnet.toronet.org/api/currency/egp/";
            currency_ad_url = "https://testnet.toronet.org/api/currency/egp/ad";
            currency_cl_url = "https://testnet.toronet.org/api/currency/egp/cl";
            op2 = "getaddrtransactions_egp";
            $('#importAmount').attr( 'max','80000');
        }
        else if (currency == "ksh") {
            currency_symbol = "TORO_KSH";
            currency_url = "https://testnet.toronet.org/api/currency/ksh/";
            currency_ad_url = "https://testnet.toronet.org/api/currency/ksh/ad";
            currency_cl_url = "https://testnet.toronet.org/api/currency/ksh/cl";
            op2 = "getaddrtransactions_ksh";
            $('#importAmount').attr( 'max','600000');
        }
        else if (currency == "zar") {
            currency_symbol = "TORO_ZAR";
            currency_url = "https://testnet.toronet.org/api/currency/zar/";
            currency_ad_url = "https://testnet.toronet.org/api/currency/zar/ad";
            currency_cl_url = "https://testnet.toronet.org/api/currency/zar/cl";
            op2 = "getaddrtransactions_zar";
            $('#importAmount').attr( 'max','80000');
        }

        $('#importBtn').text(`Import some ${currency_symbol} to test`);
        $('#importModalLabel').text(`Import ${currency_symbol}`);
        $('#sendModalLabel').text(`Send ${currency_symbol}`);
        $('.exchangeRateLabel').text(`Exchange Rate [TORO/${currency_symbol}]:`);
        $('#buyAmountLabel').text(`${currency_symbol} Amount to Spend:`);

        setTimeout(function () {
            getData(params.addr);
        }, 2000);
    });
    $('#currencySelect').change();

    // setTimeout(function () {
    //     getData(params.addr);
    // }, 2000);

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
        request["op"] = "importcurrency";
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
            url: currency_ad_url,
            contentType: "application/json",
            data: body,
            dataType: "json",
            type: 'POST',
            success: (data, textStatus, xhr) => {
                if (data.result) {
                    $('#importModal').modal('hide');
                    $('#successmsg').text(`${$('#importAmount').val()} ${currency_symbol} is imported into ${params.addr}`);
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
            url: currency_cl_url,
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
                        message: `The transaction fee will be ${data.fee} ${currency_symbol}. Do you want to continue the transaction?`,
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
                                            url: currency_cl_url,
                                            contentType: "application/json",
                                            data: body,
                                            dataType: "json",
                                            type: 'POST',
                                            success: (data, textStatus, xhr) => {
                                                if (data.result) {
                                                    $('#successmsg').text(`${params.addr} successfully send ${$('#sendAmount').val()} ${currency_symbol} to ${$('#toAddr').val()}`);
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
                url: currency_cl_url,
                data: $.param(request1),
                dataType: "json",
                processData: false,
                type: 'GET',
            }),
            $.ajax({
                url: currency_cl_url,
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
                        message: `The purchase fee will be ${data1[0].fee} ${currency_symbol}. ${data2[0].amount} TORO will be obtained. Do you want to continue the transaction?`,
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
                                            url: currency_cl_url,
                                            contentType: "application/json",
                                            data: body,
                                            dataType: "json",
                                            type: 'POST',
                                            success: (data, textStatus, xhr) => {
                                                if (data.result) {
                                                    $('#successmsg').text(`${params.addr} successfully buy TORO with ${$('#buyAmount').val()} ${currency_symbol}`);
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
                url: currency_cl_url,
                data: $.param(request1),
                dataType: "json",
                processData: false,
                type: 'GET',
            }),
            $.ajax({
                url: currency_cl_url,
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
                        message: `The purchase fee will be ${data1[0].fee} ${currency_symbol}. ${data2[0].amount} TORO will be obtained. Do you want to continue the transaction?`,
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
                                            url: currency_cl_url,
                                            contentType: "application/json",
                                            data: body,
                                            dataType: "json",
                                            type: 'POST',
                                            success: (data, textStatus, xhr) => {
                                                if (data.result) {
                                                    $('#successmsg').text(`${params.addr} successfully sell ${$('#sellAmount').val()} TORO to ${currency_symbol}`);
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
});

function getData(addr) {

    var url1 = currency_url;
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

    var url3 = currency_url;
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
    ).then(
        (data1, data2, data3, data4) => {
            console.log(data1, data2, data3, data4);
            if (data1[0].result) {
                $('#currency-bal').text(data1[0].balance + " " + currency_symbol);
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