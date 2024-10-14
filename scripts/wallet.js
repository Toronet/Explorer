$(function () {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
	
	var theaddress;	
	theaddress = (params.address ? params.address : params.q);
	if (theaddress) {
		if (theaddress.length == 42) {
			//window.location.assign('./address.html?address=' + theaddress);
		}
		if (theaddress.length == 110) {
			window.location.assign('./tx.html?id=' + theaddress);
		}
		if (isNumber(theaddress)) {
			window.location.assign('./block.html?block=' + theaddress);
		}
	}
	
	
    $('#addresslbl').text("Address: " + theaddress);

    $('#link_wallet').attr("href", "address.html?address=" + theaddress);
    $('#link_token').attr("href", "address.html?token=" + theaddress);
    $('#link_currency').attr("href", "address.html?currency=" + theaddress);
    $('#link_crypto').attr("href", "address.html?crypto=" + theaddress);
    $('#link_tns').attr("href", "tx.html?address=" + theaddress);
	
    setInterval(function () {
        getData(theaddress);
    }, 3000);

    $('#refreshBtn').click(function () {
        $("div.spanner").addClass("show");
        $("div.overlay").addClass("show");
        $(".logo > p").text("Refreshing ...");
        setInterval(function () {
            getData(theaddress);
        }, 3000);
    });

    $('#errorMsgClose').click(function () {
        $("#errorMsgAlert").removeClass('show');
    });
});

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 

