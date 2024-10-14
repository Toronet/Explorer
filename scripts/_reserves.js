$(function () {
	//alert('in getdata');

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
	
	var theaddress;	
	theaddress = (params.address ? params.address : params.q);
	if (theaddress) {
		if (theaddress.length == 42) {
			window.location.assign('./address.html?address=' + theaddress);
		}
		if (theaddress.length == 110) {
			window.location.assign('./tx.html?id=' + theaddress);
		}
		//if (typeof theaddress === 'number') {
		if (isNumber(theaddress)) {
			window.location.assign('./block.html?block=' + theaddress);
		}
	}


    $('#link_wallet').attr("href", "address.html?address=" + theaddress);
    $('#link_token').attr("href", "address.html?token=" + theaddress);
    $('#link_currency').attr("href", "address.html?currency=" + theaddress);
    $('#link_crypto').attr("href", "address.html?crypto=" + theaddress);
    $('#link_tns').attr("href", "tx.html?address=" + theaddress);
	
    setInterval(function () {
        getData();
    }, 2000);

    $('#refreshBtn').click(function () {
        setInterval(function () {
            getData();
        }, 2000);
    });

    $('#errorMsgClose').click(function () {
        $("#errorMsgAlert").removeClass('show');
    });
});
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 

function getData() {
	
	//alert('in getdata');
	
    var url1 = "https://testnet.toronet.org/api/query";
    var request1 = {}
    request1["op"] = "gettransactions_egp";
    request1["params"] = [];
    request1.params.push({
        "name": "count",
        "value": "100"
    });

    var url2 = "https://testnet.toronet.org/api/query";
    var request2 = {}
    request2["op"] = "gettransactions_toro";
    request2["params"] = [];
    request2.params.push({
        "name": "count",
        "value": "100"
    });
	
    var url3 = "https://testnet.toronet.org/api/token/toro/";
    var request3 = {}
    request3["op"] = "gettotalreserving";
    request3["params"] = [];
	
    var url4 = "https://testnet.toronet.org/api/token/toro/";
    var request4 = {}
    request4["op"] = "gettotalcirculating";
    request4["params"] = [];

    var url5 = "https://testnet.toronet.org/api/currency/egp/";
    var request5 = {}
    request5["op"] = "gettotalreserving";
    request5["params"] = [];
	
    var url6 = "https://testnet.toronet.org/api/currency/egp/";
    var request6 = {}
    request6["op"] = "gettotalcirculating";
    request6["params"] = [];

	//KSH ------------------------------------------------------------------------------------
    var url7 = "https://testnet.toronet.org/api/query";
    var request7 = {}
    request7["op"] = "gettransactions_ksh";
    request7["params"] = [];
    request7.params.push({
        "name": "count",
        "value": "100"
    });

    var url8 = "https://testnet.toronet.org/api/currency/ksh/";
    var request8 = {}
    request8["op"] = "gettotalreserving";
    request8["params"] = [];
	
    var url9 = "https://testnet.toronet.org/api/currency/ksh/";
    var request9 = {}
    request9["op"] = "gettotalcirculating";
    request9["params"] = [];


	//NGN ------------------------------------------------------------------------------------
    var url10 = "https://testnet.toronet.org/api/query";
    var request10 = {}
    request10["op"] = "gettransactions_naira";
    request10["params"] = [];
    request10.params.push({
        "name": "count",
        "value": "100"
    });

    var url11 = "https://testnet.toronet.org/api/currency/naira/";
    var request11 = {}
    request11["op"] = "gettotalreserving";
    request11["params"] = [];
	
    var url12 = "https://testnet.toronet.org/api/currency/naira/";
    var request12 = {}
    request12["op"] = "gettotalcirculating";
    request12["params"] = [];


	//ZAR ------------------------------------------------------------------------------------
    var url13 = "https://testnet.toronet.org/api/query";
    var request13 = {}
    request13["op"] = "gettransactions_zar";
    request13["params"] = [];
    request13.params.push({
        "name": "count",
        "value": "100"
    });

    var url14 = "https://testnet.toronet.org/api/currency/zar/";
    var request14 = {}
    request14["op"] = "gettotalreserving";
    request14["params"] = [];
	
    var url15 = "https://testnet.toronet.org/api/currency/zar/";
    var request15 = {}
    request15["op"] = "gettotalcirculating";
    request15["params"] = [];


	//EXCHANGE RATES ------------------------------------------------------------------------------------

    var url16 = "https://testnet.toronet.org/api/query";
    var request16 = {}
    request16["op"] = "getexchangerates";
    request16["params"] = [];


	//GBP ------------------------------------------------------------------------------------
    var url17 = "https://testnet.toronet.org/api/query";
    var request17 = {}
    request17["op"] = "gettransactions_pound";
    request17["params"] = [];
    request17.params.push({
        "name": "count",
        "value": "100"
    });

    var url18 = "https://testnet.toronet.org/api/currency/pound/";
    var request18 = {}
    request18["op"] = "gettotalreserving";
    request18["params"] = [];
	
    var url19 = "https://testnet.toronet.org/api/currency/pound/";
    var request19 = {}
    request19["op"] = "gettotalcirculating";
    request19["params"] = [];


	//EUR ------------------------------------------------------------------------------------
    var url20 = "https://testnet.toronet.org/api/query";
    var request20 = {}
    request20["op"] = "gettransactions_euro";
    request20["params"] = [];
    request20.params.push({
        "name": "count",
        "value": "100"
    });

    var url21 = "https://testnet.toronet.org/api/currency/euro/";
    var request21 = {}
    request21["op"] = "gettotalreserving";
    request21["params"] = [];
	
    var url22 = "https://testnet.toronet.org/api/currency/euro/";
    var request22 = {}
    request22["op"] = "gettotalcirculating";
    request22["params"] = [];

	//USD ------------------------------------------------------------------------------------
    var url23 = "https://testnet.toronet.org/api/query";
    var request23 = {}
    request23["op"] = "gettransactions_dollar";
    request23["params"] = [];
    request23.params.push({
        "name": "count",
        "value": "100"
    });

    var url24 = "https://testnet.toronet.org/api/currency/dollar/";
    var request24 = {}
    request24["op"] = "gettotalreserving";
    request24["params"] = [];
	
    var url25 = "https://testnet.toronet.org/api/currency/dollar/";
    var request25 = {}
    request25["op"] = "gettotalcirculating";
    request25["params"] = [];

	//ETH ------------------------------------------------------------------------------------
    var url26 = "https://testnet.toronet.org/api/query";
    var request26 = {}
    request26["op"] = "gettransactions_eth";
    request26["params"] = [];
    request26.params.push({
        "name": "count",
        "value": "100"
    });

    var url27 = "https://testnet.toronet.org/api/crypto/eth/";
    var request27 = {}
    request27["op"] = "gettotalreserving";
    request27["params"] = [];
	
    var url28 = "https://testnet.toronet.org/api/crypto/eth/";
    var request28 = {}
    request28["op"] = "gettotalcirculating";
    request28["params"] = [];



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
        $.ajax({
            url: url6,
            data: $.param(request6),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),
        $.ajax({
            url: url7,
            data: $.param(request7),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),
        $.ajax({
            url: url8,
            data: $.param(request8),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),
        $.ajax({
            url: url9,
            data: $.param(request9),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url10,
            data: $.param(request10),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url11,
            data: $.param(request11),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url12,
            data: $.param(request12),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url13,
            data: $.param(request13),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url14,
            data: $.param(request14),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url15,
            data: $.param(request15),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url16,
            data: $.param(request16),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url17,
            data: $.param(request17),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url18,
            data: $.param(request18),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url19,
            data: $.param(request19),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url20,
            data: $.param(request20),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url21,
            data: $.param(request21),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url22,
            data: $.param(request22),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url23,
            data: $.param(request23),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url24,
            data: $.param(request24),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url25,
            data: $.param(request25),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url26,
            data: $.param(request26),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url27,
            data: $.param(request27),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url28,
            data: $.param(request28),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		



    ).then(
        (data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16, data17, data18, data19, data20, data21, data22, data23, data24, data25, data26, data27, data28) => {
            console.log(data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16, data17, data18, data19, data20, data21, data22, data23, data24, data25, data26, data27, data28);

			//totals
			var totalreserve = 0;
			var totalcirculating = 0;
			var totaloffchain = 0;
			
			//alert('in checkresults');
			var rate_eth = 3000;
			var rate_dollar = 3000;
			var rate_naira = 3000;
			var rate_euro = 3000;
			
			var rate_pound = 3000;
			var rate_egp = 3000;
			var rate_ksh = 3000;
			var rate_zar = 3000;
			
            if (data16[0].result) {
				//alert(data16[0].rate_eth);
                rate_eth = parseFloat(data16[0].rate_eth);
                rate_dollar = parseFloat(data16[0].rate_dollar);
                rate_naira = parseFloat(data16[0].rate_naira);
                rate_euro = parseFloat(data16[0].rate_euro);
				
                rate_pound = parseFloat(data16[0].rate_pound);
                rate_egp = parseFloat(data16[0].rate_egp);
                rate_ksh = parseFloat(data16[0].rate_ksh);
                rate_zar = parseFloat(data16[0].rate_zar);
            }
            else {
				console.log('error: the API call to getrates did not work');
				//alert('error: the API call to getrates did not work');
            }

			//alert(data3[0].totalreserving);
            if (data3[0].result) {
				//alert(data3[0].totalreserving);
				totalreserve += parseFloat(data3[0].totalreserving);
                $('#toros_in_reserve').text( parseFloat(data3[0].totalreserving).toLocaleString() + ' TOROs' );
            }
            else {
				console.log('error: the API call to TORO getreserve did not work');
				//alert('error: the API call to TORO getreserve did not work');
            }

            if (data4[0].result) {
				//alert(data4.totalcirculating);
                //$('#circulating_toros').text(parseFloat(data4[0].totalcirculating).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' TOROs' );
				totalcirculating += parseFloat(data4[0].totalcirculating);
                $('#toros_in_circulation').text(parseFloat(data4[0].totalcirculating).toLocaleString() + ' TOROs' );
            }
            else {
				console.log('error: the API call to TORO getcirculating did not work');
				//alert('error: the API call to TORO getcirculating did not work');
            }		
			//alert('after toros: ' + totalreserve);

			//alert(data5[0].totalreserving);
            if (data5[0].result) {
				//alert(data5[0].totalreserving);
				totalreserve += parseFloat(data5[0].totalreserving)*rate_egp;
                $('#egps_in_reserve').text( parseFloat(data5[0].totalreserving).toLocaleString() + ' τEGPs' );
            }
            else {
				console.log('error: the API call to EGP getreserve did not work');
				//alert('error: the API call to EGP getreserve did not work');
            }

            if (data6[0].result) {
				//alert(data6.totalcirculating);
                //$('#circulating_toros').text(parseFloat(data6[0].totalcirculating).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τEGPs' );
				totalcirculating += parseFloat(data6[0].totalcirculating)*rate_egp;
                $('#egps_in_circulation').text(parseFloat(data6[0].totalcirculating).toLocaleString() + ' τEGPs' );
            }
            else {
				console.log('error: the API call to EGP getcirculating did not work');
				//alert('error: the API call to EGP getcirculating did not work');
            }	
			//alert('after egps: ' + totalreserve);			

			//alert(data8[0].totalreserving);
            if (data8[0].result) {
				//alert(data8[0].totalreserving);
				totalreserve += parseFloat(data8[0].totalreserving)*rate_ksh;
                $('#kshs_in_reserve').text( parseFloat(data8[0].totalreserving).toLocaleString() + ' τKSHs' );
            }
            else {
				console.log('error: the API call to KSH getreserve did not work');
				//alert('error: the API call to KSH getreserve did not work');
            }

            if (data9[0].result) {
				//alert(data9.totalcirculating);
                //$('#kshs_in_circulation').text(parseFloat(data9[0].totalcirculating).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τKSHs' );
				totalcirculating += parseFloat(data9[0].totalcirculating)*rate_ksh;
                $('#kshs_in_circulation').text(parseFloat(data9[0].totalcirculating).toLocaleString() + ' τKSHs' );
            }
            else {
				console.log('error: the API call to KSH getcirculating did not work');
				//alert('error: the API call to KSH getcirculating did not work');
            }		
			//alert('after kshs: ' + totalreserve);

			//alert(data11[0].totalreserving);
            if (data11[0].result) {
				//alert(data11[0].totalreserving);
				totalreserve += parseFloat(data11[0].totalreserving)*rate_naira;
                $('#ngns_in_reserve').text( parseFloat(data11[0].totalreserving).toLocaleString() + ' τNGNs' );
            }
            else {
				console.log('error: the API call to NGN getreserve did not work');
				//alert('error: the API call to NGN getreserve did not work');
            }

            if (data12[0].result) {
				//alert(data12.totalcirculating);
                //$('#ngns_in_circulation').text(parseFloat(data12[0].totalcirculating).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τNGNs' );
				totalcirculating += parseFloat(data12[0].totalcirculating)*rate_naira;
                $('#ngns_in_circulation').text(parseFloat(data12[0].totalcirculating).toLocaleString() + ' τNGNs' );
            }
            else {
				console.log('error: the API call to NGN getcirculating did not work');
				//alert('error: the API call to NGN getcirculating did not work');
            }
			//alert('after nairas: ' + totalreserve);

			//alert(data14[0].totalreserving);
            if (data14[0].result) {
				//alert(data14[0].totalreserving);
				totalreserve += parseFloat(data14[0].totalreserving)*rate_zar;
                $('#zars_in_reserve').text( parseFloat(data14[0].totalreserving).toLocaleString() + ' τZARs' );
            }
            else {
				console.log('error: the API call to ZAR getreserve did not work');
				//alert('error: the API call to ZAR getreserve did not work');
            }

            if (data15[0].result) {
				//alert(data15.totalcirculating);
                //$('#zars_in_circulation').text(parseFloat(data15[0].totalcirculating).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τZARs' );
				totalcirculating += parseFloat(data15[0].totalcirculating)*rate_zar;
                $('#zars_in_circulation').text( parseFloat(data15[0].totalcirculating).toLocaleString() + ' τZARs' );
            }
            else {
				console.log('error: the API call to ZAR getcirculating did not work');
				//alert('error: the API call to ZAR getcirculating did not work');
            }	
			//alert('after zars: ' + totalreserve);

			//alert(data18[0].totalreserving);
            if (data18[0].result) {
				//alert(data18[0].totalreserving);
				totalreserve += parseFloat(data18[0].totalreserving)*rate_pound;
                $('#gbps_in_reserve').text( parseFloat(data18[0].totalreserving).toLocaleString() + ' τGBPs' );
            }
            else {
				console.log('error: the API call to GBP getreserve did not work');
				//alert('error: the API call to GBP getreserve did not work');
            }

            if (data19[0].result) {
				//alert(data19.totalcirculating);
                //$('#gbps_in_circulation').text(parseFloat(data19[0].totalcirculating).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τGBPs' );
				totalcirculating += parseFloat(data19[0].totalcirculating)*rate_pound;
                $('#gbps_in_circulation').text('Circulating : ' + parseFloat(data19[0].totalcirculating).toLocaleString() + ' τGBPs' );
            }
            else {
				console.log('error: the API call to GBP getcirculating did not work');
				//alert('error: the API call to GBP getcirculating did not work');
            }
			//alert('after gbps: ' + totalreserve);			

			//alert(data21[0].totalreserving);
            if (data21[0].result) {
				//alert(data21[0].totalreserving);
				totalreserve += parseFloat(data21[0].totalreserving)*rate_pound;
                $('#eurs_in_reserve').text( parseFloat(data21[0].totalreserving).toLocaleString() + ' τEURs' );
            }
            else {
				console.log('error: the API call to EUR getreserve did not work');
				//alert('error: the API call to EUR getreserve did not work');
            }

            if (data22[0].result) {
				//alert(data22.totalcirculating);
                //$('#gbps_in_circulation').text(parseFloat(data22[0].totalcirculating).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τEURs' );
				totalcirculating += parseFloat(data22[0].totalcirculating)*rate_pound;
                $('#eurs_in_circulation').text('Circulating : ' + parseFloat(data22[0].totalcirculating).toLocaleString() + ' τEURs' );
            }
            else {
				console.log('error: the API call to EUR getcirculating did not work');
				//alert('error: the API call to EUR getcirculating did not work');
            }
			//alert('after gbps: ' + totalreserve);			


			//-----------------------------------------------------------------------------------------------------
			
            if (data2[0].result) {
				//alert('Processing data from the API');
				var offchaintoros = 10146.5;
                let tbdata = processTxData(data2[0].data);
                if (tbdata.length > 0) {
                    for (i = 0; i < tbdata.length - 1; i++) {
						if (tbdata[i].type == 'TORO mint') offchaintoros += tbdata[i].value;
						if (tbdata[i].type == 'TORO burn') offchaintoros -= tbdata[i].value;
						if (tbdata[i].type == 'TORO mint reserve') offchaintoros += tbdata[i].value;
						if (tbdata[i].type == 'TORO burn reserve') offchaintoros -= tbdata[i].value;
                    }
					if (tbdata[i].type == 'TORO mint') offchaintoros += tbdata[i].value;
					if (tbdata[i].type == 'TORO burn') offchaintoros -= tbdata[i].value;
					if (tbdata[i].type == 'TORO mint reserve') offchaintoros += tbdata[i].value;
					if (tbdata[i].type == 'TORO burn reserve') offchaintoros -= tbdata[i].value;
                }
                $('#toros_minted_or_burnt').text( parseFloat(offchaintoros).toLocaleString() + ' TOROs' );
				totaloffchain += parseFloat(offchaintoros);
            }
            else {
				console.log('error: the API call to toro transactions did not work');
				//alert('error: the API call did not work');
            }
			
            if (data1[0].result) {
				//alert('Processing data from the API');
				var offchainegps = 0 * 1;
                let tbdata = processTxData(data1[0].data);
                if (tbdata.length > 0) {
                    for (i = 0; i < tbdata.length - 1; i++) {
						if (tbdata[i].type == 'EGP mint') offchainegps += tbdata[i].value;
						if (tbdata[i].type == 'EGP burn') offchainegps -= tbdata[i].value;
						if (tbdata[i].type == 'EGP mint reserve') offchainegps += tbdata[i].value;
						if (tbdata[i].type == 'EGP burn reserve') offchainegps -= tbdata[i].value;
						if (tbdata[i].type == 'τEGP deposit') offchainegps += tbdata[i].value;
						if (tbdata[i].type == 'τEGP withdrawal') offchainegps -= tbdata[i].value;
						if (tbdata[i].type == 'τEGP deposit reserve') offchainegps += tbdata[i].value;
						if (tbdata[i].type == 'τEGP withdrawal reserve') offchainegps -= tbdata[i].value;
						//alert(i.toString() + ' ' + tbdata[i].type + ' Value: ' + tbdata[i].value + ' Total: ' + offchainegps.toString());
                    }
					if (tbdata[i].type == 'EGP mint') offchainegps += tbdata[i].value;
					if (tbdata[i].type == 'EGP burn') offchainegps -= tbdata[i].value;
					if (tbdata[i].type == 'EGP mint reserve') offchainegps += tbdata[i].value;
					if (tbdata[i].type == 'EGP burn reserve') offchainegps -= tbdata[i].value;
					if (tbdata[i].type == 'τEGP deposit') offchainegps += tbdata[i].value;
					if (tbdata[i].type == 'τEGP withdrawal') offchainegps -= tbdata[i].value;
					if (tbdata[i].type == 'τEGP deposit reserve') offchainegps += tbdata[i].value;
					if (tbdata[i].type == 'τEGP deposit reserve') offchainegps -= tbdata[i].value;
					//alert(i.toString() + ' ' + tbdata[i].type + ' Value: ' + tbdata[i].value + ' Total: ' + offchainegps.toString());
                }
                $('#egps_deposited_or_withdrawn').text( parseFloat(offchainegps).toLocaleString() + ' EGPs' );
				totaloffchain += parseFloat(offchainegps)*rate_egp;
            }
            else {
				console.log('error: the API call to egp transactions did not work');
				//alert('error: the API call did not work');
            }			

            if (data7[0].result) {
				//alert('Processing data from the API');
				var offchainkshs = 0;
                let tbdata = processTxData(data7[0].data);
                if (tbdata.length > 0) {
                    for (i = 0; i < tbdata.length - 1; i++) {
						//alert(tbdata[i].type);
						if (tbdata[i].type == 'KSH mint') offchainkshs += tbdata[i].value;
						if (tbdata[i].type == 'KSH burn') offchainkshs -= tbdata[i].value;
						if (tbdata[i].type == 'KSH mint reserve') offchainkshs += tbdata[i].value;
						if (tbdata[i].type == 'KSH burn reserve') offchainkshs -= tbdata[i].value;
						if (tbdata[i].type == 'τKSH deposit') offchainkshs += tbdata[i].value;
						if (tbdata[i].type == 'τKSH withdrawal') offchainkshs -= tbdata[i].value;
						if (tbdata[i].type == 'τKSH deposit reserve') offchainkshs += tbdata[i].value;
						if (tbdata[i].type == 'τKSH deposit reserve') offchainkshs -= tbdata[i].value;
                    }
					if (tbdata[i].type == 'KSH mint') offchainkshs += tbdata[i].value;
					if (tbdata[i].type == 'KSH burn') offchainkshs -= tbdata[i].value;
					if (tbdata[i].type == 'KSH mint reserve') offchainkshs += tbdata[i].value;
					if (tbdata[i].type == 'KSH burn reserve') offchainkshs -= tbdata[i].value;
					if (tbdata[i].type == 'τKSH deposit') offchainkshs += tbdata[i].value;
					if (tbdata[i].type == 'τKSH withdrawal') offchainkshs -= tbdata[i].value;
					if (tbdata[i].type == 'τKSH deposit reserve') offchainkshs += tbdata[i].value;
					if (tbdata[i].type == 'τKSH deposit reserve') offchainkshs -= tbdata[i].value;
                }
                $('#kshs_deposited_or_withdrawn').text( parseFloat(offchainkshs).toLocaleString() + ' KSHs' );
 				totaloffchain += parseFloat(offchainkshs)*rate_ksh;
           }
            else {
				console.log('error: the API call to ksh transactions did not work');
				//alert('error: the API call did not work');
            }	


            if (data10[0].result) {
				//alert('Processing data from the API');
				var offchainngns = 0;
                let tbdata = processTxData(data10[0].data);
                if (tbdata.length > 0) {
                    for (i = 0; i < tbdata.length - 1; i++) {
						//alert(tbdata[i].type);
						if (tbdata[i].type == 'NGN mint') offchainngns += tbdata[i].value;
						if (tbdata[i].type == 'NGN burn') offchainngns -= tbdata[i].value;
						if (tbdata[i].type == 'NGN mint reserve') offchainngns += tbdata[i].value;
						if (tbdata[i].type == 'NGN burn reserve') offchainngns -= tbdata[i].value;
						if (tbdata[i].type == 'τNGN deposit') offchainngns += tbdata[i].value;
						if (tbdata[i].type == 'τNGN withdrawal') offchainngns -= tbdata[i].value;
						if (tbdata[i].type == 'τNGN deposit reserve') offchainngns += tbdata[i].value;
						if (tbdata[i].type == 'τNGN deposit reserve') offchainngns -= tbdata[i].value;
                    }
					if (tbdata[i].type == 'NGN mint') offchainngns += tbdata[i].value;
					if (tbdata[i].type == 'NGN burn') offchainngns -= tbdata[i].value;
					if (tbdata[i].type == 'NGN mint reserve') offchainngns += tbdata[i].value;
					if (tbdata[i].type == 'NGN burn reserve') offchainngns -= tbdata[i].value;
					if (tbdata[i].type == 'τNGN deposit') offchainngns += tbdata[i].value;
					if (tbdata[i].type == 'τNGN withdrawal') offchainngns -= tbdata[i].value;
					if (tbdata[i].type == 'τNGN deposit reserve') offchainngns += tbdata[i].value;
					if (tbdata[i].type == 'τNGN deposit reserve') offchainngns -= tbdata[i].value;
                }
                $('#ngns_deposited_or_withdrawn').text( parseFloat(offchainngns).toLocaleString() + ' NGNs' );
				totaloffchain += parseFloat(offchainngns)*rate_naira;
            }
            else {
				console.log('error: the API call to ngn transactions did not work');
				//alert('error: the API call did not work');
            }
			

            if (data13[0].result) {
				//alert('Processing data from the API');
				var offchainzars = 0;
                let tbdata = processTxData(data13[0].data);
                if (tbdata.length > 0) {
                    for (i = 0; i < tbdata.length - 1; i++) {
						//alert(tbdata[i].type);
						if (tbdata[i].type == 'ZAR mint') offchainzars += tbdata[i].value;
						if (tbdata[i].type == 'ZAR burn') offchainzars -= tbdata[i].value;
						if (tbdata[i].type == 'ZAR mint reserve') offchainzars += tbdata[i].value;
						if (tbdata[i].type == 'ZAR burn reserve') offchainzars -= tbdata[i].value;
						if (tbdata[i].type == 'τZAR deposit') offchainzars += tbdata[i].value;
						if (tbdata[i].type == 'τZAR withdrawal') offchainzars -= tbdata[i].value;
						if (tbdata[i].type == 'τZAR deposit reserve') offchainzars += tbdata[i].value;
						if (tbdata[i].type == 'τZAR deposit reserve') offchainzars -= tbdata[i].value;
                    }
					if (tbdata[i].type == 'ZAR mint') offchainzars += tbdata[i].value;
					if (tbdata[i].type == 'ZAR burn') offchainzars -= tbdata[i].value;
					if (tbdata[i].type == 'ZAR mint reserve') offchainzars += tbdata[i].value;
					if (tbdata[i].type == 'ZAR burn reserve') offchainzars -= tbdata[i].value;
					if (tbdata[i].type == 'τZAR deposit') offchainzars += tbdata[i].value;
					if (tbdata[i].type == 'τZAR withdrawal') offchainzars -= tbdata[i].value;
					if (tbdata[i].type == 'τZAR deposit reserve') offchainzars += tbdata[i].value;
					if (tbdata[i].type == 'τZAR deposit reserve') offchainzars -= tbdata[i].value;
                }
                $('#zars_deposited_or_withdrawn').text( parseFloat(offchainzars).toLocaleString() + ' ZARs' );
				totaloffchain += parseFloat(offchainzars)*rate_zar;
            }
            else {
				console.log('error: the API call to zar transactions did not work');
				//alert('error: the API call did not work');
            }
			
            if (data17[0].result) {
				//alert('Processing data from the API');
				var offchaingbps = 0;
                let tbdata = processTxData(data17[0].data);
                if (tbdata.length > 0) {
                    for (i = 0; i < tbdata.length - 1; i++) {
						//alert(tbdata[i].type);
						if (tbdata[i].type == 'GBP mint') offchaingbps += tbdata[i].value;
						if (tbdata[i].type == 'GBP burn') offchaingbps -= tbdata[i].value;
						if (tbdata[i].type == 'GBP mint reserve') offchaingbps += tbdata[i].value;
						if (tbdata[i].type == 'GBP burn reserve') offchaingbps -= tbdata[i].value;
						if (tbdata[i].type == 'τGBP deposit') offchaingbps += tbdata[i].value;
						if (tbdata[i].type == 'τGBP withdrawal') offchaingbps -= tbdata[i].value;
						if (tbdata[i].type == 'τGBP deposit reserve') offchaingbps += tbdata[i].value;
						if (tbdata[i].type == 'τGBP deposit reserve') offchaingbps -= tbdata[i].value;
                    }
					//alert(tbdata[i].type);
					if (tbdata[i].type == 'GBP mint') offchaingbps += tbdata[i].value;
					if (tbdata[i].type == 'GBP burn') offchaingbps -= tbdata[i].value;
					if (tbdata[i].type == 'GBP mint reserve') offchaingbps += tbdata[i].value;
					if (tbdata[i].type == 'GBP burn reserve') offchaingbps -= tbdata[i].value;
					if (tbdata[i].type == 'τGBP deposit') offchaingbps += tbdata[i].value;
					if (tbdata[i].type == 'τGBP withdrawal') offchaingbps -= tbdata[i].value;
					if (tbdata[i].type == 'τGBP deposit reserve') offchaingbps += tbdata[i].value;
					if (tbdata[i].type == 'τGBP deposit reserve') offchaingbps -= tbdata[i].value;
                }
                $('#gbps_deposited_or_withdrawn').text( parseFloat(offchaingbps).toLocaleString() + ' GBPs' );
				totaloffchain += parseFloat(offchaingbps)*rate_pound;
            }
            else {
				console.log('error: the API call to gbp transactions did not work');
				//alert('error: the API call did not work');
            }
			

            
			
			
			$('#total_in_reserve').text( parseFloat(totalreserve).toLocaleString() + ' TOROs' );
			$('#total_in_circulation').text( parseFloat(totalcirculating).toLocaleString() + ' TOROs' );
			$('#total_deposited_or_withdrawn').text( parseFloat(totaloffchain).toLocaleString() + ' TOROs' );

        },
        err => {
            console.log(err);
			//alert('error: the API call did not work');
            $('#errtitle').text('Error!');
            $('#errmsg').text('Unexpected error! Please contact us!');
            $("#errorMsgAlert").addClass('show');
        }
    );
}


		
		