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
    }, 10000);

    $('#refreshBtn').click(function () {
        setInterval(function () {
            getData();
        }, 10000);
    });

    $('#errorMsgClose').click(function () {
        $("#errorMsgAlert").removeClass('show');
    });
});
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 

function getData() {
	
	//alert('in getdata');
	
	//Node 1 ------------------------------------------------------------------------------------
    var url1 = "https://testnet.toronet.org/api/query";
    var request1 = {}
    request1["op"] = "getnodefirstblock";
    request1["params"] = [];
	request1.params.push({
        "name": "addr",
        "value": "0x3bd6ca1dc2b1895ec521693454da419d24dbc488"
    });
	
    var url2 = "https://testnet.toronet.org/api/query";
    var request2 = {}
    request2["op"] = "getnodelastblock";
    request2["params"] = [];
	request2.params.push({
        "name": "addr",
        "value": "0x3bd6ca1dc2b1895ec521693454da419d24dbc488"
    });
	
    var url3 = "https://testnet.toronet.org/api/query";
    var request3 = {}
    request3["op"] = "getnodeblockcount";
    request3["params"] = [];
	request3.params.push({
        "name": "addr",
        "value": "0x3bd6ca1dc2b1895ec521693454da419d24dbc488"
    });
	request3.params.push({
        "name": "days",
        "value": "1"
    });
	
    var url4 = "https://testnet.toronet.org/api/query";
    var request4 = {}
    request4["op"] = "getnodeblockcount";
	request4["params"] = [];
	request4.params.push({
        "name": "addr",
        "value": "0x3bd6ca1dc2b1895ec521693454da419d24dbc488"
    });
	request4.params.push({
        "name": "days",
        "value": "7"
    });


    var url5 = "https://testnet.toronet.org/api/query";
    var request5 = {}
    request5["op"] = "getnodeblockcount";
    request5["params"] = [];
	request5.params.push({
        "name": "addr",
        "value": "0x3bd6ca1dc2b1895ec521693454da419d24dbc488"
    });
	request5.params.push({
        "name": "days",
        "value": "30"
    });
	
	
	
	//Node 2 ------------------------------------------------------------------------------------
	
    var url6 = "https://testnet.toronet.org/api/query";
    var request6 = {}
    request6["op"] = "getnodefirstblock";
    request6["params"] = [];
	request6.params.push({
        "name": "addr",
        "value": "0x3c909d0b3eb5672f9654ab1554f9bfdaec3cea4e"
    });
	
    var url7 = "https://testnet.toronet.org/api/query";
    var request7 = {}
    request7["op"] = "getnodelastblock";
    request7["params"] = [];
	request7.params.push({
        "name": "addr",
        "value": "0x3c909d0b3eb5672f9654ab1554f9bfdaec3cea4e"
    });
	
    var url8 = "https://testnet.toronet.org/api/query";
    var request8 = {}
    request8["op"] = "getnodeblockcount";
    request8["params"] = [];
	request8.params.push({
        "name": "addr",
        "value": "0x3c909d0b3eb5672f9654ab1554f9bfdaec3cea4e"
    });
	request8.params.push({
        "name": "days",
        "value": "1"
    });
	
    var url9 = "https://testnet.toronet.org/api/query";
    var request9 = {}
    request9["op"] = "getnodeblockcount";
	request9["params"] = [];
	request9.params.push({
        "name": "addr",
        "value": "0x3c909d0b3eb5672f9654ab1554f9bfdaec3cea4e"
    });
	request9.params.push({
        "name": "days",
        "value": "7"
    });


    var url10 = "https://testnet.toronet.org/api/query";
    var request10 = {}
    request10["op"] = "getnodeblockcount";
    request10["params"] = [];
	request10.params.push({
        "name": "addr",
        "value": "0x3c909d0b3eb5672f9654ab1554f9bfdaec3cea4e"
    });
	request10.params.push({
        "name": "days",
        "value": "30"
    });
	
	
	//Node 3 ------------------------------------------------------------------------------------
	

    var url11 = "https://testnet.toronet.org/api/query";
    var request11 = {}
    request11["op"] = "getnodefirstblock";
    request11["params"] = [];
	request11.params.push({
        "name": "addr",
        "value": "0x38771a427d2690b1f56aa036ed78fefaedd38306"
    });
	
    var url12 = "https://testnet.toronet.org/api/query";
    var request12 = {}
    request12["op"] = "getnodelastblock";
    request12["params"] = [];
	request12.params.push({
        "name": "addr",
        "value": "0x38771a427d2690b1f56aa036ed78fefaedd38306"
    });
	
    var url13 = "https://testnet.toronet.org/api/query";
    var request13 = {}
    request13["op"] = "getnodeblockcount";
    request13["params"] = [];
	request13.params.push({
        "name": "addr",
        "value": "0x38771a427d2690b1f56aa036ed78fefaedd38306"
    });
	request13.params.push({
        "name": "days",
        "value": "1"
    });
	
    var url14 = "https://testnet.toronet.org/api/query";
    var request14 = {}
    request14["op"] = "getnodeblockcount";
	request14["params"] = [];
	request14.params.push({
        "name": "addr",
        "value": "0x38771a427d2690b1f56aa036ed78fefaedd38306"
    });
	request14.params.push({
        "name": "days",
        "value": "7"
    });


    var url15 = "https://testnet.toronet.org/api/query";
    var request15 = {}
    request15["op"] = "getnodeblockcount";
    request15["params"] = [];
	request15.params.push({
        "name": "addr",
        "value": "0x38771a427d2690b1f56aa036ed78fefaedd38306"
    });
	request15.params.push({
        "name": "days",
        "value": "30"
    });


	//EXCHANGE RATES ------------------------------------------------------------------------------------

    var url16 = "https://testnet.toronet.org/api/query";
    var request16 = {}
    request16["op"] = "getexchangerates";
    request16["params"] = [];


	//Node 4 ------------------------------------------------------------------------------------
    var url17 = "https://testnet.toronet.org/api/query";
    var request17 = {}
    request17["op"] = "getnodefirstblock";
    request17["params"] = [];
	request17.params.push({
        "name": "addr",
        "value": "0x379ace8d6d8adaa6a822b4ec727efc4dfa50a46f"
    });
	
    var url18 = "https://testnet.toronet.org/api/query";
    var request18 = {}
    request18["op"] = "getnodelastblock";
    request18["params"] = [];
	request18.params.push({
        "name": "addr",
        "value": "0x379ace8d6d8adaa6a822b4ec727efc4dfa50a46f"
    });
	
    var url19 = "https://testnet.toronet.org/api/query";
    var request19 = {}
    request19["op"] = "getnodeblockcount";
    request19["params"] = [];
	request19.params.push({
        "name": "addr",
        "value": "0x379ace8d6d8adaa6a822b4ec727efc4dfa50a46f"
    });
	request19.params.push({
        "name": "days",
        "value": "1"
    });
	
    var url20 = "https://testnet.toronet.org/api/query";
    var request20 = {}
    request20["op"] = "getnodeblockcount";
	request20["params"] = [];
	request20.params.push({
        "name": "addr",
        "value": "0x379ace8d6d8adaa6a822b4ec727efc4dfa50a46f"
    });
	request20.params.push({
        "name": "days",
        "value": "7"
    });


    var url21 = "https://testnet.toronet.org/api/query";
    var request21 = {}
    request21["op"] = "getnodeblockcount";
    request21["params"] = [];
	request21.params.push({
        "name": "addr",
        "value": "0x379ace8d6d8adaa6a822b4ec727efc4dfa50a46f"
    });
	request21.params.push({
        "name": "days",
        "value": "30"
    });


	//All Transactions ------------------------------------------------------------------------------------
    var url22 = "https://testnet.toronet.org/api/query";
    var request22 = {}
    request22["op"] = "getnodetransactions";
    request22["params"] = [];
    request22.params.push({
        "name": "days",
        "value": "14"
    });
	//All Transactions End ------------------------------------------------------------------------------------
	

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



    ).then(
        (data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16, data17, data18, data19, data20, data21, data22) => {
            console.log(data1);
			
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
			
			
			var node1_total = 0;
			var node2_total = 0;
			var node3_total = 0;
			var node4_total = 0;
			var realvalue = 0;
						
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
            }
            else {
				console.log('error: the API call to getrates did not work');
				//alert('error: the API call to getrates did not work');
            
			}
			//Transactions
            if (data22[0].result) {
				//alert('Processing data from the API');
                let tbdata = processNodeTransactionsData(data22[0].data);
                if (tbdata.length > 0) {
                    for (i = 0; i < tbdata.length - 1; i++) {
						//console.log(tbdata[i].contract + ' ' + tbdata[i].asset + ' ' +  tbdata[i].value + ' ' + tbdata[i].value2);
						
						realvalue = tbdata[i].rawvalue.valueOf() * 1.00;
						if (tbdata[i].asset == 'EGP') {realvalue = realvalue * rate_espees};
						if (tbdata[i].asset == 'ESP') {realvalue = realvalue * rate_egp};
						if (tbdata[i].asset == 'ETH') {realvalue = realvalue * rate_eth};
						if (tbdata[i].asset == 'EUR') {realvalue = realvalue * rate_euro};
						if (tbdata[i].asset == 'GBP') {realvalue = realvalue * rate_pound};
						if (tbdata[i].asset == 'KSH') {realvalue = realvalue * rate_ksh};
						if (tbdata[i].asset == 'NGN') {realvalue = realvalue * rate_naira};
						if (tbdata[i].asset == 'ZAR') {realvalue = realvalue * rate_zar};
						
						//Node1
						if (tbdata[i].Sealer == '0x3bd6ca1dc2b1895ec521693454da419d24dbc488') {node1_total += realvalue};
						//Node2
						if (tbdata[i].Sealer == '0x3c909d0b3eb5672f9654ab1554f9bfdaec3cea4e') {node2_total += realvalue};
						//Node3
						if (tbdata[i].Sealer == '0x38771a427d2690b1f56aa036ed78fefaedd38306') {node3_total += realvalue};
						//Node4
						if (tbdata[i].Sealer == '0x379ace8d6d8adaa6a822b4ec727efc4dfa50a46f') {node4_total += realvalue};
                    }
						realvalue = tbdata[i].rawvalue.valueOf() * 1.00;
						if (tbdata[i].asset == 'EGP') {realvalue = realvalue * rate_espees};
						if (tbdata[i].asset == 'ESP') {realvalue = realvalue * rate_egp};
						if (tbdata[i].asset == 'ETH') {realvalue = realvalue * rate_eth};
						if (tbdata[i].asset == 'EUR') {realvalue = realvalue * rate_euro};
						if (tbdata[i].asset == 'GBP') {realvalue = realvalue * rate_pound};
						if (tbdata[i].asset == 'KSH') {realvalue = realvalue * rate_ksh};
						if (tbdata[i].asset == 'NGN') {realvalue = realvalue * rate_naira};
						if (tbdata[i].asset == 'ZAR') {realvalue = realvalue * rate_zar};
						
						//Node1
						if (tbdata[i].Sealer == '0x3bd6ca1dc2b1895ec521693454da419d24dbc488') {node1_total += realvalue};
						//Node2
						if (tbdata[i].Sealer == '0x3bd6ca1dc2b1895ec521693454da419d24dbc488') {node2_total += realvalue};
						//Node3
						if (tbdata[i].Sealer == '0x3bd6ca1dc2b1895ec521693454da419d24dbc488') {node3_total += realvalue};
						//Node4
						if (tbdata[i].Sealer == '0x3bd6ca1dc2b1895ec521693454da419d24dbc488') {node4_total += realvalue};
						
						console.log('Node1: ' + node1_total + ' Node2: ' + node2_total + ' Node3: ' + node3_total + ' Node4: ' + node4_total);
						
                }				
				//var thelastblock = tbdata[0].number;
				//$('#lastblock').text(thelastblock);
				//console.log('table has been bound');
            }
            else {
				console.log('error: the API call to getnodetransactions did not work');
				//alert('error: the API call did not work');
            }			

			//TORO CORP --------------------------------------------------------------------------------------------------------------------------------------------
            if (data1[0].result) {
                $('#torostartblock').text( parseFloat(data1[0].data[0].BK_Number).toLocaleString() );
				$('#torostartblock').attr("href", "block.html?block=" + parseFloat(data1[0].data[0].BK_Number).toString());
            }
            else {
				console.log('error: the API call to getnodefirstblock did not work');
            }

            if (data2[0].result) {
                $('#toroendblock').text( parseFloat(data2[0].data[0].BK_Number).toLocaleString() );
				$('#toroendblock').attr("href", "block.html?block=" + parseFloat(data2[0].data[0].BK_Number).toString());
            }
            else {
				console.log('error: the API call to getnodelastblock did not work');
            }

            if (data3[0].result) {
                $('#toroscountblocks1').text( parseFloat(data3[0].data[0].Result).toLocaleString() );
            }
            else {
				console.log('error: the API call to getnodeblockcount did not work');
            }
            if (data4[0].result) {
                $('#toroscountblocks7').text( parseFloat(data4[0].data[0].Result).toLocaleString() );
            }
            else {
				console.log('error: the API call to getnodeblockcount7 did not work');
            }
            if (data5[0].result) {
                //$('#toroscountblocks30').text( parseFloat(data5[0].data[0].Result).toLocaleString() );
                $('#toroscountblocks30').text( node1_total.toLocaleString() + ' TOROS');
            }
            else {
				console.log('error: the API call to getnodeblockcount30 did not work');
            }


			//OSO CORP --------------------------------------------------------------------------------------------------------------------------------------------
            if (data6[0].result) {
                $('#node2startblock').text( parseFloat(data6[0].data[0].BK_Number).toLocaleString() );
				$('#node2startblock').attr("href", "block.html?block=" + parseFloat(data6[0].data[0].BK_Number).toString());
            }
            else {
				console.log('error: the API call to getnodefirstblock did not work');
            }

            if (data7[0].result) {
                $('#node2endblock').text( parseFloat(data7[0].data[0].BK_Number).toLocaleString() );
				$('#node2endblock').attr("href", "block.html?block=" + parseFloat(data7[0].data[0].BK_Number).toString());
            }
            else {
				console.log('error: the API call to getnodelastblock did not work');
            }

            if (data8[0].result) {
                $('#node2countblocks1').text( parseFloat(data8[0].data[0].Result).toLocaleString() );
            }
            else {
				console.log('error: the API call to getnodeblockcount did not work');
            }
            if (data9[0].result) {
                $('#node2countblocks7').text( parseFloat(data9[0].data[0].Result).toLocaleString() );
            }
            else {
				console.log('error: the API call to getnodeblockcount7 did not work');
            }
            if (data10[0].result) {
                //$('#node2countblocks30').text( parseFloat(data10[0].data[0].Result).toLocaleString() );
                $('#node2countblocks30').text( node2_total.toLocaleString() + ' TOROS' );
            }
            else {
				console.log('error: the API call to getnodeblockcount30 did not work');
            }


			//MONEYWORX CORP --------------------------------------------------------------------------------------------------------------------------------------------
            if (data11[0].result) {
                $('#node3startblock').text( parseFloat(data11[0].data[0].BK_Number).toLocaleString() );
				$('#node3startblock').attr("href", "block.html?block=" + parseFloat(data11[0].data[0].BK_Number).toString());
            }
            else {
				console.log('error: the API call to getnodefirstblock did not work');
            }

            if (data12[0].result) {
                $('#node3endblock').text( parseFloat(data12[0].data[0].BK_Number).toLocaleString() );
				$('#node3endblock').attr("href", "block.html?block=" + parseFloat(data12[0].data[0].BK_Number).toString());
            }
            else {
				console.log('error: the API call to getnodelastblock did not work');
            }

            if (data13[0].result) {
                $('#node3countblocks1').text( parseFloat(data13[0].data[0].Result).toLocaleString() );
            }
            else {
				console.log('error: the API call to getnodeblockcount did not work');
            }
            if (data14[0].result) {
                $('#node3countblocks7').text( parseFloat(data14[0].data[0].Result).toLocaleString() );
            }
            else {
				console.log('error: the API call to getnodeblockcount7 did not work');
            }
            if (data15[0].result) {
                //$('#node3countblocks30').text( parseFloat(data15[0].data[0].Result).toLocaleString() );
                $('#node3countblocks30').text( node3_total.toLocaleString() + ' TOROS' );
            }
            else {
				console.log('error: the API call to getnodeblockcount30 did not work');
            }


			//ESPEES CORP --------------------------------------------------------------------------------------------------------------------------------------------
            if (data17[0].result) {
                $('#node4startblock').text( parseFloat(data17[0].data[0].BK_Number).toLocaleString() );
				$('#node4startblock').attr("href", "block.html?block=" + parseFloat(data17[0].data[0].BK_Number).toString());
            }
            else {
				console.log('error: the API call to getnodefirstblock did not work');
            }

            if (data18[0].result) {
                $('#node4endblock').text( parseFloat(data18[0].data[0].BK_Number).toLocaleString() );
				$('#node4endblock').attr("href", "block.html?block=" + parseFloat(data18[0].data[0].BK_Number).toString());
            }
            else {
				console.log('error: the API call to getnodelastblock did not work');
            }

            if (data19[0].result) {
                $('#node4countblocks1').text( parseFloat(data19[0].data[0].Result).toLocaleString() );
            }
            else {
				console.log('error: the API call to getnodeblockcount did not work');
            }
            if (data20[0].result) {
                $('#node4countblocks7').text( parseFloat(data20[0].data[0].Result).toLocaleString() );
            }
            else {
				console.log('error: the API call to getnodeblockcount7 did not work');
            }
            if (data21[0].result) {
                //$('#node4countblocks30').text( parseFloat(data21[0].data[0].Result).toLocaleString() );
                $('#node4countblocks30').text( node4_total.toLocaleString() + ' TOROS' );
            }
            else {
				console.log('error: the API call to getnodeblockcount30 did not work');
            }

			
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


		
		