function getData(addr) {
    var url1 = "https://testnet.toronet.org/api/query";
    var request1 = {}
    request1["op"] = "getaddrbalance";
    request1["params"] = [];
    request1.params.push({
        "name": "addr",
        "value": addr
    });

    var url2 = "https://testnet.toronet.org/api/query";
    var request2 = {}
    request2["op"] = "getaddrrole";
    request2["params"] = [];
    request2.params.push({
        "name": "addr",
        "value": addr
    });

    var url3 = "https://testnet.toronet.org/api/tns";
    var request3 = {}
    request3["op"] = "getname";
    request3["params"] = [];
    request3.params.push({
        "name": "addr",
        "value": addr
    });

    var url4 = "https://testnet.toronet.org/api/query"
    var request4 = {}
    request4["op"] = "getaddrtransactions";
    request4["params"] = [];
    request4.params.push({
        "name": "addr",
        "value": addr
    });
    request4.params.push({
        "name": "count",
        "value": "100"
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
			
			//alert(data4[0].result);

            if (data1[0].result) {
                $('#toro_bal').text(data1[0].is_toro ? data1[0].bal_toro + ' TORO' : '');
                $('#eth_bal').text(data1[0].is_eth > 0 ? data1[0].bal_eth + ' τETH' : '');
                $('#dollar_bal').text(data1[0].is_dollar > 0 ? data1[0].bal_dollar + ' τUSD' : '');
                $('#naira_bal').text(data1[0].is_naira > 0 ? data1[0].bal_naira + ' τNGN' : '');
                $('#euro_bal').text(data1[0].is_euro > 0 ? data1[0].bal_euro + ' τEUR' : '');
                $('#pound_bal').text(data1[0].is_pound > 0 ? data1[0].bal_pound + ' τGBP' : '');
                $('#egp_bal').text(data1[0].is_egp > 0 ? data1[0].bal_egp + ' τEGP' : '');
                $('#ksh_bal').text(data1[0].is_ksh > 0 ? data1[0].bal_ksh + ' τKSH' : '');
                $('#zar_bal').text(data1[0].is_zar > 0 ? data1[0].bal_zar + ' τZAR' : '');
                $('#espees_bal').text(data1[0].is_espees ? data1[0].bal_espees + ' ESP' : '');
                $('#bal_plast').text(data1[0].is_plast ? data1[0].bal_plast + 'PLAST' : '');

                //$('#toro_bal_total').text(data1[0].is_toro ? '$' + data1[0].bal_toro + ' (@ $1.00/TORO)' : 'n/a');
				var overallbalance;
				var balance;
                overallbalance = (data1[0].is_toro ? data1[0].bal_toro + ' TORO' : '');
                if (data1[0].bal_eth > 0) overallbalance += ',\n' + (data1[0].is_eth > 0 ? data1[0].bal_eth + ' τETH' : '');
                if (data1[0].bal_dollar > 0) overallbalance += ',\n' + (data1[0].is_dollar > 0 ? data1[0].bal_dollar + ' τUSD' : '');
                if (data1[0].bal_naira > 0) overallbalance += ',\n' + (data1[0].is_naira > 0 ? data1[0].bal_naira + ' τNGN' : '');
                if (data1[0].bal_euro > 0) overallbalance += ',\n' + (data1[0].is_euro > 0 ? data1[0].bal_euro + ' τEUR' : '');
                if (data1[0].bal_pound > 0) overallbalance += ',\n' + (data1[0].is_pound > 0 ? data1[0].bal_pound + ' τGBP' : '');
                if (data1[0].bal_egp > 0) overallbalance += ',\n' + (data1[0].is_egp > 0 ? data1[0].bal_egp + ' τEGP' : '');
                if (data1[0].bal_ksh > 0) overallbalance += ',\n' + (data1[0].is_ksh > 0 ? data1[0].bal_ksh + ' τKSH' : '');
                if (data1[0].bal_zar > 0) overallbalance += ',\n' + (data1[0].is_zar > 0 ? data1[0].bal_zar + ' τZAR' : '');
                if (data1[0].bal_espees > 0) overallbalance += ',\n' + (data1[0].is_espees > 0 ? data1[0].bal_espees + ' ESP' : '');
                if (data1[0].bal_plast > 0) overallbalance += ',\n' + (data1[0].is_plast > 0 ? data1[0].bal_plast + ' PLAST' : '');
				
                $('#toro_bal_all').text(overallbalance);
				//alert('here');

            }
            else {
                $('#errtitle').text('Error!');
                $('#errmsg').text(data1[0].error);
                $("#errorMsgAlert").addClass('show');
            }

            if (data2[0].result) {
                $('#profile_role').text(data2[0].role);
            }
            else {
                $('#errtitle').text('Error!');
                $('#errmsg').text(data1[0].error);
                $("#errorMsgAlert").addClass('show');
            }

            if (data3[0].result) {
                $('#profile_tns').text(data3[0].name);
            }
            else {
                $('#profile_tns').text('n/a');
            }

            if (data4[0].result) {
                let tbdata = processTxDataAddress(data4[0].data, addr);
                //$('#txtable').bootstrapTable({
                //    data: tbdata,
                //});
                //$('#txtable').bootstrapTable('load', tbdata);
				//alert(addr);
                $("#txtable").find('tbody').val = "";
                if (tbdata.length > 0) {
                    $("#txtable").find('tbody').empty();
                    for (i = 0; i < tbdata.length - 1; i++) {
                        $("#txtable").find('tbody').append("<tr><td align=right>" + tbdata[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].from + "'>" + tbdata[i].from_trunc2 + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].to + "'>" + tbdata[i].to_trunc2 + "</a></td><td align=right><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].hash_trunc2 + "</a></td><td align=right>" + tbdata[i].description + "</td><td align=left>" + tbdata[i].value + "</td></tr>");
                    }
                    $("#txtable").find('tbody').append("<tr><td align=right>" + tbdata[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].from + "'>" + tbdata[i].from_trunc2 + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].to + "'>" + tbdata[i].to_trunc2 + "</a></td><td align=right><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].hash_trunc2 + "</a></td><td align=right>" + tbdata[i].description + "</td><td align=left>" + tbdata[i].value + "</td></tr>");
                }
				else
				{
					$("#txtable").find('tbody').empty();
                    $("#txtable").find('tbody').append("<tr><td align=left colspan=7>This address has no transactions</td></tr>");
					
					if (addr == "0xc34260c62f08a5177f784261878d2c38643be262") $("#txtable").find('tbody').append("<tr><td align=left colspan=7>This address is the ToroCorp Node transaction generation address.</td></tr>");
					if (addr == "0xe9183b8e4c8d7a14d3a2bca3bcb9c06ceb1afac6") $("#txtable").find('tbody').append("<tr><td align=left colspan=7>This address is the OsoCorp Node transaction generation address.</td></tr>");
					if (addr == "0x7ba7f0148c9cd0466533a08e82f8ce7329de55ea") $("#txtable").find('tbody').append("<tr><td align=left colspan=7>This address is the MoneyWorx Node transaction generation address.</td></tr>");
					if (addr == "0x379ace8d6d8adaa6a822b4ec727efc4dfa50a46f") $("#txtable").find('tbody').append("<tr><td align=left colspan=7>This address is the Espees Node transaction generation address.</td></tr>");
				}
            }
            else 
			{
				$("#txtable").find('tbody').empty();
                $("#txtable").find('tbody').append("<tr><td align=left colspan=7>This address has no transactions</td></tr>");				
            }

            if (data4[0].result) {
                let tbdatatoro = processTxDataAddress(data4[0].data, addr);
                //$('#txtabletoro').bootstrapTable({
                //    data: tbdatatoro,
                //});
                //$('#txtabletoro').bootstrapTable('load', tbdatatoro);
                $("#txtabletoro").find('tbody').val = "";
                if (tbdatatoro.length > 0) {
                    $("#txtabletoro").find('tbody').empty();
                    for (i = 0; i < tbdatatoro.length - 1; i++) {
                        $("#txtabletoro").find('tbody').append("<tr><td align=right>" + tbdatatoro[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdatatoro[i].hash + "'>" + tbdatatoro[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdatatoro[i].from + "'>" + tbdatatoro[i].from_trunc2 + "</a></td><td align=right><a href='./address.html?address=" + tbdatatoro[i].to + "'>" + tbdatatoro[i].to_trunc2 + "</a></td><td align=right><a href='./tx.html?id=" + tbdatatoro[i].hash + "'>" + tbdatatoro[i].hash_trunc2 + "</a></td><td align=left>" + tbdatatoro[i].description + "</td><td align=left>" + tbdatatoro[i].value + "</td></tr>");
                    }
                    $("#txtabletoro").find('tbody').append("<tr><td align=right>" + tbdatatoro[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdatatoro[i].hash + "'>" + tbdatatoro[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdatatoro[i].from + "'>" + tbdatatoro[i].from_trunc2 + "</a></td><td align=right><a href='./address.html?address=" + tbdatatoro[i].to + "'>" + tbdatatoro[i].to_trunc2 + "</a></td><td align=right><a href='./tx.html?id=" + tbdatatoro[i].hash + "'>" + tbdatatoro[i].hash_trunc2 + "</a></td><td align=left>" + tbdatatoro[i].description + "</td><td align=left>" + tbdatatoro[i].value + "</td></tr>");
                }					
				else 
				{
					$("#txtabletoro").find('tbody').empty();
					$("#txtabletoro").find('tbody').append("<tr><td align=left colspan=7>This address has no toro transactions</td></tr>");				
					if (addr == "0x3bd6ca1dc2b1895ec521693454da419d24dbc488") $("#txtabletoro").find('tbody').append("<tr><td align=left colspan=7>This address is the ToroCorp Node transaction generation address.</td></tr>");
					if (addr == "0x38771a427d2690b1f56aa036ed78fefaedd38306") $("#txtabletoro").find('tbody').append("<tr><td align=left colspan=7>This address is the MoneyWorx Node transaction generation address.</td></tr>");
					if (addr == "0x3c909d0b3eb5672f9654ab1554f9bfdaec3cea4e") $("#txtabletoro").find('tbody').append("<tr><td align=left colspan=7>This address is the OsoCorp Node transaction generation address.</td></tr>");
					if (addr == "0x379ace8d6d8adaa6a822b4ec727efc4dfa50a46f") $("#txtabletoro").find('tbody').append("<tr><td align=left colspan=7>This address is the Espees Node transaction generation address.</td></tr>");
				}
            }
            else 
			{
				$("#txtabletoro").find('tbody').empty();
                $("#txtabletoro").find('tbody').append("<tr><td align=left colspan=7>This address has no toro transactions</td></tr>");				
            }

            if (data4[0].result) {
                let tbdatatoken = processTxDataAddress(data4[0].data, addr);
                //$('#txtabletoken').bootstrapTable({
                //    data: tbdatatoken,
                //});
                //$('#txtabletoken').bootstrapTable('load', tbdatatoken);
                $("#txtabletoken").find('tbody').val = "";
                if (tbdatatoken.length > 0) {
                    $("#txtabletoken").find('tbody').empty();
                    for (i = 0; i < tbdatatoken.length - 1; i++) {
                        $("#txtabletoken").find('tbody').append("<tr><td align=right>" + tbdatatoken[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdatatoken[i].hash + "'>" + tbdatatoken[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdatatoken[i].from + "'>" + tbdatatoken[i].from_trunc2 + "</a></td><td align=right><a href='./address.html?address=" + tbdatatoken[i].to + "'>" + tbdatatoken[i].to_trunc2 + "</a></td><td align=right><a href='./tx.html?id=" + tbdatatoken[i].hash + "'>" + tbdatatoken[i].hash_trunc2 + "</a></td><td align=left>" + tbdatatoken[i].description + "</td><td align=left>" + tbdatatoken[i].value + "</td></tr>");
                    }
                    $("#txtabletoken").find('tbody').append("<tr><td align=right>" + tbdatatoken[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdatatoken[i].hash + "'>" + tbdatatoken[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdatatoken[i].from + "'>" + tbdatatoken[i].from_trunc2 + "</a></td><td align=right><a href='./address.html?address=" + tbdatatoken[i].to + "'>" + tbdatatoken[i].to_trunc2 + "</a></td><td align=right><a href='./tx.html?id=" + tbdatatoken[i].hash + "'>" + tbdatatoken[i].hash_trunc2 + "</a></td><td align=left>" + tbdatatoken[i].description + "</td><td align=left>" + tbdatatoken[i].value + "</td></tr>");
                }					
				else 
				{
					$("#txtabletoken").find('tbody').empty();
					$("#txtabletoken").find('tbody').append("<tr><td align=left colspan=7>This address has no token transactions</td></tr>");				
					if (addr == "0x3bd6ca1dc2b1895ec521693454da419d24dbc488") $("#txtabletoken").find('tbody').append("<tr><td align=left colspan=7>This address is the ToroCorp Node transaction generation address.</td></tr>");
					if (addr == "0x38771a427d2690b1f56aa036ed78fefaedd38306") $("#txtabletoken").find('tbody').append("<tr><td align=left colspan=7>This address is the MoneyWorx Node transaction generation address.</td></tr>");
					if (addr == "0x3c909d0b3eb5672f9654ab1554f9bfdaec3cea4e") $("#txtabletoken").find('tbody').append("<tr><td align=left colspan=7>This address is the OsoCorp Node transaction generation address.</td></tr>");
					if (addr == "0x379ace8d6d8adaa6a822b4ec727efc4dfa50a46f") $("#txtabletoken").find('tbody').append("<tr><td align=left colspan=7>This address is the Espees Node transaction generation address.</td></tr>");
				}
            }
            else 
			{
				$("#txtabletoken").find('tbody').empty();
                $("#txtabletoken").find('tbody').append("<tr><td align=left colspan=7>This address has no token transactions</td></tr>");				
            }

            if (data4[0].result) {
                let tbdatacrypto = processTxDataAddress(data4[0].data, addr);
                //$('#txtablecrypto').bootstrapTable({
                //    data: tbdatacrypto,
                //});
                //$('#txtablecrypto').bootstrapTable('load', tbdatacrypto);
                $("#txtablecrypto").find('tbody').val = "";
                if (tbdatacrypto.length > 0) {
                    $("#txtablecrypto").find('tbody').empty();
                    for (i = 0; i < tbdatacrypto.length - 1; i++) {
                        $("#txtablecrypto").find('tbody').append("<tr><td align=right>" + tbdatacrypto[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdatacrypto[i].hash + "'>" + tbdatacrypto[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdatacrypto[i].from + "'>" + tbdatacrypto[i].from_trunc2 + "</a></td><td align=right><a href='./address.html?address=" + tbdatacrypto[i].to + "'>" + tbdatacrypto[i].to_trunc2 + "</a></td><td align=right><a href='./tx.html?id=" + tbdatacrypto[i].hash + "'>" + tbdatacrypto[i].hash_trunc2 + "</a></td><td align=left>" + tbdatacrypto[i].description + "</td><td align=left>" + tbdatacrypto[i].value + "</td></tr>");
                    }
                    $("#txtablecrypto").find('tbody').append("<tr><td align=right>" + tbdatacrypto[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdatacrypto[i].hash + "'>" + tbdatacrypto[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdatacrypto[i].from + "'>" + tbdatacrypto[i].from_trunc2 + "</a></td><td align=right><a href='./address.html?address=" + tbdatacrypto[i].to + "'>" + tbdatacrypto[i].to_trunc2 + "</a></td><td align=right><a href='./tx.html?id=" + tbdatacrypto[i].hash + "'>" + tbdatacrypto[i].hash_trunc2 + "</a></td><td align=left>" + tbdatacrypto[i].description + "</td><td align=left>" + tbdatacrypto[i].value + "</td></tr>");
                }					
				else 
				{
					$("#txtablecrypto").find('tbody').empty();
					$("#txtablecrypto").find('tbody').append("<tr><td align=left colspan=7>This address has no crypto transactions</td></tr>");				
					if (addr == "0x3bd6ca1dc2b1895ec521693454da419d24dbc488") $("#txtablecrypto").find('tbody').append("<tr><td align=left colspan=7>This address is the ToroCorp Node transaction generation address.</td></tr>");
					if (addr == "0x38771a427d2690b1f56aa036ed78fefaedd38306") $("#txtablecrypto").find('tbody').append("<tr><td align=left colspan=7>This address is the MoneyWorx Node transaction generation address.</td></tr>");
					if (addr == "0x3c909d0b3eb5672f9654ab1554f9bfdaec3cea4e") $("#txtablecrypto").find('tbody').append("<tr><td align=left colspan=7>This address is the OsoCorp Node transaction generation address.</td></tr>");
					if (addr == "0x379ace8d6d8adaa6a822b4ec727efc4dfa50a46f") $("#txtablecrypto").find('tbody').append("<tr><td align=left colspan=7>This address is the Espees Node transaction generation address.</td></tr>");
				}

            }
            else 
			{
				$("#txtablecrypto").find('tbody').empty();
                $("#txtablecrypto").find('tbody').append("<tr><td align=left colspan=7>This address has no crypto transactions</td></tr>");				
            }

            if (data4[0].result) {
                let tbdatapending = processTxDataAddress(data4[0].data, addr);
                //$('#txtablepending').bootstrapTable({
                //    data: tbdatapending,
                //});
                //$('#txtablepending').bootstrapTable('load', tbdatapending);
                $("#txtablepending").find('tbody').val = "";
                if (tbdatapending.length > 0) {
                    $("#txtablepending").find('tbody').empty();
                    for (i = 0; i < tbdatapending.length - 1; i++) {
                        $("#txtablepending").find('tbody').append("<tr><td align=right>" + tbdatapending[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdatapending[i].hash + "'>" + tbdatapending[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdatapending[i].from + "'>" + tbdatapending[i].from_trunc2 + "</a></td><td align=right><a href='./address.html?address=" + tbdatapending[i].to + "'>" + tbdatapending[i].to_trunc2 + "</a></td><td align=right><a href='./tx.html?id=" + tbdatapending[i].hash + "'>" + tbdatapending[i].hash_trunc2 + "</a></td><td align=left>" + tbdatapending[i].description + "</td><td align=left>" + tbdatapending[i].value + "</td></tr>");
                    }
                    $("#txtablepending").find('tbody').append("<tr><td align=right>" + tbdatapending[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdatapending[i].hash + "'>" + tbdatapending[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdatapending[i].from + "'>" + tbdatapending[i].from_trunc2 + "</a></td><td align=right><a href='./address.html?address=" + tbdatapending[i].to + "'>" + tbdatapending[i].to_trunc2 + "</a></td><td align=right><a href='./tx.html?id=" + tbdatapending[i].hash + "'>" + tbdatapending[i].hash_trunc2 + "</a></td><td align=left>" + tbdatapending[i].description + "</td><td align=left>" + tbdatapending[i].value + "</td></tr>");
                }					
				else 
				{
					$("#txtablepending").find('tbody').empty();
					$("#txtablepending").find('tbody').append("<tr><td align=left colspan=7>This address has no pending transactions</td></tr>");				
					if (addr == "0x3bd6ca1dc2b1895ec521693454da419d24dbc488") $("#txtablepending").find('tbody').append("<tr><td align=left colspan=7>This address is the ToroCorp Node transaction generation address.</td></tr>");
					if (addr == "0x38771a427d2690b1f56aa036ed78fefaedd38306") $("#txtablepending").find('tbody').append("<tr><td align=left colspan=7>This address is the MoneyWorx Node transaction generation address.</td></tr>");
					if (addr == "0x3c909d0b3eb5672f9654ab1554f9bfdaec3cea4e") $("#txtablepending").find('tbody').append("<tr><td align=left colspan=7>This address is the OsoCorp Node transaction generation address.</td></tr>");
					if (addr == "0x379ace8d6d8adaa6a822b4ec727efc4dfa50a46f") $("#txtablepending").find('tbody').append("<tr><td align=left colspan=7>This address is the Espees Node transaction generation address.</td></tr>");
				}
            }
            else 
			{
				$("#txtablepending").find('tbody').empty();
                $("#txtablepending").find('tbody').append("<tr><td align=left colspan=7>This address has no pending transactions</td></tr>");				
            }

            $("div.spanner").removeClass("show");
            $("div.overlay").removeClass("show");
        },
        err => {
            console.log(err);
            $('#errtitle').text('Error!');
            $('#errmsg').text('Unexpected error! Please contact us!');
            $("#errorMsgAlert").addClass('show');
        }
    );
}