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
	
	//TORO ------------------------------------------------------------------------------------
    var url2 = "https://testnet.toronet.org/api/query";
    var request2 = {}
    request2["op"] = "getoffchain_toro";
    request2["params"] = [];
	
    var url3 = "https://testnet.toronet.org/api/token/toro/";
    var request3 = {}
    request3["op"] = "getbalance";
    request3["params"] = [];
	request3.params.push({
        "name": "addr",
        "value": "0x02c810e0324bEc4735ab01E97a6eA524c78aAfD9"
    });
	
    var url4 = "https://testnet.toronet.org/api/token/toro/";
    var request4 = {}
    request4["op"] = "gettotalcap";
    request4["params"] = [];

	//EGP ------------------------------------------------------------------------------------
     var url1 = "https://testnet.toronet.org/api/query";
    var request1 = {}
    request1["op"] = "getoffchain_egp";
    request1["params"] = [];

    var url5 = "https://testnet.toronet.org/api/currency/egp/";
    var request5 = {}
    request5["op"] = "getbalance";
    request5["params"] = [];
	request5.params.push({
        "name": "addr",
        "value": "0x79f91162034fc300090f36dE574fFA877Db8690E"
    });
	
    var url6 = "https://testnet.toronet.org/api/currency/egp/";
    var request6 = {}
    request6["op"] = "gettotalcap";
    request6["params"] = [];

	//KSH ------------------------------------------------------------------------------------
    var url7 = "https://testnet.toronet.org/api/query";
    var request7 = {}
    request7["op"] = "getoffchain_ksh";
    request7["params"] = [];

    var url8 = "https://testnet.toronet.org/api/currency/ksh/";
    var request8 = {}
    request8["op"] = "getbalance";
    request8["params"] = [];
	request8.params.push({
        "name": "addr",
        "value": "0xE41cda11231d85c341403d89fC8776c6207EcC70"
    });
	
    var url9 = "https://testnet.toronet.org/api/currency/ksh/";
    var request9 = {}
    request9["op"] = "gettotalcap";
    request9["params"] = [];


	//NGN ------------------------------------------------------------------------------------
    var url10 = "https://testnet.toronet.org/api/query";
    var request10 = {}
    request10["op"] = "getoffchain_naira";
    request10["params"] = [];

    var url11 = "https://testnet.toronet.org/api/currency/naira/";
    var request11 = {}
    request11["op"] = "getbalance";
    request11["params"] = [];
	request11.params.push({
        "name": "addr",
        "value": "0xB18d59Ca4895c3bB189E20aA8d6626F537ff5EB3"
    });
	
    var url12 = "https://testnet.toronet.org/api/currency/naira/";
    var request12 = {}
    request12["op"] = "gettotalcap";
    request12["params"] = [];


	//ZAR ------------------------------------------------------------------------------------
    var url13 = "https://testnet.toronet.org/api/query";
    var request13 = {}
    request13["op"] = "getoffchain_zar";
    request13["params"] = [];

    var url14 = "https://testnet.toronet.org/api/currency/zar/";
    var request14 = {}
    request14["op"] = "getbalance";
    request14["params"] = [];
	request14.params.push({
        "name": "addr",
        "value": "0xC63e734f7956131A56282761ba424BaE19b204c0"
    });
	
    var url15 = "https://testnet.toronet.org/api/currency/zar/";
    var request15 = {}
    request15["op"] = "gettotalcap";
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
    request18["op"] = "getbalance";
    request18["params"] = [];
	request18.params.push({
        "name": "addr",
        "value": "0xdB7b3d62f4B777511d5e315980232a67381e3bAd"
    });
	
    var url19 = "https://testnet.toronet.org/api/currency/pound/";
    var request19 = {}
    request19["op"] = "gettotalcap";
    request19["params"] = [];


	//EUR ------------------------------------------------------------------------------------
    var url20 = "https://testnet.toronet.org/api/query";
    var request20 = {}
    request20["op"] = "getoffchain_euro";
    request20["params"] = [];


    var url21 = "https://testnet.toronet.org/api/currency/euro/";
    var request21 = {}
    request21["op"] = "getbalance";
    request21["params"] = [];
	request21.params.push({
        "name": "addr",
        "value": "0x8B07881fcbe9e9f8C0117e17331bE5fC349f78bD"
    });
	
    var url22 = "https://testnet.toronet.org/api/currency/euro/";
    var request22 = {}
    request22["op"] = "gettotalcap";
    request22["params"] = [];

	//USD ------------------------------------------------------------------------------------
    var url23 = "https://testnet.toronet.org/api/query";
    var request23 = {}
    request23["op"] = "getoffchain_dollar";
    request23["params"] = [];

    var url24 = "https://testnet.toronet.org/api/currency/dollar/";
    var request24 = {}
    request24["op"] = "getbalance";
    request24["params"] = [];
	request24.params.push({
        "name": "addr",
        "value": "0xa2c9c9d192F574Ef94327F05b623664b4135bDAf"
    });
	
    var url25 = "https://testnet.toronet.org/api/currency/dollar/";
    var request25 = {}
    request25["op"] = "gettotalcap";
    request25["params"] = [];

	//ETH ------------------------------------------------------------------------------------
    var url26 = "https://testnet.toronet.org/api/query";
    var request26 = {}
    request26["op"] = "getoffchain_eth";
    request26["params"] = [];

    var url27 = "https://testnet.toronet.org/api/crypto/eth/";
    var request27 = {}
    request27["op"] = "getbalance";
    request27["params"] = [];
	request27.params.push({
        "name": "addr",
        "value": "0xd5088703630185a56ae424F1eb8ECd842b9C84e0"
    });
	
    var url28 = "https://testnet.toronet.org/api/crypto/eth/";
    var request28 = {}
    request28["op"] = "gettotalcap";
    request28["params"] = [];
	
	//ESPS ------------------------------------------------------------------------------------
    var url29 = "https://testnet.toronet.org/api/query";
    var request29 = {}
    request29["op"] = "getoffchain_espees";
    request29["params"] = [];

    var url30 = "https://testnet.toronet.org/api/coin/espees/";
    var request30 = {}
    request30["op"] = "getbalance";
    request30["params"] = [];
	request30.params.push({
        "name": "addr",
        "value": "0xAA42139C29829D83922f4C7c89E9008ab94f1F6b"
    });
	
    var url31 = "https://testnet.toronet.org/api/coin/espees/";
    var request31 = {}
    request31["op"] = "gettotalcap";
    request31["params"] = [];

	//PLAST ------------------------------------------------------------------------------------
    var url32 = "https://testnet.toronet.org/api/query";
    var request32 = {}
    request32["op"] = "getoffchain_espees";
    request32["params"] = [];

    var url33 = "https://testnet.toronet.org/api/coin/plast/";
    var request33 = {}
    request33["op"] = "getbalance";
    request33["params"] = [];
	request33.params.push({
        "name": "addr",
        "value": "0x119B12B3AE9cbC0957D5AEf14C1C15AC562Ac87c"
    });
	
    var url34 = "https://testnet.toronet.org/api/coin/plast/";
    var request34 = {}
    request34["op"] = "gettotalcap";
    request34["params"] = [];







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
        $.ajax({
            url: url29,
            data: $.param(request29),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url30,
            data: $.param(request30),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url31,
            data: $.param(request31),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url32,
            data: $.param(request32),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url33,
            data: $.param(request33),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		
        $.ajax({
            url: url34,
            data: $.param(request34),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),		



    ).then(
        (data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16, data17, data18, data19, data20, data21, data22, data23, data24, data25, data26, data27, data28, data29, data30, data31, data32, data33, data34) => {
            console.log(data26, data27, data28, data29, data30, data31, data32, data33, data34);

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
			
			var rate_espees = 3000;
			var rate_plast = 3000;
			
			var totalcap_toro = 0;
			var totalcap_egp = 0;
			var totalcap_ksh = 0;
			var totalcap_naira = 0;
			var totalcap_zar = 0;
			var totalcap_euro = 0;
			var totalcap_pound = 0;
			var totalcap_dollar = 0;
			var totalcap_eth = 0;
			var totalcap_esps = 0;
			var totalcap_plast = 0;
			
			var totalreserve_toro = 0;
			var totalreserve_egp = 0;
			var totalreserve_ksh = 0;
			var totalreserve_naira = 0;
			var totalreserve_zar = 0;
			var totalreserve_euro = 0;
			var totalreserve_pound = 0;
			var totalreserve_dollar = 0;
			var totalreserve_eth = 0;
			var totalreserve_esps = 0;
			var totalreserve_plast = 0;
			
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
				
                rate_espees = parseFloat(data16[0].rate_espees);
                rate_plast = parseFloat(data16[0].rate_plast);
            }
            else {
				console.log('error: the API call to getrates did not work');
				//alert('error: the API call to getrates did not work');
            }

			//TORO --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data3[0].balance);
            if (data3[0].result) {
				//alert(data3[0].balance);
				totalreserve += parseFloat(data3[0].balance);
				totalreserve_toro += parseFloat(data3[0].balance);
                $('#toros_in_reserve').text( parseFloat(data3[0].balance).toLocaleString() + ' TOROs' );
            }
            else {
				console.log('error: the API call to TORO getreserve did not work');
				//alert('error: the API call to TORO getreserve did not work');
            }

            if (data4[0].result) {
				//alert(data4.totalcap);
                //$('#totalcap').text(parseFloat(data4[0].totalcap).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' TOROs' );
				totalcirculating += parseFloat(data4[0].totalcap);
				totalcap_toro += parseFloat(data4[0].totalcap);
                $('#toros_in_circulation').text((totalcap_toro-totalreserve_toro).toLocaleString() + ' TOROs' );
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
			//alert(data5[0].balance);
            if (data5[0].result) {
				//alert(data5[0].balance);
				totalreserve += parseFloat(data5[0].balance)*rate_egp;
				totalreserve_egp += parseFloat(data5[0].balance);
                $('#egps_in_reserve').text( parseFloat(data5[0].balance).toLocaleString() + ' τEGPs' );
            }
            else {
				console.log('error: the API call to EGP getreserve did not work');
				//alert('error: the API call to EGP getreserve did not work');
            }

            if (data6[0].result) {
				//alert(data6.totalcap);
                //$('#circulating_toros').text(parseFloat(data6[0].totalcap).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τEGPs' );
				totalcirculating += parseFloat(data6[0].totalcap)*rate_egp;
				totalcap_egp += parseFloat(data6[0].totalcap);
                $('#egps_in_circulation').text((totalcap_egp-totalreserve_egp).toLocaleString() + ' τEGPs' );
            }
            else {
				console.log('error: the API call to EGP getcirculating did not work');
				//alert('error: the API call to EGP getcirculating did not work');
            }
			
            if (data1[0].result) {
				//alert('Processing data from the API');
				var offchainegps = data1[0].data[0].OffChainReserves;
                $('#egps_deposited_or_withdrawn').text( parseFloat(offchainegps).toLocaleString() + ' τEGPs' );
				totaloffchain += parseFloat(offchainegps)*rate_egp;
            }
            else {
				console.log('error: the API call to egp transactions did not work');
				//alert('error: the API call did not work');
            }			
			$('#egps_in_totalcap').text(totalcap_egp.toLocaleString() + ' τEGPs' );
			//alert('after egps Reserve: ' + totalreserve.toString() + ' Circulating: ' + totalcirculating.toString() + ' Total: ' + (totalreserve+totalcirculating).toString() + 'OffChain:' + totaloffchain.toString());


			//KSH --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data8[0].balance);
            if (data8[0].result) {
				//alert(data8[0].balance);
				totalreserve += parseFloat(data8[0].balance)*rate_ksh;
				totalreserve_ksh += parseFloat(data8[0].balance);
                $('#kshs_in_reserve').text( parseFloat(data8[0].balance).toLocaleString() + ' τKSHs' );
            }
            else {
				console.log('error: the API call to KSH getreserve did not work');
				//alert('error: the API call to KSH getreserve did not work');
            }

            if (data9[0].result) {
				//alert(data9.totalcap);
                //$('#kshs_in_circulation').text(parseFloat(data9[0].totalcap).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τKSHs' );
				totalcirculating += parseFloat(data9[0].totalcap)*rate_ksh;
				totalcap_ksh += parseFloat(data9[0].totalcap);
                $('#kshs_in_circulation').text((totalcap_ksh-totalreserve_ksh).toLocaleString() + ' τKSHs' );
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
			//alert(data11[0].balance);
            if (data11[0].result) {
				//alert(data11[0].balance);
				totalreserve += parseFloat(data11[0].balance)*rate_naira;
				totalreserve_naira += parseFloat(data11[0].balance);
                $('#ngns_in_reserve').text( parseFloat(data11[0].balance).toLocaleString() + ' τNGNs' );
            }
            else {
				console.log('error: the API call to NGN getreserve did not work');
				//alert('error: the API call to NGN getreserve did not work');
            }

            if (data12[0].result) {
				//alert(data12.totalcap);
                //$('#ngns_in_circulation').text(parseFloat(data12[0].totalcap).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τNGNs' );
				totalcirculating += parseFloat(data12[0].totalcap)*rate_naira;
				totalcap_naira += parseFloat(data12[0].totalcap);
                $('#ngns_in_circulation').text((totalcap_naira-totalreserve_naira).toLocaleString() + ' τNGNs' );
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
			//alert(data14[0].balance);
            if (data14[0].result) {
				//alert(balance);
				totalreserve += parseFloat(data14[0].balance)*rate_zar;
				totalreserve_zar += parseFloat(data14[0].balance);
                $('#zars_in_reserve').text( parseFloat(data14[0].balance).toLocaleString() + ' τZARs' );
            }
            else {
				console.log('error: the API call to ZAR getreserve did not work');
				//alert('error: the API call to ZAR getreserve did not work');
            }

            if (data15[0].result) {
				//alert(data15.totalcap);
                //$('#zars_in_circulation').text(parseFloat(data15[0].totalcap).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τZARs' );
				totalcirculating += parseFloat(data15[0].totalcap)*rate_zar;
				totalcap_zar += parseFloat(data15[0].totalcap);
                $('#zars_in_circulation').text( (totalcap_zar-totalreserve_zar).toLocaleString() + ' τZARs' );
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
			//alert(data18[0].balance);
            if (data18[0].result) {
				//alert(data18[0].balance);
				totalreserve += parseFloat(data18[0].balance)*rate_pound;
				totalreserve_pound += parseFloat(data18[0].balance);
                $('#gbps_in_reserve').text( parseFloat(data18[0].balance).toLocaleString() + ' τGBPs' );
            }
            else {
				console.log('error: the API call to GBP getreserve did not work');
				//alert('error: the API call to GBP getreserve did not work');
            }

            if (data19[0].result) {
				//alert(data19.totalcap);
                //$('#gbps_in_circulation').text(parseFloat(data19[0].totalcap).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τGBPs' );
				totalcirculating += parseFloat(data19[0].totalcap)*rate_pound;
				totalcap_pound += parseFloat(data19[0].totalcap);
                $('#gbps_in_circulation').text( (totalcap_pound-totalreserve_pound).toLocaleString() + ' τGBPs' );
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
			//alert(data21[0].balance);
            if (data21[0].result) {
				//alert(balance);
				totalreserve += parseFloat(data21[0].balance)*rate_euro;
				totalreserve_euro += parseFloat(data21[0].balance);
                $('#eurs_in_reserve').text( parseFloat(data21[0].balance).toLocaleString() + ' τEURs' );
            }
            else {
				console.log('error: the API call to EUR getreserve did not work');
				//alert('error: the API call to EUR getreserve did not work');
            }

            if (data22[0].result) {
				//alert(data22.totalcap);
                //$('#gbps_in_circulation').text(parseFloat(data22[0].totalcap).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τEURs' );
				totalcirculating += parseFloat(data22[0].totalcap)*rate_euro;
				totalcap_euro += parseFloat(data22[0].totalcap);
                $('#eurs_in_circulation').text( (totalcap_euro-totalreserve_euro).toLocaleString() + ' τEURs' );
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
			//alert(data24[0].balance);
            if (data24[0].result) {
				//alert(balance);
				totalreserve += parseFloat(data24[0].balance)*rate_dollar;
				totalreserve_dollar += parseFloat(data24[0].balance);
                $('#usds_in_reserve').text( parseFloat(data24[0].balance).toLocaleString() + ' τUSDs' );
            }
            else {
				console.log('error: the API call to USD getreserve did not work');
				//alert('error: the API call to USD getreserve did not work');
            }

            if (data25[0].result) {
				//alert(data25.totalcap);
                //$('#gbps_in_circulation').text(parseFloat(data25[0].totalcap).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τUSDs' );
				totalcirculating += parseFloat(data25[0].totalcap)*rate_dollar;
				totalcap_dollar += parseFloat(data25[0].totalcap);
                $('#usds_in_circulation').text( (totalcap_dollar-totalreserve_dollar).toLocaleString() + ' τUSDs' );
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
			$('#usds_in_totalcap').text(totalcap_dollar.toLocaleString() + ' τUSDs' );
			//alert('after usds Reserve: ' + totalreserve.toString() + ' Circulating: ' + totalcirculating.toString() + ' Total: ' + (totalreserve+totalcirculating).toString() + 'OffChain:' + totaloffchain.toString());
			

			//ETH --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data27[0].balance);
            if (data27[0].result) {
				//alert(balance);
				totalreserve += parseFloat(data27[0].balance)*rate_eth;
				totalreserve_eth += parseFloat(data27[0].balance);
                $('#eths_in_reserve').text( parseFloat(data27[0].balance).toLocaleString() + ' τETHs' );
            }
            else {
				console.log('error: the API call to ETH getreserve did not work');
				//alert('error: the API call to ETH getreserve did not work');
            }

            if (data28[0].result) {
				//alert(data28.totalcap);dgp
                //$('#gbps_in_circulation').text(parseFloat(data28[0].totalcap).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' τETHs' );
				totalcirculating += parseFloat(data28[0].totalcap)*rate_eth;
				totalcap_eth += parseFloat(data28[0].totalcap);
                $('#eths_in_circulation').text( (totalcap_eth-totalreserve_eth).toLocaleString() + ' τETHs' );
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
			
				

			//ESPEES --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data30[0].balance);
            if (data30[0].result) {
				//alert(balance);
				totalreserve += parseFloat(data30[0].balance)*rate_espees;
				totalreserve_esps += parseFloat(data30[0].balance);
                $('#esps_in_reserve').text( parseFloat(data30[0].balance).toLocaleString() + ' ESPS' );
            }
            else {
				console.log('error: the API call to ESPS getreserve did not work');
				//alert('error: the API call to ESPS getreserve did not work');
            }

            if (data31[0].result) {
				//alert(data31.totalcap);dgp
                //$('#gbps_in_circulation').text(parseFloat(data31[0].totalcap).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' ESPS' );
				totalcirculating += parseFloat(data31[0].totalcap)*rate_espees;
				totalcap_esps += parseFloat(data31[0].totalcap);
                $('#esps_in_circulation').text( (totalcap_esps-totalreserve_esps).toLocaleString() + ' ESPS' );
            }
            else {
				console.log('error: the API call to ESPS getcirculating did not work');
				//alert('error: the API call to ESPS getcirculating did not work');
            }
			
            if (data29[0].result) {
				//alert('Processing data from the API');
				var offchainesps = data29[0].data[0].OffChainReserves;
				//offchainesps = totalcap_esps;
				//if (offchainesps == null) offchainesps = 0;
				//alert(offchainesps);
                $('#esps_deposited_or_withdrawn').text( parseFloat(offchainesps).toLocaleString() + ' ESPS' );
				totaloffchain += parseFloat(offchainesps)*rate_espees;
            }
            else {
				console.log('error: the API call to ESPS transactions did not work');
				//alert('error: the API call to ESPS did not work');
            }
			$('#esps_in_totalcap').text(totalcap_esps.toLocaleString() + ' ESPS' );
			//alert('after esps Reserve: ' + totalreserve.toString() + ' Circulating: ' + totalcirculating.toString() + ' Total: ' + (totalreserve+totalcirculating).toString() + 'OffChain:' + totaloffchain.toString());
			

			//PLAST --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data33[0].balance);
            if (data33[0].result) {
				//alert(balance);
				totalreserve += parseFloat(data33[0].balance)*rate_plast;
				totalreserve_plast += parseFloat(data33[0].balance);
                $('#plast_in_reserve').text( parseFloat(data33[0].balance).toLocaleString() + ' PLASTs' );
            }
            else {
				console.log('error: the API call to PLAST getreserve did not work');
				//alert('error: the API call to PLAST getreserve did not work');
            }

            if (data34[0].result) {
				//alert(data34.totalcap);
                //$('#plast_in_circulation').text(parseFloat(data34[0].totalcap).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' PLAST' );
				totalcirculating += parseFloat(data34[0].totalcap)*rate_plast;
				totalcap_plast += parseFloat(data34[0].totalcap);
                $('#plast_in_circulation').text( (totalcap_plast-totalreserve_plast).toLocaleString() + ' PLASTs' );
            }
            else {
				console.log('error: the API call to PLAST getcirculating did not work');
				//alert('error: the API call to PLAST getcirculating did not work');
            }
			
            if (data32[0].result) {
				//alert('Processing data from the API');
				var offchainplast = data32[0].data[0].OffChainReserves;
				//offchainplast = totalcap_plast;
				//if (offchainplast == null) offchainesps = 0;
				//alert(offchainplast);
                $('#plast_deposited_or_withdrawn').text( parseFloat(offchainplast).toLocaleString() + ' PLASTs' );
				totaloffchain += parseFloat(offchainplast)*rate_plast;
            }
            else {
				console.log('error: the API call to PLAST transactions did not work');
				//alert('error: the API call to PLAST did not work');
            }
			$('#plast_in_totalcap').text(totalcap_plast.toLocaleString() + ' PLASTs' );
			//alert('after plast Reserve: ' + totalreserve.toString() + ' Circulating: ' + totalcirculating.toString() + ' Total: ' + (totalreserve+totalcirculating).toString() + 'OffChain:' + totaloffchain.toString());

			
			//-----------------------------------------------------------------------------------------------------
			

			
    
			
			
			$('#total_in_reserve').text( parseFloat(totalreserve).toLocaleString() + ' TOROs' );
			$('#total_in_totalcap').text( parseFloat(totalcirculating).toLocaleString() + ' TOROs' );
			$('#total_in_circulation').text((totalcirculating-totalreserve).toLocaleString() + ' TOROs' );
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


		
		