var token;
var token_symbol;
var token_url;
var token_ad_url;
var token_cl_url;
var op2;
var bals;
var exrates;
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

    $('#tokenSelect').change(function () {

        $("div.spanner").addClass("show");
        $("div.overlay").addClass("show");
        $(".logo > p").text("Refreshing ...");

        token = $(this).val();
        if (token == "toro") {
            token_symbol = "TORO";
            token_url = "https://testnet.toronet.org/api/token/toro/";
            token_ad_url = "https://testnet.toronet.org/api/token/toro/ad";
            token_cl_url = "https://testnet.toronet.org/api/token/toro/cl";
            op2 = "getaddrtransactions_toro";
        }

        $('#mintBtn').text(`Mint some ${token_symbol} to test`);
        $('#mintModalLabel').text(`Mint ${token_symbol}`);
        $('#sendModalLabel').text(`Send ${token_symbol}`);

        setTimeout(function () {
            getData(params.addr);
        }, 2000);
    });
    $('#tokenSelect').change();

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

    $('#buyCurrencySelect').unbind('change').change(function(){
        switch($(this).val()) {
            case "dollar":
                if (bals.is_dollar) {$("#buyCurrencyBalVal").val(bals.bal_dollar);}
                $("#buyCurrencyBalLabel").text("USD Balance");
                $("#buyExchangeRateVal").val(exrates.rate_dollar);
                $('#buyExchangeRateLabel').text(`Exchange Rate [TORO/USD]:`);
                break;
            case "naira":
                if (bals.is_naira) {$("#buyCurrencyBalVal").val(bals.bal_naira);}
                $("#buyCurrencyBalLabel").text("NGN Balance");
                $("#buyExchangeRateVal").val(exrates.rate_naira);
                $('#buyExchangeRateLabel').text(`Exchange Rate [TORO/NGN]:`);
                break;
            case "euro":
                if (bals.is_euro) {$("#buyCurrencyBalVal").val(bals.bal_euro);}
                $("#buyCurrencyBalLabel").text("EUR Balance");
                $("#buyExchangeRateVal").val(exrates.rate_euro);
                $('#buyExchangeRateLabel').text(`Exchange Rate [TORO/EUR]:`);
                break;
            case "pound":
                if (bals.is_pound) {$("#buyCurrencyBalVal").val(bals.bal_pound);}
                $("#buyCurrencyBalLabel").text("GBP Balance");
                $("#buyExchangeRateVal").val(exrates.rate_pound);
                $('#buyExchangeRateLabel').text(`Exchange Rate [TORO/GBP]:`);
                break;
            case "egp":
                if (bals.is_egp) {$("#buyCurrencyBalVal").val(bals.bal_egp);}
                $("#buyCurrencyBalLabel").text("EGP Balance");
                $("#buyExchangeRateVal").val(exrates.rate_egp);
                $('#buyExchangeRateLabel').text(`Exchange Rate [TORO/EGP]:`);
                break;
            case "ksh":
                if (bals.is_ksh) {$("#buyCurrencyBalVal").val(bals.bal_ksh);}
                $("#buyCurrencyBalLabel").text("KSH Balance");
                $("#buyExchangeRateVal").val(exrates.rate_ksh);
                $('#buyExchangeRateLabel').text(`Exchange Rate [TORO/KSH]:`);
                break;
            case "zar":
                if (bals.is_zar) {$("#buyCurrencyBalVal").val(bals.bal_zar);}
                $("#buyCurrencyBalLabel").text("ZAR Balance");
                $("#buyExchangeRateVal").val(exrates.rate_zar);
                $('#buyExchangeRateLabel').text(`Exchange Rate [TORO/ZAR]:`);
                break;
            case "eth":
                if (bals.is_eth) {$("#buyCurrencyBalVal").val(bals.bal_eth);}
                $("#buyCurrencyBalLabel").text("ETH Balance");
                $("#buyExchangeRateVal").val(exrates.rate_eth);
                $('#buyExchangeRateLabel').text(`Exchange Rate [TORO/ETH]:`);
                break;
        }
    });

    $('#sellCurrencySelect').unbind('change').change(function(){
        switch($(this).val()) {
            case "dollar":
                $("#sellExchangeRateVal").val(exrates.rate_dollar);
                $('#sellExchangeRateLabel').text(`Exchange Rate [TORO/USD]:`);
                break;
            case "naira":
                $("#sellExchangeRateVal").val(exrates.rate_naira);
                $('#sellExchangeRateLabel').text(`Exchange Rate [TORO/NGN]:`);
                break;
            case "euro":
                $("#sellExchangeRateVal").val(exrates.rate_euro);
                $('#sellExchangeRateLabel').text(`Exchange Rate [TORO/EUR]:`);
                break;
            case "pound":
                $("#sellExchangeRateVal").val(exrates.rate_pound);
                $('#sellExchangeRateLabel').text(`Exchange Rate [TORO/GBP]:`);
                break;
            case "egp":
                $("#sellExchangeRateVal").val(exrates.rate_egp);
                $('#sellExchangeRateLabel').text(`Exchange Rate [TORO/EGP]:`);
                break;
            case "ksh":
                $("#sellExchangeRateVal").val(exrates.rate_ksh);
                $('#sellExchangeRateLabel').text(`Exchange Rate [TORO/KSH]:`);
                break;
            case "zar":
                $("#sellExchangeRateVal").val(exrates.rate_zar);
                $('#sellExchangeRateLabel').text(`Exchange Rate [TORO/ZAR]:`);
                break;
            case "eth":
                $("#sellExchangeRateVal").val(exrates.rate_eth);
                $('#sellExchangeRateLabel').text(`Exchange Rate [TORO/ETH]:`);
                break;
        }
    });

    $('#mintModalForm').on('submit', function (e) {
        e.preventDefault();

        $("div.spanner").addClass("show");
        $("div.overlay").addClass("show");
        $(".logo > p").text("Processing ...");

        var request = {}
        request["op"] = "mint";
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
            "value": $('#mintAmount').val()
        });
        var body = JSON.stringify(request)
        console.log(body);
        $.ajax({
            url: token_ad_url,
            contentType: "application/json",
            data: body,
            dataType: "json",
            type: 'POST',
            success: (data, textStatus, xhr) => {
                if (data.result) {
                    $('#mintModal').modal('hide');
                    $('#successmsg').text(`${$('#mintAmount').val()} ${token_symbol} is minted into ${params.addr}`);
                    $("#successMsgAlert").addClass('show');

                    getData(params.addr);
                }
                else {
                    $('#mintModal').modal('hide');

                    console.log(data);
                    $('#errtitle').text('Invalid transaction!');
                    $('#errmsg').text(data.error);
                    $("#errorMsgAlert").addClass('show');

                    $("div.spanner").removeClass("show");
                    $("div.overlay").removeClass("show");
                }

            },
            error: function (xhr, status, error) {
                $('#mintModal').modal('hide');

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
            url: token_cl_url,
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
                        message: `The transaction fee will be ${data.fee} ${token_symbol}. Do you want to continue the transaction?`,
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
                                            url: token_cl_url,
                                            contentType: "application/json",
                                            data: body,
                                            dataType: "json",
                                            type: 'POST',
                                            success: (data, textStatus, xhr) => {
                                                if (data.result) {
                                                    $('#successmsg').text(`${params.addr} successfully send ${$('#sendAmount').val()} ${token_symbol} to ${$('#toAddr').val()}`);
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
                url: "https://testnet.toronet.org/api/currency/" + $("#buyCurrencySelect").val() + "/cl",
                data: $.param(request1),
                dataType: "json",
                processData: false,
                type: 'GET',
            }),
            $.ajax({
                url: "https://testnet.toronet.org/api/currency/" + $("#buyCurrencySelect").val() + "/cl",
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
                        message: `The purchase fee will be ${data1[0].fee} ${$("#buyCurrencySelect option:selected").text()}. ${data2[0].amount} TORO will be obtained. Do you want to continue the transaction?`,
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
                                            url: "https://testnet.toronet.org/api/currency/" + $("#buyCurrencySelect").val() + "/cl",
                                            contentType: "application/json",
                                            data: body,
                                            dataType: "json",
                                            type: 'POST',
                                            success: (data, textStatus, xhr) => {
                                                if (data.result) {
                                                    $('#successmsg').text(`${params.addr} successfully buy TORO with ${$('#buyAmount').val()} ${$("#buyCurrencySelect option:selected").text()}`);
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
                url: "https://testnet.toronet.org/api/currency/" + $("#sellCurrencySelect").val() + "/cl",
                data: $.param(request1),
                dataType: "json",
                processData: false,
                type: 'GET',
            }),
            $.ajax({
                url: "https://testnet.toronet.org/api/currency/" + $("#sellCurrencySelect").val() + "/cl",
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
                        message: `The purchase fee will be ${data1[0].fee} ${$("#sellCurrencySelect option:selected").text()}. ${data2[0].amount} TORO will be obtained. Do you want to continue the transaction?`,
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
                                            url: "https://testnet.toronet.org/api/currency/" + $("#sellCurrencySelect").val() + "/cl",
                                            contentType: "application/json",
                                            data: body,
                                            dataType: "json",
                                            type: 'POST',
                                            success: (data, textStatus, xhr) => {
                                                if (data.result) {
                                                    $('#successmsg').text(`${params.addr} successfully sell ${$('#sellAmount').val()} TORO to ${$("#sellCurrencySelect option:selected").text()}`);
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

    var url1 = token_url;
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

    var url3 = "https://testnet.toronet.org/api/query";
    var request3 = {}
    request3["op"] = "getaddrbalance";
    request3["params"] = [];
    request3.params.push({
        "name": "addr",
        "value": addr
    });

    var url4 = "https://testnet.toronet.org/api/query";
    var request4 = {}
    request4["op"] = "getexchangerates";
    request4["params"] = [];

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
                $('#token-bal').text(data1[0].balance + " " + token_symbol);
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
                bals = data3[0];
            }
            else {
                $('#errtitle').text('Error!');
                $('#errmsg').text(data3[0].error);
                $("#errorMsgAlert").addClass('show');
            }

            if (data4[0].result) {
                exrates = data4[0];
            }
            else {
                $('#errtitle').text('Error!');
                $('#errmsg').text(data4[0].error);
                $("#errorMsgAlert").addClass('show');
            }

            $('#buyCurrencySelect').change();
            $('#sellCurrencySelect').change();

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