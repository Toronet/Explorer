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
    request1["op"] = "getoffchain_egp";
    request1["params"] = [];

    var url2 = "https://testnet.toronet.org/api/query";
    var request2 = {}
    request2["op"] = "getoffchain_toro";
    request2["params"] = [];
	
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
    request7["op"] = "getoffchain_ksh";
    request7["params"] = [];

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
    request10["op"] = "getoffchain_naira";
    request10["params"] = [];

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
    request13["op"] = "getoffchain_zar";
    request13["params"] = [];

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
    request17["op"] = "getoffchain_pound";
    request17["params"] = [];

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
    request20["op"] = "getoffchain_euro";
    request20["params"] = [];


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
    request23["op"] = "getoffchain_dollar";
    request23["params"] = [];

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
    request26["op"] = "getoffchain_eth";
    request26["params"] = [];

    var url27 = "https://testnet.toronet.org/api/crypto/eth/";
    var request27 = {}
    request27["op"] = "gettotalreserving";
    request27["params"] = [];
	
    var url28 = "https://testnet.toronet.org/api/crypto/eth/";
    var request28 = {}
    request28["op"] = "gettotalcirculating";
    request28["params"] = [];


	// Market cap

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
			
			var totalcap_toro = 0;
			var totalcap_egp = 0;
			var totalcap_ksh = 0;
			var totalcap_naira = 0;
			var totalcap_zar = 0;
			var totalcap_euro = 0;
			var totalcap_pound = 0;
			var totalcap_dollar = 0;
			var totalcap_eth = 0;
			
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

			//TORO --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data3[0].totalreserving);
            if (data3[0].result) {
				//alert(data3[0].totalreserving);
				totalreserve += parseFloat(data3[0].totalreserving);
				totalcap_toro += parseFloat(data3[0].totalreserving);
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
				totalcap_toro += parseFloat(data4[0].totalcirculating);
                $('#toros_in_circulation').text(parseFloat(data4[0].totalcirculating).toLocaleString() + ' TOROs' );
            }
            else {
				console.log('error: the API call to TORO getcirculating did not work');
				//alert('error: the API call to TORO getcirculating did not work');
            }		
			
            if (data2[0].result) {
				//alert('Processing data from the API');
				var offchaintoros = data2[0].data[0].OffChainReserves;
				//alert(data2[0].data[0].OffChainReserves);
                $('#toros_minted_or_burnt').text( parseFloat(offchaintoros).toLocaleString() + ' TOROs' );
				totaloffchain += parseFloat(offchaintoros);
            }
            else {
				console.log('error: the API call to toro transactions did not work');
				//alert('error: the API call did not work');
            }
			$('#toros_in_totalcap').text(totalcap_toro.toLocaleString() + ' TOROs' );
			//alert('after toros Reserve: ' + totalreserve.toString() + ' Circulating: ' + totalcirculating.toString() + ' Total: ' + (totalreserve+totalcirculating).toString() + 'OffChain:' + totaloffchain.toString());


			//EGP --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data5[0].totalreserving);
            if (data5[0].result) {
				//alert(data5[0].totalreserving);
				totalreserve += parseFloat(data5[0].totalreserving)*rate_egp;
				totalcap_egp += parseFloat(data5[0].totalreserving);
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
				totalcap_egp += parseFloat(data6[0].totalcirculating);
                $('#egps_in_circulation').text(parseFloat(data6[0].totalcirculating).toLocaleString() + ' τEGPs' );
            }
            else {
				console.log('error: the API call to EGP getcirculating did not work');
				//alert('error: the API call to EGP getcirculating did not work');
            }
			
            if (data1[0].result) {
				//alert('Processing data from the API');
				var offchainegps = data1[0].data[0].OffChainReserves;
                $('#egps_deposited_or_withdrawn').text( parseFloat(offchainegps).toLocaleString() + ' EGPs' );
				totaloffchain += parseFloat(offchainegps)*rate_egp;
            }
            else {
				console.log('error: the API call to egp transactions did not work');
				//alert('error: the API call did not work');
            }			
			$('#egps_in_totalcap').text(totalcap_egp.toLocaleString() + ' EGPs' );
			//alert('after egps Reserve: ' + totalreserve.toString() + ' Circulating: ' + totalcirculating.toString() + ' Total: ' + (totalreserve+totalcirculating).toString() + 'OffChain:' + totaloffchain.toString());


			//KSH --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data8[0].totalreserving);
            if (data8[0].result) {
				//alert(data8[0].totalreserving);
				totalreserve += parseFloat(data8[0].totalreserving)*rate_ksh;
				totalcap_ksh += parseFloat(data8[0].totalreserving);
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
				totalcap_ksh += parseFloat(data9[0].totalcirculating);
                $('#kshs_in_circulation').text(parseFloat(data9[0].totalcirculating).toLocaleString() + ' τKSHs' );
            }
            else {
				console.log('error: the API call to KSH getcirculating did not work');
				//alert('error: the API call to KSH getcirculating did not work');
            }		
			
            if (data7[0].result) {
				//alert('Processing data from the API');
				var offchainkshs = data7[0].data[0].OffChainReserves;

                $('#kshs_deposited_or_withdrawn').text( parseFloat(offchainkshs).toLocaleString() + ' τKSHs' );
 				totaloffchain += parseFloat(offchainkshs)*rate_ksh;
           }
            else {
				console.log('error: the API call to ksh transactions did not work');
				//alert('error: the API call did not work');
            }	
			$('#kshs_in_totalcap').text(totalcap_ksh.toLocaleString() + ' τKSHs' );
			//alert('after kshs Reserve: ' + totalreserve.toString() + ' Circulating: ' + totalcirculating.toString() + ' Total: ' + (totalreserve+totalcirculating).toString() + 'OffChain:' + totaloffchain.toString());
			

			//NGN --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data11[0].totalreserving);
            if (data11[0].result) {
				//alert(data11[0].totalreserving);
				totalreserve += parseFloat(data11[0].totalreserving)*rate_naira;
				totalcap_naira += parseFloat(data11[0].totalreserving);
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
				totalcap_naira += parseFloat(data12[0].totalcirculating);
                $('#ngns_in_circulation').text(parseFloat(data12[0].totalcirculating).toLocaleString() + ' τNGNs' );
            }
            else {
				console.log('error: the API call to NGN getcirculating did not work');
				//alert('error: the API call to NGN getcirculating did not work');
            }
			
            if (data10[0].result) {
				//alert('Processing data from the API');
				var offchainngns = data10[0].data[0].OffChainReserves;                
				$('#ngns_deposited_or_withdrawn').text( parseFloat(offchainngns).toLocaleString() + ' τNGNs' );
				totaloffchain += parseFloat(offchainngns)*rate_naira;
            }
            else {
				console.log('error: the API call to ngn transactions did not work');
				//alert('error: the API call did not work');
            }
			$('#ngns_in_totalcap').text(totalcap_naira.toLocaleString() + ' τNGNs' );
			//alert('after ngns Reserve: ' + totalreserve.toString() + ' Circulating: ' + totalcirculating.toString() + ' Total: ' + (totalreserve+totalcirculating).toString() + 'OffChain:' + totaloffchain.toString());


			//ZAR --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data14[0].totalreserving);
            if (data14[0].result) {
				//alert(data14[0].totalreserving);
				totalreserve += parseFloat(data14[0].totalreserving)*rate_zar;
				totalcap_zar += parseFloat(data14[0].totalreserving);
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
				totalcap_zar += parseFloat(data15[0].totalcirculating);
                $('#zars_in_circulation').text( parseFloat(data15[0].totalcirculating).toLocaleString() + ' τZARs' );
            }
            else {
				console.log('error: the API call to ZAR getcirculating did not work');
				//alert('error: the API call to ZAR getcirculating did not work');
            }	
			
            if (data13[0].result) {
				//alert('Processing data from the API');
				var offchainzars = data13[0].data[0].OffChainReserves;
                $('#zars_deposited_or_withdrawn').text( parseFloat(offchainzars).toLocaleString() + ' τZARs' );
				totaloffchain += parseFloat(offchainzars)*rate_zar;
            }
            else {
				console.log('error: the API call to zar transactions did not work');
				//alert('error: the API call did not work');
            }
			$('#zars_in_totalcap').text(totalcap_zar.toLocaleString() + ' τZARs' );
			//alert('after zars Reserve: ' + totalreserve.toString() + ' Circulating: ' + totalcirculating.toString() + ' Total: ' + (totalreserve+totalcirculating).toString() + 'OffChain:' + totaloffchain.toString());


			//GBP --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data18[0].totalreserving);
            if (data18[0].result) {
				//alert(data18[0].totalreserving);
				totalreserve += parseFloat(data18[0].totalreserving)*rate_pound;
				totalcap_pound += parseFloat(data18[0].totalreserving);
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
				totalcap_pound += parseFloat(data19[0].totalcirculating);
                $('#gbps_in_circulation').text( parseFloat(data19[0].totalcirculating).toLocaleString() + ' τGBPs' );
            }
            else {
				console.log('error: the API call to GBP getcirculating did not work');
				//alert('error: the API call to GBP getcirculating did not work');
            }
			
            if (data17[0].result) {
				//alert('Processing data from the API');
				var offchaingbps = data17[0].data[0].OffChainReserves;
                $('#gbps_deposited_or_withdrawn').text( parseFloat(offchaingbps).toLocaleString() + ' τGBPs' );
				totaloffchain += parseFloat(offchaingbps)*rate_pound;
            }
            else {
				console.log('error: the API call to gbp transactions did not work');
				//alert('error: the API call did not work');
            }
			$('#gbps_in_totalcap').text(totalcap_pound.toLocaleString() + ' τGBPs' );
			//alert('after gbps Reserve: ' + totalreserve.toString() + ' Circulating: ' + totalcirculating.toString() + ' Total: ' + (totalreserve+totalcirculating).toString() + 'OffChain:' + totaloffchain.toString());


			//EUR --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data21[0].totalreserving);
            if (data21[0].result) {
				//alert(data21[0].d);
				totalreserve += parseFloat(data21[0].totalreserving)*rate_euro;
				totalcap_euro += parseFloat(data21[0].totalreserving);
                $('#eurs_in_reserve').text( parseFloat(data21[0].totalreserving).toLocaleString() + ' τEURs' );
            }
            else {
				console.log('error: the API call to EUR getreserve did not work');
				//alert('error: the API call to EUR getreserve did not work');
            }

            if (data22[0].result) {
				//alert(data22.totalcirculating);
                //$('#gbps_in_circulation').text(parseFloat(data22[0].totalcirculating).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τEURs' );
				totalcirculating += parseFloat(data22[0].totalcirculating)*rate_euro;
				totalcap_euro += parseFloat(data22[0].totalcirculating);
                $('#eurs_in_circulation').text(parseFloat(data22[0].totalcirculating).toLocaleString() + ' τEURs' );
            }
            else {
				console.log('error: the API call to EUR getcirculating did not work');
				//alert('error: the API call to EUR getcirculating did not work');
            }
			
            if (data20[0].result) {
				//alert('Processing data from the API');
				var offchaineuros = data20[0].data[0].OffChainReserves;
                $('#eurs_deposited_or_withdrawn').text( parseFloat(offchaineuros).toLocaleString() + ' τEURs' );
				totaloffchain += parseFloat(offchaineuros)*rate_euro;
            }
            else {
				console.log('error: the API call to usd transactions did not work');
				//alert('error: the API call did not work');
            }
			$('#eurs_in_totalcap').text(totalcap_euro.toLocaleString() + ' τEUROs' );
			//alert('after eurs Reserve: ' + totalreserve.toString() + ' Circulating: ' + totalcirculating.toString() + ' Total: ' + (totalreserve+totalcirculating).toString() + 'OffChain:' + totaloffchain.toString());


			//USD --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data24[0].totalreserving);
            if (data24[0].result) {
				//alert(data24[0].d);
				totalreserve += parseFloat(data24[0].totalreserving)*rate_dollar;
				totalcap_dollar += parseFloat(data24[0].totalreserving);
                $('#usds_in_reserve').text( parseFloat(data24[0].totalreserving).toLocaleString() + ' τUSDs' );
            }
            else {
				console.log('error: the API call to USD getreserve did not work');
				//alert('error: the API call to USD getreserve did not work');
            }

            if (data25[0].result) {
				//alert(data25.totalcirculating);
                //$('#gbps_in_circulation').text(parseFloat(data25[0].totalcirculating).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τUSDs' );
				totalcirculating += parseFloat(data25[0].totalcirculating)*rate_dollar;
				totalcap_dollar += parseFloat(data25[0].totalcirculating);
                $('#usds_in_circulation').text(parseFloat(data25[0].totalcirculating).toLocaleString() + ' τUSDs' );
            }
            else {
				console.log('error: the API call to τUSDs getcirculating did not work');
				//alert('error: the API call to τUSDs getcirculating did not work');
            }
			
            if (data23[0].result) {
				//alert('Processing data from the API');
				var offchaindollars = data23[0].data[0].OffChainReserves;
                $('#usds_deposited_or_withdrawn').text( parseFloat(offchaindollars).toLocaleString() + ' τUSDs' );
				totaloffchain += parseFloat(offchaindollars)*rate_dollar;
            }
            else {
				console.log('error: the API call to usd transactions did not work');
				//alert('error: the API call did not work');
            }
			$('#usds_in_totalcap').text(totalcap_toro.toLocaleString() + ' τUSDs' );
			//alert('after usds Reserve: ' + totalreserve.toString() + ' Circulating: ' + totalcirculating.toString() + ' Total: ' + (totalreserve+totalcirculating).toString() + 'OffChain:' + totaloffchain.toString());
			

			//ETH --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data27[0].totalreserving);
            if (data27[0].result) {
				//alert(data27[0].d);
				totalreserve += parseFloat(data27[0].totalreserving)*rate_eth;
				totalcap_eth += parseFloat(data27[0].totalreserving);
                $('#eths_in_reserve').text( parseFloat(data27[0].totalreserving).toLocaleString() + ' τETHs' );
            }
            else {
				console.log('error: the API call to ETH getreserve did not work');
				//alert('error: the API call to ETH getreserve did not work');
            }

            if (data28[0].result) {
				//alert(data28.totalcirculating);
                //$('#gbps_in_circulation').text(parseFloat(data28[0].totalcirculating).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τETHs' );
				totalcirculating += parseFloat(data28[0].totalcirculating)*rate_eth;
				totalcap_eth += parseFloat(data28[0].totalcirculating);
                $('#eths_in_circulation').text(parseFloat(data28[0].totalcirculating).toLocaleString() + ' τETHs' );
            }
            else {
				console.log('error: the API call to ETH getcirculating did not work');
				//alert('error: the API call to ETH getcirculating did not work');
            }
			
            if (data26[0].result) {
				//alert('Processing data from the API');
				var offchaineths = data26[0].data[0].OffChainReserves;
                $('#eths_deposited_or_withdrawn').text( parseFloat(offchaineths).toLocaleString() + ' τETHs' );
				totaloffchain += parseFloat(offchaineths)*rate_eth;
            }
            else {
				console.log('error: the API call to eth transactions did not work');
				//alert('error: the API call did not work');
            }
			$('#eths_in_totalcap').text(totalcap_eth.toLocaleString() + ' τETHs' );
			//alert('after eths Reserve: ' + totalreserve.toString() + ' Circulating: ' + totalcirculating.toString() + ' Total: ' + (totalreserve+totalcirculating).toString() + 'OffChain:' + totaloffchain.toString());
			
				
			
			//-----------------------------------------------------------------------------------------------------
			

			
    
			
			
			$('#total_in_reserve').text( parseFloat(totalreserve).toLocaleString() + ' TOROs' );
			$('#total_in_circulation').text( parseFloat(totalcirculating).toLocaleString() + ' TOROs' );
			$('#total_in_totalcap').text((totalreserve+totalcirculating).toLocaleString() + ' TOROs' );
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


		
		