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

	var theastart;	
	thestart = (params.start ? params.start : 1);

	var e = document.getElementById("ContentPlaceHolder1_ddlRecordsPerPage");
	var recordsperpage = e.value;
	//alert('recordsperpage' + recordsperpage);
	
	var previoustran = thestart;
	var nexttran = thestart;
	if (thestart > 1) previoustran = parseInt(thestart) - 100;
	if (previoustran < 0) parseInt(previoustran) = 1;
	
	if (thestart < 1000000000) nexttran = parseInt(thestart) + 100;
	if (nexttran < 0) parseInt(nexttran) = 1;
	
	var thepage = parseInt((parseInt(thestart) + parseInt(recordsperpage))/(0 + parseInt(recordsperpage)));
	var theend = parseInt(thestart) + parseInt(recordsperpage);
	
	$('#numrecordstext').text('(Showing transactions ' + thestart.toString() + ' to ' + theend + ')');
	$('#pagecount').text( 'Page ' + thepage.toString());
	$('#pagecountb').text( 'Page ' + thepage.toString());
	//alert('recordsperpage' + parseInt(recordsperpage));
	
    $('#previouslink').attr("href", "txs_egps.html?numrecords=" + recordsperpage + "&start=" + previoustran);
    $('#nextlink').attr("href", "txs_egps.html?numrecords=" + recordsperpage + "&start=" + nexttran);
    $('#previouslinkb').attr("href", "txs_egps.html?numrecords=" + recordsperpage + "&start=" + previoustran);
    $('#nextlinkb').attr("href", "txs_egps.html?numrecords=" + recordsperpage + "&start=" + nexttran);

    $('#link_wallet').attr("href", "address.html?address=" + theaddress);
    $('#link_token').attr("href", "address.html?token=" + theaddress);
    $('#link_currency').attr("href", "address.html?currency=" + theaddress);
    $('#link_crypto').attr("href", "address.html?crypto=" + theaddress);
    $('#link_tns').attr("href", "tx.html?address=" + theaddress);
	
    setInterval(function () {
        getData();
    }, 3000);

    $('#refreshBtn').click(function () {
        setInterval(function () {
            getData();
        }, 3000);
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
    request1.params.push({
        "name": "start",
        "value": thestart.toString()
    });


    $.when(
        $.ajax({
            url: url1,
            data: $.param(request1),
            dataType: "json",
            processData: false,
            type: 'GET',
        }),
    ).then(
        (data1) => {
            console.log(data1);

			//alert(data1.result);
			
            if (data1.result) {
				//alert('Processing data from the API');
                let tbdata = processTransactionsData(data1.data);
                //$('#txtable').bootstrapTable({
                    //data: tbdata,
                //});
				/**
                $('#txtable').bootstrapTable('load', tbdata);
				**/
                $("#txtable").find('tbody').val = "";
                if (tbdata.length > 0) {
                    $("#txtable").find('tbody').empty();
                    for (i = 0; i < tbdata.length - 1; i++) {
                        $("#txtable").find('tbody').append("<tr><td align=right>" + tbdata[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].from + "'>" + tbdata[i].from_trunc2 + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].to + "'>" + tbdata[i].to_trunc2 + "</a></td><td align=right>" + tbdata[i].value + "</td><td align=right><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].hash_trunc2 + "</a></td></tr>");
                    }
                    $("#txtable").find('tbody').append("<tr><td align=right>" + tbdata[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].from + "'>" + tbdata[i].from_trunc2 + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].to + "'>" + tbdata[i].to_trunc2 + "</a></td><td align=right>" + tbdata[i].value + "</td><td align=right><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].hash_trunc2 + "</a></td></tr>");
                }				
				//var thelastblock = tbdata[0].number;
				//$('#lastblock').text(thelastblock);
				//console.log('table has been bound');
            }
            else {
				console.log('error: the API call to transactions did not work');
				//alert('error: the API call did not work');
            }

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