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
    var url2 = "https://testnet.toronet.org/api/token/toro/";
    var request2 = {}
    request2["op"] = "gettransactionfee";
    request2["params"] = [];
	
    var url3 = "https://testnet.toronet.org/api/token/toro/";
    var request3 = {}
    request3["op"] = "gettransactionfee";
    request3["params"] = [];
	
    var url4 = "https://testnet.toronet.org/api/token/toro/";
    var request4 = {}
    request4["op"] = "gettransactionfee";
    request4["params"] = [];

	//EGP ------------------------------------------------------------------------------------
     var url1 = "https://testnet.toronet.org/api/currency/egp/";
    var request1 = {}
    request1["op"] = "gettransactionfee";
    request1["params"] = [];

    var url5 = "https://testnet.toronet.org/api/currency/egp/";
    var request5 = {}
    request5["op"] = "gettorobuyfee";
    request5["params"] = [];
	
    var url6 = "https://testnet.toronet.org/api/currency/egp/";
    var request6 = {}
    request6["op"] = "gettorosellfee";
    request6["params"] = [];

    var url32 = "https://testnet.toronet.org/api/currency/egp/";
    var request32 = {}
    request32["op"] = "getcurrencyimportfee";
    request32["params"] = [];

    var url33 = "https://testnet.toronet.org/api/currency/egp/";
    var request33 = {}
    request33["op"] = "getcurrencyexportfee";
    request33["params"] = [];

	//KSH ------------------------------------------------------------------------------------
    var url7 = "https://testnet.toronet.org/api/currency/ksh/";
    var request7 = {}
    request7["op"] = "gettransactionfee";
    request7["params"] = [];

    var url8 = "https://testnet.toronet.org/api/currency/ksh/";
    var request8 = {}
    request8["op"] = "gettorobuyfee";
    request8["params"] = [];
	
    var url9 = "https://testnet.toronet.org/api/currency/ksh/";
    var request9 = {}
    request9["op"] = "gettorosellfee";
    request9["params"] = [];

    var url34 = "https://testnet.toronet.org/api/currency/ksh/";
    var request34 = {}
    request34["op"] = "getcurrencyimportfee";
    request34["params"] = [];

    var url35 = "https://testnet.toronet.org/api/currency/ksh/";
    var request35 = {}
    request35["op"] = "getcurrencyexportfee";
    request35["params"] = [];


	//NGN ------------------------------------------------------------------------------------
    var url10 = "https://testnet.toronet.org/api/currency/naira/";
    var request10 = {}
    request10["op"] = "gettransactionfee";
    request10["params"] = [];

    var url11 = "https://testnet.toronet.org/api/currency/naira/";
    var request11 = {}
    request11["op"] = "gettorobuyfee";
    request11["params"] = [];
	
    var url12 = "https://testnet.toronet.org/api/currency/naira/";
    var request12 = {}
    request12["op"] = "gettorosellfee";
    request12["params"] = [];

    var url36 = "https://testnet.toronet.org/api/currency/naira/";
    var request36 = {}
    request36["op"] = "getcurrencyimportfee";
    request36["params"] = [];

    var url37 = "https://testnet.toronet.org/api/currency/naira/";
    var request37 = {}
    request37["op"] = "getcurrencyexportfee";
    request37["params"] = [];


	//ZAR ------------------------------------------------------------------------------------
    var url13 = "https://testnet.toronet.org/api/currency/zar/";
    var request13 = {}
    request13["op"] = "gettransactionfee";
    request13["params"] = [];

    var url14 = "https://testnet.toronet.org/api/currency/zar/";
    var request14 = {}
    request14["op"] = "gettorobuyfee";
    request14["params"] = [];
	
    var url15 = "https://testnet.toronet.org/api/currency/zar/";
    var request15 = {}
    request15["op"] = "gettorosellfee";
    request15["params"] = [];

    var url38 = "https://testnet.toronet.org/api/currency/zar/";
    var request38 = {}
    request38["op"] = "getcurrencyimportfee";
    request38["params"] = [];

    var url39 = "https://testnet.toronet.org/api/currency/zar/";
    var request39 = {}
    request39["op"] = "getcurrencyexportfee";
    request39["params"] = [];


	//EXCHANGE RATES ------------------------------------------------------------------------------------

    var url16 = "https://testnet.toronet.org/api/query";
    var request16 = {}
    request16["op"] = "getexchangerates";
    request16["params"] = [];


	//GBP ------------------------------------------------------------------------------------
    var url17 = "https://testnet.toronet.org/api/currency/pound/";
    var request17 = {}
    request17["op"] = "gettransactionfee";
    request17["params"] = [];

    var url18 = "https://testnet.toronet.org/api/currency/pound/";
    var request18 = {}
    request18["op"] = "gettorobuyfee";
    request18["params"] = [];
	
    var url19 = "https://testnet.toronet.org/api/currency/pound/";
    var request19 = {}
    request19["op"] = "gettorosellfee";
    request19["params"] = [];

    var url40 = "https://testnet.toronet.org/api/currency/pound";
    var request40 = {}
    request40["op"] = "getcurrencyimportfee";
    request40["params"] = [];

    var url41 = "https://testnet.toronet.org/api/currency/pound/";
    var request41 = {}
    request41["op"] = "getcurrencyexportfee";
    request41["params"] = [];


	//EUR ------------------------------------------------------------------------------------
    var url20 = "https://testnet.toronet.org/api/currency/euro/";
    var request20 = {}
    request20["op"] = "gettransactionfee";
    request20["params"] = [];

    var url21 = "https://testnet.toronet.org/api/currency/euro/";
    var request21 = {}
    request21["op"] = "gettorobuyfee";
    request21["params"] = [];
	
    var url22 = "https://testnet.toronet.org/api/currency/euro/";
    var request22 = {}
    request22["op"] = "gettorosellfee";
    request22["params"] = [];

    var url42 = "https://testnet.toronet.org/api/currency/euro";
    var request42 = {}
    request42["op"] = "getcurrencyimportfee";
    request42["params"] = [];

    var url43 = "https://testnet.toronet.org/api/currency/euro/";
    var request43 = {}
    request43["op"] = "getcurrencyexportfee";
    request43["params"] = [];


	//USD ------------------------------------------------------------------------------------
    var url23 = "https://testnet.toronet.org/api/currency/dollar/";
    var request23 = {}
    request23["op"] = "gettransactionfee";
    request23["params"] = [];

    var url24 = "https://testnet.toronet.org/api/currency/dollar/";
    var request24 = {}
    request24["op"] = "gettorobuyfee";
    request24["params"] = [];
	
    var url25 = "https://testnet.toronet.org/api/currency/dollar/";
    var request25 = {}
    request25["op"] = "gettorosellfee";
    request25["params"] = [];

    var url44 = "https://testnet.toronet.org/api/currency/dollar";
    var request44 = {}
    request44["op"] = "getcurrencyimportfee";
    request44["params"] = [];

    var url45 = "https://testnet.toronet.org/api/currency/dollar/";
    var request45 = {}
    request45["op"] = "getcurrencyexportfee";
    request45["params"] = [];


	//ETH ------------------------------------------------------------------------------------
    var url26 = "https://testnet.toronet.org/api/crypto/eth/";
    var request26 = {}
    request26["op"] = "gettransactionfee";
    request26["params"] = [];

    var url27 = "https://testnet.toronet.org/api/crypto/eth/";
    var request27 = {}
    request27["op"] = "gettorobuyfee";
    request27["params"] = [];
	
    var url28 = "https://testnet.toronet.org/api/crypto/eth/";
    var request28 = {}
    request28["op"] = "gettorosellfee";
    request28["params"] = [];

    var url46 = "https://testnet.toronet.org/api/crypto/eth/";
    var request46 = {}
    request46["op"] = "getcryptoimportfee";
    request46["params"] = [];

    var url47 = "https://testnet.toronet.org/api/crypto/eth/";
    var request47 = {}
    request47["op"] = "getcryptoexportfee";
    request47["params"] = [];


	//ESPS ------------------------------------------------------------------------------------
    var url29 = "https://testnet.toronet.org/api/coin/espees/";
    var request29 = {}
    request29["op"] = "gettransactionfee";
    request29["params"] = [];

    var url30 = "https://testnet.toronet.org/api/coin/espees/";
    var request30 = {}
    request30["op"] = "gettorobuyfee";
    request30["params"] = [];

    var url31 = "https://testnet.toronet.org/api/coin/espees/";
    var request31 = {}
    request31["op"] = "gettorosellfee";
    request31["params"] = [];

    var url48 = "https://testnet.toronet.org/api/coin/espees/";
    var request48 = {}
    request48["op"] = "getcoinimportfee";
    request48["params"] = [];

    var url49 = "https://testnet.toronet.org/api/coin/espees/";
    var request49 = {}
    request49["op"] = "getcoinexportfee";
    request49["params"] = [];


	//PLASTS ------------------------------------------------------------------------------------
    var url50 = "https://www.toronet.org/api/coin/plast/";
    var request50 = {}
    request50["op"] = "gettransactionfee";
    request50["params"] = [];

    var url51 = "https://www.toronet.org/api/coin/plast/";
    var request51 = {}
    request51["op"] = "gettorobuyfee";
    request51["params"] = [];

    var url52 = "https://www.toronet.org/api/coin/plast/";
    var request52 = {}
    request52["op"] = "gettorosellfee";
    request52["params"] = [];

    var url53 = "https://www.toronet.org/api/coin/plast/";
    var request53 = {}
    request53["op"] = "getcoinimportfee";
    request53["params"] = [];

    var url54 = "https://www.toronet.org/api/coin/plast/";
    var request54 = {}
    request54["op"] = "getcoinexportfee";
    request54["params"] = [];




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
        $.ajax({
            url: url35,
            data: $.param(request35),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url36,
            data: $.param(request36),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url37,
            data: $.param(request37),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url38,
            data: $.param(request38),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url39,
            data: $.param(request39),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url40,
            data: $.param(request40),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url41,
            data: $.param(request41),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url42,
            data: $.param(request42),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url43,
            data: $.param(request43),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url44,
            data: $.param(request44),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url45,
            data: $.param(request45),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url46,
            data: $.param(request46),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url47,
            data: $.param(request47),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url48,
            data: $.param(request48),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url49,
            data: $.param(request49),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url50,
            data: $.param(request50),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url51,
            data: $.param(request51),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url52,
            data: $.param(request52),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url53,
            data: $.param(request53),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	
        $.ajax({
            url: url54,
            data: $.param(request54),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),	



    ).then(
        (data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16, data17, data18, data19, data20, data21, data22, data23, data24, data25, data26, data27, data28, data29, data30, data31, data32, data33, data34, data35, data36, data37, data38, data39, data40, data41, data42, data43, data44, data45, data46, data47, data48, data49, data50, data51, data52, data53, data54) => {
            console.log(data29);

			//totals
			var totalreserve = 0;
			var totalcirculating = 0;
			var totaloffchain = 0;
			
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

            if (data2[0].result) {
				//alert(data2.txfeefixed);
                $('#toros_in_circulation').text(parseFloat(data2[0].txfeefixed) + ' TOROs' );
				$('#toros_in_totalcap').text(parseFloat(data2[0].txfeepercentage) + '' );
            }
            else {
				console.log('error: the API call to TORO getfees did not work');
            }		
			$('#toros_in_reserve').text( '1 TOROs:TOROs' );
			
			$('#toros_minted_or_burnt').text( 'NA' );
			$('#toros_exchangefeetorate').text( 'NA' );
			
			$('#toros_exchangefeefromfixed').text( 'NA' );
			$('#toros_exchangefeefromrate').text( 'NA' );

			$('#toros_depositfeefromfixed').text( 'NA' );
			$('#toros_depositfeefromrate').text( 'NA' );

			$('#toros_withdrawalfeefromfixed').text( 'NA' );
			$('#toros_withdrawalfeefromrate').text( 'NA' );


			//EGP --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data5[0].balance);
            if (data5[0].result) {
                $('#egps_in_reserve').text( rate_egp.toFixed(4) + ' TOROs:τEGPs'  + ' (1/' + (1.0/rate_egp).toLocaleString() + ')');
                $('#egps_deposited_or_withdrawn').text( parseFloat(data5[0].txfeefixed).toLocaleString() + '' );
                $('#egps_exchangefeetorate').text( parseFloat(data5[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to EGP getreserve did not work');
            }

            if (data1[0].result) {
				//alert(data6.txfeefixed);
				totalcirculating += parseFloat(data1[0].txfeepercentage);
				totalcap_egp += parseFloat(data1[0].txfeefixed);
                $('#egps_in_circulation').text(parseFloat(data1[0].txfeefixed) + ' τEGPs' );
				$('#egps_in_totalcap').text(parseFloat(data1[0].txfeepercentage) + '' );
            }
            else {
				console.log('error: the API call to EGP getcirculating did not work');
            }
			
            if (data6[0].result) {
                $('#egps_exchangefeefromfixed').text( parseFloat(data6[0].txfeefixed).toLocaleString() + '' );
                $('#egps_exchangefeefromrate').text( parseFloat(data6[0].txfeepercentage).toLocaleString() + '' );
			}
            else {
				console.log('error: the API call to egp transactions did not work');
            }			

            if (data32[0].result) {
                $('#egps_depositfeefromfixed').text( parseFloat(data32[0].txfeefixed).toLocaleString() + '' );
                $('#egps_depositfeefromrate').text( parseFloat(data32[0].txfeepercentage).toLocaleString() + '' );
			}
            else {
				console.log('error: the API call to egp transactions did not work');
            }
			
            if (data33[0].result) {
                $('#egps_withdrawalfeefromfixed').text( parseFloat(data33[0].txfeefixed).toLocaleString() + '' );
                $('#egps_withdrawalfeefromrate').text( parseFloat(data33[0].txfeepercentage).toLocaleString() + '' );
			}
            else {
				console.log('error: the API call to egp transactions did not work');
            }			

			//KSH --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data8[0].balance);
            if (data8[0].result) {
                $('#kshs_in_reserve').text( rate_ksh.toFixed(4) + ' TOROs:τKSHs'  + ' (1/' + (1.0/rate_ksh).toLocaleString() + ')');
                $('#kshs_deposited_or_withdrawn').text( parseFloat(data8[0].txfeefixed).toLocaleString() + '' );
                $('#kshs_exchangefeetorate').text( parseFloat(data8[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to KSH getreserve did not work');
            }

            if (data7[0].result) {
				//alert(data7.totalcap);
				totalcirculating += parseFloat(data7[0].txfeepercentage);
				totalcap_ksh += parseFloat(data7[0].txfeefixed);
                $('#kshs_in_circulation').text(parseFloat(data7[0].txfeefixed) + ' τKSHs' );
				$('#kshs_in_totalcap').text(parseFloat(data7[0].txfeepercentage) + '' );
            }
            else {
				console.log('error: the API call to KSH getcirculating did not work');
            }		
			
            if (data9[0].result) {
                $('#kshs_exchangefeefromfixed').text( parseFloat(data9[0].txfeefixed).toLocaleString() + '' );
                $('#kshs_exchangefeefromrate').text( parseFloat(data9[0].txfeepercentage).toLocaleString() + '' );
           }
            else {
				console.log('error: the API call to ksh transactions did not work');
            }	
			
            if (data34[0].result) {
                $('#kshs_depositfeefromfixed').text( parseFloat(data34[0].txfeefixed).toLocaleString() + '' );
                $('#kshs_depositfeefromrate').text( parseFloat(data34[0].txfeepercentage).toLocaleString() + '' );
           }
            else {
				console.log('error: the API call to ksh transactions did not work');
            }	
			
            if (data35[0].result) {
                $('#kshs_withdrawalfeefromfixed').text( parseFloat(data35[0].txfeefixed).toLocaleString() + '' );
                $('#kshs_withdrawalfeefromrate').text( parseFloat(data35[0].txfeepercentage).toLocaleString() + '' );
           }
            else {
				console.log('error: the API call to ksh transactions did not work');
            }	
			

			//NGN --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data11[0].balance);
            if (data11[0].result) {
                $('#ngns_in_reserve').text( rate_naira.toFixed(4) + ' TOROs:τNGNs'  + ' (1/' + (1.0/rate_naira).toLocaleString() + ')');
				$('#ngns_deposited_or_withdrawn').text( parseFloat(data11[0].txfeefixed).toLocaleString() + '' );
				$('#ngns_exchangefeetorate').text( parseFloat(data11[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to NGN getreserve did not work');
            }

            if (data10[0].result) {
				//alert(data10.txfeefixed);
				totalcirculating += parseFloat(data10[0].txfeepercentage);
				totalcap_naira += parseFloat(data10[0].txfeefixed);
                $('#ngns_in_circulation').text(parseFloat(data10[0].txfeefixed) + ' τNGNs' );
				$('#ngns_in_totalcap').text(parseFloat(data10[0].txfeepercentage) + '' );
            }
            else {
				console.log('error: the API call to NGN getcirculating did not work');
            }
			
            if (data12[0].result) {
				$('#ngns_exchangefeefromfixed').text( parseFloat(data12[0].txfeefixed).toLocaleString() + '' );
				$('#ngns_exchangefeefromrate').text( parseFloat(data12[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to ngn transactions did not work');
            }

            if (data36[0].result) {
                $('#ngns_depositfeefromfixed').text( parseFloat(data36[0].txfeefixed).toLocaleString() + '' );
                $('#ngns_depositfeefromrate').text( parseFloat(data36[0].txfeepercentage).toLocaleString() + '' );
           }
            else {
				console.log('error: the API call to ngn transactions did not work');
            }	
			
            if (data37[0].result) {
                $('#ngns_withdrawalfeefromfixed').text( parseFloat(data37[0].txfeefixed).toLocaleString() + '' );
                $('#ngns_withdrawalfeefromrate').text( parseFloat(data37[0].txfeepercentage).toLocaleString() + '' );
           }
            else {
				console.log('error: the API call to ngn transactions did not work');
            }	
			

			//ZAR --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data14[0].balance);
            if (data14[0].result) {
                $('#zars_in_reserve').text( rate_zar.toFixed(4) + ' TOROs:τZARs'  + ' (1/' + (1.0/rate_zar).toLocaleString() + ')');
                $('#zars_deposited_or_withdrawn').text( parseFloat(data14[0].txfeefixed).toLocaleString() + '' );
                $('#zars_exchangefeetorate').text( parseFloat(data14[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to ZAR getreserve did not work');
				//alert('error: the API call to ZAR getreserve did not work');
            }

            if (data13[0].result) {
				//alert(data13.txfeefixed);
				totalcirculating += parseFloat(data13[0].txfeepercentage);
				totalcap_zar += parseFloat(data13[0].txfeefixed);
                $('#zars_in_circulation').text( parseFloat(data13[0].txfeefixed) + ' τZARs' );
				$('#zars_in_totalcap').text( parseFloat(data13[0].txfeepercentage) + '' );
            }
            else {
				console.log('error: the API call to ZAR getcirculating did not work');
            }	
			
            if (data15[0].result) {
                $('#zars_exchangefeefromfixed').text( parseFloat(data15[0].txfeefixed).toLocaleString() + '' );
                $('#zars_exchangefeefromrate').text( parseFloat(data15[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to zar transactions did not work');
            }

            if (data38[0].result) {
                $('#zars_depositfeefromfixed').text( parseFloat(data38[0].txfeefixed).toLocaleString() + '' );
                $('#zars_depositfeefromrate').text( parseFloat(data38[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to zar transactions did not work');
            }	
			
            if (data39[0].result) {
                $('#zars_withdrawalfeefromfixed').text( parseFloat(data39[0].txfeefixed).toLocaleString() + '' );
                $('#zars_withdrawalfeefromrate').text( parseFloat(data39[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to zar transactions did not work');
            }	

			//GBP --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data18[0].balance);
            if (data18[0].result) {
                $('#gbps_in_reserve').text( rate_pound.toLocaleString() + ' TOROs:τGBPs'  + ' (1/' + (1.0/rate_pound).toLocaleString() + ')');
                $('#gbps_deposited_or_withdrawn').text( parseFloat(data18[0].txfeefixed).toLocaleString() + '' );
                $('#gbps_exchangefeetorate').text( parseFloat(data18[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to GBP getreserve did not work');
            }

            if (data17[0].result) {
				//alert(data17.txfeefixed);
				totalcirculating += parseFloat(data17[0].txfeepercentage);
				totalcap_pound += parseFloat(data17[0].txfeefixed);
                $('#gbps_in_circulation').text( parseFloat(data17[0].txfeefixed) + ' τGBPs' );
				$('#gbps_in_totalcap').text( parseFloat(data17[0].txfeepercentage) + '' );
            }
            else {
				console.log('error: the API call to GBP getcirculating did not work');
            }
			
            if (data19[0].result) {
                $('#gbps_exchangefeefromfixed').text( parseFloat(data19[0].txfeefixed).toLocaleString() + '' );
                $('#gbps_exchangefeefromrate').text( parseFloat(data19[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to gbp transactions did not work');
            }

            if (data40[0].result) {
                $('#gbps_depositfeefromfixed').text( parseFloat(data40[0].txfeefixed).toLocaleString() + '' );
                $('#gbps_depositfeefromrate').text( parseFloat(data40[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to gbp transactions did not work');
            }	
			
            if (data41[0].result) {
                $('#gbps_withdrawalfeefromfixed').text( parseFloat(data41[0].txfeefixed).toLocaleString() + '' );
                $('#gbps_withdrawalfeefromrate').text( parseFloat(data41[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to gbp transactions did not work');
            }	


			//EUR --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data21[0].balance);
            if (data21[0].result) {
                $('#eurs_in_reserve').text( rate_euro.toLocaleString() + ' TOROs:τEURs'  + ' (1/' + (1.0/rate_euro).toLocaleString() + ')');
                $('#eurs_deposited_or_withdrawn').text( parseFloat(data21[0].txfeefixed).toLocaleString() + '' );
                $('#eurs_exchangefeetorate').text( parseFloat(data21[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to EUR getreserve did not work');
            }

            if (data20[0].txfeefixed) {
				//alert(data20.txfeefixed);
				totalcirculating += parseFloat(data20[0].txfeepercentage);
				totalcap_euro += parseFloat(data20[0].txfeefixed);
                $('#eurs_in_circulation').text( parseFloat(data20[0].txfeefixed) + ' τEURs' );
				$('#eurs_in_totalcap').text( parseFloat(data20[0].txfeepercentage) + '' );
            }
            else {
				console.log('error: the API call to EUR getcirculating did not work');
            }
			
            if (data22[0].result) {
                $('#eurs_exchangefeefromfixed').text( parseFloat(data22[0].txfeefixed).toLocaleString() + '' );
                $('#eurs_exchangefeefromrate').text( parseFloat(data22[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to usd transactions did not work');
            }

            if (data42[0].result) {
                $('#eurs_depositfeefromfixed').text( parseFloat(data42[0].txfeefixed).toLocaleString() + '' );
                $('#eurs_depositfeefromrate').text( parseFloat(data42[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to eur transactions did not work');
            }	
			
            if (data43[0].result) {
                $('#eurs_withdrawalfeefromfixed').text( parseFloat(data43[0].txfeefixed).toLocaleString() + '' );
                $('#eurs_withdrawalfeefromrate').text( parseFloat(data43[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to eur transactions did not work');
            }	

			//USD --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data24[0].balance);
            if (data24[0].result) {
                $('#usds_in_reserve').text( rate_dollar.toLocaleString() + ' TOROs:τUSDs' );
                $('#usds_deposited_or_withdrawn').text( parseFloat(data24[0].txfeefixed).toLocaleString() + '' );
                $('#usds_exchangefeetorate').text( parseFloat(data24[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to USD getreserve did not work');
            }

            if (data23[0].result) {
				//alert(data23.txfeefixed);
                $('#usds_in_circulation').text( parseFloat(data23[0].txfeefixed) + ' τUSDs' );
				$('#usds_in_totalcap').text( parseFloat(data23[0].txfeepercentage) + '' );
            }
            else {
				console.log('error: the API call to τUSDs getcirculating did not work');
            }
			
            if (data25[0].result) {
                $('#usds_exchangefeefromfixed').text( parseFloat(data25[0].txfeefixed).toLocaleString() + '' );
                $('#usds_exchangefeefromrate').text( parseFloat(data25[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to usd transactions did not work');
            }
			
            if (data44[0].result) {
                $('#usds_depositfeefromfixed').text( parseFloat(data44[0].txfeefixed).toLocaleString() + '' );
                $('#usds_depositfeefromrate').text( parseFloat(data44[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to usd transactions did not work');
            }	
			
            if (data45[0].result) {
                $('#usds_withdrawalfeefromfixed').text( parseFloat(data45[0].txfeefixed).toLocaleString() + '' );
                $('#usds_withdrawalfeefromrate').text( parseFloat(data45[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to usd transactions did not work');
            }	

			//ETH --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data27[0].balance);
            if (data27[0].result) {
                $('#eths_in_reserve').text( rate_eth + ' TOROs:τETHs' );
                $('#eths_deposited_or_withdrawn').text( parseFloat(data27[0].txfeefixed).toLocaleString() + '' );
                $('#eths_exchangefeetorate').text( parseFloat(data27[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to ETH getreserve did not work');
            }

            if (data26[0].result) {
				//alert(data26.txfeefixed);
				totalcirculating += parseFloat(data26[0].txfeepercentage);
				totalcap_eth += parseFloat(data26[0].txfeefixed);
                $('#eths_in_circulation').text( parseFloat(data26[0].txfeepercentage) + ' τETHs' );
				$('#eths_in_totalcap').text( parseFloat(data26[0].txfeefixed) + '' );
            }
            else {
				console.log('error: the API call to ETH getcirculating did not work');
            }
			
            if (data28[0].result) {
                $('#eths_exchangefeefromfixed').text( parseFloat(data28[0].txfeefixed).toLocaleString() + '' );
                $('#eths_exchangefeefromrate').text( parseFloat(data28[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to eth transactions did not work');
            }
			
            if (data46[0].result) {
                $('#eths_depositfeefromfixed').text( parseFloat(data46[0].txfeefixed).toLocaleString() + '' );
                $('#eths_depositfeefromrate').text( parseFloat(data46[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to eth transactions did not work');
            }	
			
            if (data47[0].result) {
                $('#eths_withdrawalfeefromfixed').text( parseFloat(data47[0].txfeefixed).toLocaleString() + '' );
                $('#eths_withdrawalfeefromrate').text( parseFloat(data47[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to eth transactions did not work');
            }	
				
			//ESPEES --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data30[0].balance);
            if (data30[0].result) {
                $('#esps_in_reserve').text( rate_espees + ' TOROs:ESPS' + ' (1/' + (1.0/rate_espees).toLocaleString() + ')' );
                 $('#esps_deposited_or_withdrawn').text( parseFloat(data30[0].txfeefixed).toLocaleString() + '' );
                $('#esps_exchangefeetorate').text( parseFloat(data30[0].txfeepercentage).toLocaleString() + '' );
           }
            else {
				console.log('error: the API call to ESPS getreserve did not work');
            }

            if (data29[0].result) {
                $('#esps_in_circulation').text( (parseFloat(data29[0].txfeefixed)).toLocaleString() + ' ESPS' );
				$('#esps_in_totalcap').text( (parseFloat(data29[0].txfeepercentage)).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to ESPS getcirculating did not work');
            }
			
            if (data31[0].result) {
                $('#esps_exchangefeefromfixed').text( parseFloat(data31[0].txfeefixed).toLocaleString() + '' );
                $('#esps_exchangefeefromrate').text( parseFloat(data31[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to ESPS transactions did not work');
            }
			
            if (data48[0].result) {
                $('#esps_depositfeefromfixed').text( parseFloat(data48[0].txfeefixed).toLocaleString() + '' );
                $('#esps_depositfeefromrate').text( parseFloat(data48[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to esp transactions did not work');
            }	
			
            if (data49[0].result) {
                $('#esps_withdrawalfeefromfixed').text( parseFloat(data49[0].txfeefixed).toLocaleString() + '' );
                $('#esps_withdrawalfeefromrate').text( parseFloat(data49[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to esp transactions did not work');
            }	
			
			$('#esps_depositfeefromfixed').text( 'NA' );
			$('#esps_depositfeefromrate').text( 'NA' );
			$('#esps_withdrawalfeefromfixed').text( 'NA' );
			$('#esps_withdrawalfeefromrate').text( 'NA' );


			//PLASTS --------------------------------------------------------------------------------------------------------------------------------------------
			//alert(data51[0].balance);
            if (data51[0].result) {
                $('#plast_in_reserve').text( rate_plast + ' TOROs:PLASTs' + ' (1/' + (1.0/rate_plast).toLocaleString() + ')' );
                 $('#plast_deposited_or_withdrawn').text( parseFloat(data51[0].txfeefixed).toLocaleString() + '' );
                $('#plast_exchangefeetorate').text( parseFloat(data51[0].txfeepercentage).toLocaleString() + '' );
           }
            else {
				console.log('error: the API call to PLAST getreserve did not work');
            }

            if (data50[0].result) {
                $('#plast_in_circulation').text( (parseFloat(data50[0].txfeefixed)).toLocaleString() + ' PLASTs' );
				$('#plast_in_totalcap').text( (parseFloat(data50[0].txfeepercentage)).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to PLAST getcirculating did not work');
            }
			
            if (data52[0].result) {
                $('#plast_exchangefeefromfixed').text( parseFloat(data52[0].txfeefixed).toLocaleString() + '' );
                $('#plast_exchangefeefromrate').text( parseFloat(data52[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to PLAST transactions did not work');
            }
			
            if (data53[0].result) {
                $('#plast_depositfeefromfixed').text( parseFloat(data53[0].txfeefixed).toLocaleString() + '' );
                $('#plast_depositfeefromrate').text( parseFloat(data53[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to PLAST transactions did not work');
            }	
			
            if (data54[0].result) {
                $('#plast_withdrawalfeefromfixed').text( parseFloat(data54[0].txfeefixed).toLocaleString() + '' );
                $('#plast_withdrawalfeefromrate').text( parseFloat(data54[0].txfeepercentage).toLocaleString() + '' );
            }
            else {
				console.log('error: the API call to PLAST transactions did not work');
            }	
			
			$('#plast_depositfeefromfixed').text( 'NA' );
			$('#plast_depositfeefromrate').text( 'NA' );
			$('#plast_withdrawalfeefromfixed').text( 'NA' );
			$('#plast_withdrawalfeefromrate').text( 'NA' );

			
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


		
		