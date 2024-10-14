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
	
	var toro_contract = '0x02c810e0324bEc4735ab01E97a6eA524c78aAfD9';
	var egp_contract = '0x79f91162034fc300090f36dE574fFA877Db8690E';
	var ksh_contract = '0xE41cda11231d85c341403d89fC8776c6207EcC70';
	var ngn_contract = '0xB18d59Ca4895c3bB189E20aA8d6626F537ff5EB3';
	var zar_contract = '0xC63e734f7956131A56282761ba424BaE19b204c0';
	var gbp_contract = '0xdB7b3d62f4B777511d5e315980232a67381e3bAd';
	var eur_contract = '0x8B07881fcbe9e9f8C0117e17331bE5fC349f78bD';
	var usd_contract = '0xa2c9c9d192F574Ef94327F05b623664b4135bDAf';
	var eth_contract = '0xd5088703630185a56ae424F1eb8ECd842b9C84e0';
	var esp_contract = '0xAA42139C29829D83922f4C7c89E9008ab94f1F6b';
	var plast_contract = '0x119B12B3AE9cbC0957D5AEf14C1C15AC562Ac87c';
	
	var toro_commission_addr = '0xa231BB16803d8F7dcb6885B04183c9E71F4cdDF3';
	var egp_commission_addr = '0x18b8adeedff63a396aef95f37449dc63e70bdf8c';
	var ksh_commission_addr = '0x7b950728ffe331ed7c7cd481d6f7e5eb1253810c';
	var ngn_commission_addr = '0xe4c968f4003d8d5ba6d7f7c58ceca298188b12cc';
	var zar_commission_addr = '0x7ea7095ca7debe67f997441e9e1b14ce6f60b35c';
	var gbp_commission_addr = '0x34bb663fea29d7d88b2bc2cb7e303732dde65790';
	var eur_commission_addr = '0x9ff52b9884a8cb207d22717f0fbbaaa6cf2ad7c4';
	var usd_commission_addr = '0x8d303618baed4dabaabb61348c421eebed88ea55';
	var eth_commission_addr = '0x486895d6ff7094d6e5be84556d0d49f62fe566af';
	var esp_commission_addr = '0xb37c637200bc2ddc22a87d1f8d223c27e5f0b493';
	var plast_commission_addr = '0xb37c637200bc2ddc22a87d1f8d223c27e5f0b493';
	
	//TORO ------------------------------------------------------------------------------------
    var url1 = "https://testnet.toronet.org/api/token/toro/";
    var request1 = {}
    request1["op"] = "getcommissionaddress";
    request1["params"] = [];
	
    var url2 = "https://testnet.toronet.org/api/token/toro/";
    var request2 = {}
    request2["op"] = "getcommissionpercentage";
    request2["params"] = [];

    var url3 = "https://testnet.toronet.org/api/token/toro/";
    var request3 = {}
    request3["op"] = "getbalance";
    request3["params"] = [];
	request3.params.push({
        "name": "addr",
        "value": toro_commission_addr
    });
	
	//EGP ------------------------------------------------------------------------------------
     var url4 = "https://testnet.toronet.org/api/currency/egp/";
    var request4 = {}
    request4["op"] = "getcommissionaddress";
    request4["params"] = [];

    var url5 = "https://testnet.toronet.org/api/currency/egp/";
    var request5 = {}
    request5["op"] = "getcommissionpercentage";
    request5["params"] = [];
	
    var url6 = "https://testnet.toronet.org/api/currency/egp/";
    var request6 = {}
    request6["op"] = "getbalance";
    request6["params"] = [];
	request6.params.push({
        "name": "addr",
        "value": egp_commission_addr
    });
	
	//KSH ------------------------------------------------------------------------------------
    var url7 = "https://testnet.toronet.org/api/currency/ksh/";
    var request7 = {}
    request7["op"] = "getcommissionaddress";
    request7["params"] = [];

    var url8 = "https://testnet.toronet.org/api/currency/ksh/";
    var request8 = {}
    request8["op"] = "getcommissionpercentage";
    request8["params"] = [];
	
    var url9 = "https://testnet.toronet.org/api/currency/ksh/";
    var request9 = {}
    request9["op"] = "getbalance";
    request9["params"] = [];
	request9.params.push({
        "name": "addr",
        "value": ksh_commission_addr
    });


	//NGN ------------------------------------------------------------------------------------
    var url10 = "https://testnet.toronet.org/api/currency/naira/";
    var request10 = {}
    request10["op"] = "getcommissionaddress";
    request10["params"] = [];

    var url11 = "https://testnet.toronet.org/api/currency/naira/";
    var request11 = {}
    request11["op"] = "getcommissionpercentage";
    request11["params"] = [];
	
    var url12 = "https://testnet.toronet.org/api/currency/naira/";
    var request12 = {}
    request12["op"] = "getbalance";
    request12["params"] = [];
	request12.params.push({
        "name": "addr",
        "value": ngn_commission_addr
    });

	//ZAR ------------------------------------------------------------------------------------
    var url13 = "https://testnet.toronet.org/api/currency/zar/";
    var request13 = {}
    request13["op"] = "getcommissionaddress";
    request13["params"] = [];

    var url14 = "https://testnet.toronet.org/api/currency/zar/";
    var request14 = {}
    request14["op"] = "getcommissionpercentage";
    request14["params"] = [];
	
    var url15 = "https://testnet.toronet.org/api/currency/zar/";
    var request15 = {}
    request15["op"] = "getbalance";
    request15["params"] = [];
	request15.params.push({
        "name": "addr",
        "value": zar_commission_addr
    });

	//EXCHANGE RATES ------------------------------------------------------------------------------------

    var url16 = "https://testnet.toronet.org/api/query";
    var request16 = {}
    request16["op"] = "getexchangerates";
    request16["params"] = [];


	//GBP ------------------------------------------------------------------------------------
    var url17 = "https://testnet.toronet.org/api/currency/pound/";
    var request17 = {}
    request17["op"] = "getcommissionaddress";
    request17["params"] = [];

    var url18 = "https://testnet.toronet.org/api/currency/pound/";
    var request18 = {}
    request18["op"] = "getcommissionpercentage";
    request18["params"] = [];
	
    var url19 = "https://testnet.toronet.org/api/currency/pound/";
    var request19 = {}
    request19["op"] = "getbalance";
    request19["params"] = [];
	request19.params.push({
        "name": "addr",
        "value": gbp_commission_addr
    });



	//EUR ------------------------------------------------------------------------------------
    var url20 = "https://testnet.toronet.org/api/currency/euro/";
    var request20 = {}
    request20["op"] = "getcommissionaddress";
    request20["params"] = [];

    var url21 = "https://testnet.toronet.org/api/currency/euro/";
    var request21 = {}
    request21["op"] = "getcommissionpercentage";
    request21["params"] = [];
	
    var url22 = "https://testnet.toronet.org/api/currency/euro/";
    var request22 = {}
    request22["op"] = "getbalance";
    request22["params"] = [];
	request22.params.push({
        "name": "addr",
        "value": eur_commission_addr
    });

	//USD ------------------------------------------------------------------------------------
    var url23 = "https://testnet.toronet.org/api/currency/dollar/";
    var request23 = {}
    request23["op"] = "getcommissionaddress";
    request23["params"] = [];

    var url24 = "https://testnet.toronet.org/api/currency/dollar/";
    var request24 = {}
    request24["op"] = "getcommissionpercentage";
    request24["params"] = [];
	
    var url25 = "https://testnet.toronet.org/api/currency/dollar/";
    var request25 = {}
    request25["op"] = "getbalance";
    request25["params"] = [];
	request25.params.push({
        "name": "addr",
        "value": usd_commission_addr
    });

	//ETH ------------------------------------------------------------------------------------
    var url26 = "https://testnet.toronet.org/api/crypto/eth/";
    var request26 = {}
    request26["op"] = "getcommissionaddress";
    request26["params"] = [];

    var url27 = "https://testnet.toronet.org/api/crypto/eth/";
    var request27 = {}
    request27["op"] = "getcommissionpercentage";
    request27["params"] = [];
	
    var url28 = "https://testnet.toronet.org/api/crypto/eth/";
    var request28 = {}
    request28["op"] = "getbalance";
    request28["params"] = [];
	request28.params.push({
        "name": "addr",
        "value": eth_commission_addr
    });

	//ESPS ------------------------------------------------------------------------------------
    var url29 = "https://testnet.toronet.org/api/coin/espees/";
    var request29 = {}
    request29["op"] = "getcommissionaddress";
    request29["params"] = [];

    var url30 = "https://testnet.toronet.org/api/coin/espees/";
    var request30 = {}
    request30["op"] = "getcommissionpercentage";
    request30["params"] = [];

    var url31 = "https://testnet.toronet.org/api/coin/espees/";
    var request31 = {}
    request31["op"] = "getbalance";
    request31["params"] = [];
	request31.params.push({
        "name": "addr",
        "value": esp_commission_addr
    });

	//PLASTS ------------------------------------------------------------------------------------
    var url32 = "https://testnet.toronet.org/api/coin/plast/";
    var request32 = {}
    request32["op"] = "getcommissionaddress";
    request32["params"] = [];

    var url33 = "https://testnet.toronet.org/api/coin/plast/";
    var request33 = {}
    request33["op"] = "getcommissionpercentage";
    request33["params"] = [];

    var url34 = "https://testnet.toronet.org/api/coin/plast/";
    var request34 = {}
    request34["op"] = "getbalance";
    request34["params"] = [];
	request34.params.push({
        "name": "addr",
        "value": plast_commission_addr
    });


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
            console.log(data26, data27, data28, data29, data30, data31);

			//totals
			
			//alert('in checkresults');
			var rate_toro = 1;
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
			
			var totalcommission = 0;
						
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

			$('#toros_contract').text( toro_contract );
			$('#toros_contract').attr("href", "address.html?address=" + toro_contract);
            if (data1[0].result) {
                $('#toros_commission').text(data1[0].commissionaddress );
                $('#toros_commission').attr("href", "address.html?address=" + data1[0].commissionaddress);
            }
            else {
				console.log('error: the API call to TORO getcommissionaddress did not work');
            }		
            if (data2[0].result) {
				//alert(data2.txfeefixed);
                $('#toros_commission_percentage').text(parseFloat(data2[0].commissionpercentage) + '%');
            }
            else {
				console.log('error: the API call to TORO getcommissionpercentage did not work');
            }		
            if (data3[0].result) {
				//alert(data3[0].balance);
				totalcommission += parseFloat(data3[0].balance);
                $('#toros_commission_balance').text( parseFloat(data3[0].balance).toLocaleString() + ' τUSDs' );
            }
            else {
				console.log('error: the API call to TORO balance did not work');
            }		


			//EGP --------------------------------------------------------------------------------------------------------------------------------------------
			$('#egp_contract').text( egp_contract );
			$('#egp_contract').attr("href", "address.html?address=" + egp_contract);
            if (data4[0].result) {
                $('#egp_commission').text(data4[0].commissionaddress );
                $('#egp_commission').attr("href", "address.html?address=" + data4[0].commissionaddress);
            }
            else {
				console.log('error: the API call to EGP getcommissionaddress did not work');
            }

            if (data5[0].result) {
                $('#egp_commission_percentage').text(parseFloat(data5[0].commissionpercentage)  + '%');
            }
            else {
				console.log('error: the API call to EGP getcommissionpercentage did not work');
            }
			
            if (data6[0].result) {
				totalcommission += parseFloat(data6[0].balance)*rate_egp;
                $('#egp_commission_balance').text( parseFloat(data6[0].balance).toLocaleString() + ' τEGPs' );
            }
            else {
				console.log('error: the API call to EGP balance did not work');
            }		
		

			//KSH --------------------------------------------------------------------------------------------------------------------------------------------
			$('#ksh_contract').text( ksh_contract );
			$('#ksh_contract').attr("href", "address.html?address=" + ksh_contract);
            if (data7[0].result) {
                $('#ksh_commission').text(data7[0].commissionaddress );
                $('#ksh_commission').attr("href", "address.html?address=" + data7[0].commissionaddress);
            }
            else {
				console.log('error: the API call to EGP getcommissionaddress did not work');
            }

            if (data8[0].result) {
                $('#ksh_commission_percentage').text(parseFloat(data8[0].commissionpercentage)  + '%');
            }
            else {
				console.log('error: the API call to EGP getcommissionpercentage did not work');
            }
			
            if (data9[0].result) {
				totalcommission += parseFloat(data9[0].balance)*rate_ksh;
                $('#ksh_commission_balance').text( parseFloat(data9[0].balance).toLocaleString() + ' τKSHs' );
            }
            else {
				console.log('error: the API call to KSH balance did not work');
            }
			

			//NGN --------------------------------------------------------------------------------------------------------------------------------------------
			$('#ngn_contract').text( ngn_contract );
			$('#ngn_contract').attr("href", "address.html?address=" + ngn_contract);
            if (data10[0].result) {
                $('#ngn_commission').text(data10[0].commissionaddress );
                $('#ngn_commission').attr("href", "address.html?address=" + data10[0].commissionaddress);
            }
            else {
				console.log('error: the API call to NGN getcommissionaddress did not work');
            }

            if (data11[0].result) {
                $('#ngn_commission_percentage').text(parseFloat(data11[0].commissionpercentage)  + '%');
            }
            else {
				console.log('error: the API call to NGN getcommissionpercentage did not work');
            }
			
            if (data12[0].result) {
				totalcommission += parseFloat(data12[0].balance)*rate_naira;
                $('#ngn_commission_balance').text( parseFloat(data12[0].balance).toLocaleString() + ' τNGNs' );
            }
            else {
				console.log('error: the API call to NGN balance did not work');
            }	
			

			//ZAR --------------------------------------------------------------------------------------------------------------------------------------------
			$('#zar_contract').text( zar_contract );
			$('#zar_contract').attr("href", "address.html?address=" + zar_contract);
            if (data13[0].result) {
                $('#zar_commission').text(data13[0].commissionaddress );
                $('#zar_commission').attr("href", "address.html?address=" + data13[0].commissionaddress);
            }
            else {
				console.log('error: the API call to ZAR getcommissionaddress did not work');
            }

            if (data14[0].result) {
                $('#zar_commission_percentage').text(parseFloat(data14[0].commissionpercentage)  + '%');
            }
            else {
				console.log('error: the API call to ZAR getcommissionpercentage did not work');
            }
			
            if (data15[0].result) {
				totalcommission += parseFloat(data15[0].balance)*rate_zar;
                $('#zar_commission_balance').text( parseFloat(data15[0].balance).toLocaleString() + ' τZARs' );
            }
            else {
				console.log('error: the API call to ZAR balance did not work');
            }	


			//GBP --------------------------------------------------------------------------------------------------------------------------------------------
			$('#gbp_contract').text( gbp_contract );
			$('#gbp_contract').attr("href", "address.html?address=" + gbp_contract);
            if (data17[0].result) {
                $('#gbp_commission').text(data17[0].commissionaddress );
                $('#gbp_commission').attr("href", "address.html?address=" + data17[0].commissionaddress);
            }
            else {
				console.log('error: the API call to GBP getcommissionaddress did not work');
            }

            if (data18[0].result) {
                $('#gbp_commission_percentage').text(parseFloat(data18[0].commissionpercentage)  + '%');
            }
            else {
				console.log('error: the API call to GBP getcommissionpercentage did not work');
            }
			
            if (data19[0].result) {
				totalcommission += parseFloat(data19[0].balance)*rate_pound;
                $('#gbp_commission_balance').text( parseFloat(data19[0].balance).toLocaleString() + ' τGBPs' );
            }
            else {
				console.log('error: the API call to GBP balance did not work');
            }	


			//EUR --------------------------------------------------------------------------------------------------------------------------------------------
			$('#eur_contract').text( eur_contract );
			$('#eur_contract').attr("href", "address.html?address=" + eur_contract);
            if (data20[0].result) {
                $('#eur_commission').text(data20[0].commissionaddress );
                $('#eur_commission').attr("href", "address.html?address=" + data20[0].commissionaddress);
            }
            else {
				console.log('error: the API call to EUR getcommissionaddress did not work');
            }

            if (data21[0].result) {
                $('#eur_commission_percentage').text(parseFloat(data21[0].commissionpercentage)  + '%');
            }
            else {
				console.log('error: the API call to EUR getcommissionpercentage did not work');
            }
			
            if (data22[0].result) {
				totalcommission += parseFloat(data22[0].balance)*rate_euro;
                $('#eur_commission_balance').text( parseFloat(data22[0].balance).toLocaleString() + ' τEURs' );
            }
            else {
				console.log('error: the API call to EUR balance did not work');
            }	

			//USD --------------------------------------------------------------------------------------------------------------------------------------------
			$('#usd_contract').text( usd_contract );
			$('#usd_contract').attr("href", "address.html?address=" + usd_contract);
            if (data23[0].result) {
                $('#usd_commission').text(data23[0].commissionaddress );
                $('#usd_commission').attr("href", "address.html?address=" + data23[0].commissionaddress);
            }
            else {
				console.log('error: the API call to USD getcommissionaddress did not work');
            }

            if (data24[0].result) {
                $('#usd_commission_percentage').text(parseFloat(data24[0].commissionpercentage)  + '%');
            }
            else {
				console.log('error: the API call to USD getcommissionpercentage did not work');
            }
			
            if (data25[0].result) {
				totalcommission += parseFloat(data25[0].balance)*rate_dollar;
                $('#usd_commission_balance').text( parseFloat(data25[0].balance).toLocaleString() + ' τUSDs' );
            }
            else {
				console.log('error: the API call to USD balance did not work');
            }
			
			
			//ETH --------------------------------------------------------------------------------------------------------------------------------------------
			$('#eth_contract').text( eth_contract );
			$('#eth_contract').attr("href", "address.html?address=" + eth_contract);
            if (data26[0].result) {
                $('#eth_commission').text(data26[0].commissionaddress );
                $('#eth_commission').attr("href", "address.html?address=" + data26[0].commissionaddress);
            }
            else {
				console.log('error: the API call to ETH getcommissionaddress did not work');
            }

            if (data27[0].result) {
                $('#eth_commission_percentage').text(parseFloat(data27[0].commissionpercentage)  + '%');
            }
            else {
				console.log('error: the API call to ETH getcommissionpercentage did not work');
            }
			
            if (data28[0].result) {
				totalcommission += parseFloat(data28[0].balance)*rate_eth;
                $('#eth_commission_balance').text( parseFloat(data28[0].balance).toLocaleString() + ' τETHs' );
            }
            else {
				console.log('error: the API call to ETH balance did not work');
            }

			
			//ESPEES --------------------------------------------------------------------------------------------------------------------------------------------
			$('#esp_contract').text( esp_contract );
			$('#esp_contract').attr("href", "address.html?address=" + esp_contract);
            if (data29[0].result) {
				//alert(data29[0].commissionaddress);
                $('#esp_commission').text(data29[0].commissionaddress );
                $('#esp_commission').attr("href", "address.html?address=" + data29[0].commissionaddress);
            }
            else {
				console.log('error: the API call to ESP getcommissionaddress did not work');
            }

            if (data30[0].result) {
                $('#esp_commission_percentage').text(parseFloat(data30[0].commissionpercentage)  + '%');
            }
            else {
				console.log('error: the API call to ESP getcommissionpercentage did not work');
            }
			
            if (data31[0].result) {
				totalcommission += parseFloat(data31[0].balance)*rate_espees;
                $('#esp_commission_balance').text( parseFloat(data31[0].balance).toLocaleString() + ' τESPs' );
            }
            else {
				console.log('error: the API call to ESP balance did not work');
            }

			//PLASTS --------------------------------------------------------------------------------------------------------------------------------------------
			$('#plast_contract').text( plast_contract );
			$('#plast_contract').attr("href", "address.html?address=" + plast_contract);
            if (data32[0].result) {
				//alert(data32[0].commissionaddress);
                $('#plast_commission').text(data32[0].commissionaddress );
                $('#plast_commission').attr("href", "address.html?address=" + data32[0].commissionaddress);
            }
            else {
				console.log('error: the API call to PLAST getcommissionaddress did not work');
            }

            if (data33[0].result) {
                $('#plast_commission_percentage').text(parseFloat(data33[0].commissionpercentage)  + '%');
            }
            else {
				console.log('error: the API call to PLAST getcommissionpercentage did not work');
            }
			
            if (data34[0].result) {
				totalcommission += parseFloat(data34[0].balance)*rate_plast;
                $('#plast_commission_balance').text( parseFloat(data34[0].balance).toLocaleString() + ' PLASTs' );
            }
            else {
				console.log('error: the API call to PLAST balance did not work');
            }

			//-----------------------------------------------------------------------------------------------------
			
			//alert(totalcommission);
			$('id_total_commissions').text( totalcommission.toLocaleString() + ' TOROs' );
			
			//-----------------------------------------------------------------------------------------------------
			

			
    
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


		
		