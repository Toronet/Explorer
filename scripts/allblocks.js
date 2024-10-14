$(function () {
	//alert('in getdata');

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
	
	var theaddress;	
	theaddress = (params.address ? params.address : params.q);
	if (theaddress) {
		if (theaddress.length <= 42) {
			window.location.assign('./address.html?address=' + theaddress);
		}
		if (theaddress.length > 50) {
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
	
	//$('#numrecordstext').text('(Showing transactions ' + thestart.toString() + ' to ' + theend + ')');
	$('#pagecount').text( 'Page ' + thepage.toString());
	$('#pagecountb').text( 'Page ' + thepage.toString());
	//alert('recordsperpage' + parseInt(recordsperpage));
	
    $('#previouslink').attr("href", "blocks.html?numrecords=" + recordsperpage + "&start=" + previoustran);
    $('#nextlink').attr("href", "blocks.html?numrecords=" + recordsperpage + "&start=" + nexttran);
    $('#previouslinkb').attr("href", "blocks.html?numrecords=" + recordsperpage + "&start=" + previoustran);
    $('#nextlinkb').attr("href", "blocks.html?numrecords=" + recordsperpage + "&start=" + nexttran);

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
    request1["op"] = "getblocks";
    request1["params"] = [];
    request1.params.push({
        "name": "count",
        "value": "100"
    });
    request1.params.push({
        "name": "start",
        "value": thestart.toString()
    });
	
    var url2 = "https://testnet.toronet.org/api/query";
    var request2 = {}
    request2["op"] = "gettransactions";
    request2["params"] = [];
    request2.params.push({
        "name": "count",
        "value": "10"
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
    ).then(
        (data1, data2) => {
            console.log(data1, data2);

			//alert('in checkresults');

			//alert(data1.result);
			
            if (data1[0].result) {
				//alert('Processing data from the API');
                let tbdata = processBlockData(data1[0].data);
                //$('#blocktable').bootstrapTable({
                    //data: tbdata,
                //});
                //$('#blocktable').bootstrapTable('load', tbdata);
				
				var thelastblock = tbdata[0].number;
				$('#lastblock').text(thelastblock);
				var thelastblockend = thelastblock - 100 + 1;
				$('#lastblockend').text(thelastblockend);
				var thelastblockend = thelastblock - 100 + 1;
				$('#startblock').text(thelastblockend);
				$('#endblock').text(thelastblock);
				$('#startblockbot').text(thelastblockend);
				$('#endblockbot').text(thelastblock);
				
                //var report_data = JSON.parse($(data1[0].data).val());
                $("#blocktable").find('tbody').val = "";
                //if (report_data.length > 0) {
                if (tbdata.length > 0) {
                    $("#blocktable").find('tbody').empty();
                    for (i = 0; i < tbdata.length - 1; i++) {
						
                        $("#blocktable").find('tbody').append("<tr><td align=right><a href='./block.html?block=" + tbdata[i].number + "'>" + tbdata[i].number + "</a></td><td align=right>" + tbdata[i].time + "</td><td align=right><a href='./blocktransactions.html?blockid=" + tbdata[i].number + "'>" + tbdata[i].transactions.toLocaleString('en-US') + "</a></td><td align=right><a href='address.html?address="  + tbdata[i].validatedbyaddress + "'>" + tbdata[i].validatedby  + "</td><td align=right>" + tbdata[i].size  + "</td><td align=right>" + tbdata[i].ratio + "%</td><td align=right>" + tbdata[i].hash_trunc + "</td></tr>");
						//$("#blocktable").find('tbody').append("<tr><td><a href='./block.html?block=" + tbdata[i].number + "'>" + tbdata[i].number + "</a></td><td class='showDate ' style='display:none !important; '><span rel='tooltip' data-toggle='tooltip' data-placement='bottom' title='' data-original-title='time'>" + tbdata[i].time + "</span></td><td style='' class='showAge '><span rel='tooltip' data-toggle='tooltip' data-placement='bottom' title='' data-original-title='time'>" + tbdata[i].time + "</span></td><td><a href='./txs.html?block=" + tbdata[i].number + "'>" + tbdata[i].number + "</a></td><td><a href='./address.html?address=" + tbdata[i].validatedbyaddress + "' class='hash-tag text-truncate' data-boundary='viewport' data-toggle='tooltip' title='' data-original-title='" + tbdata[i].validatedby + "'>Node: " + tbdata[i].validatedby + "</a></td><td>" + tbdata[i].size + " <span class='small text-secondary'>(" + tbdata[i].ratio + "%)</span><div class='progress mt-1' style='height:2px;'><div class='progress-bar bg-primary' role='progressbar' style='width:34.19%;' aria-valuenow='" + tbdata[i].ratio + "' aria-valuemin='0' aria-valuemax='100'></div></div></td><td>" + tbdata[i].transactions + "</td><td>" + tbdata[i].hash_trunc + "</td></tr>

                    }
                    $("#blocktable").find('tbody').append("<tr><td align=right><a href='./block.html?block=" + tbdata[i].number + "'>" + tbdata[i].number + "</a></td><td align=right>" + tbdata[i].time + "</td><td align=right><a href='./blocktransactions.html?blockid=" + tbdata[i].number + "'>" + tbdata[i].transactions.toLocaleString('en-US') + "</a></td><td align=right><a href='address.html?address="  + tbdata[i].validatedbyaddress + "'>" + tbdata[i].validatedby  + "</td><td align=right>" + tbdata[i].size  + "</td><td align=right>" + tbdata[i].ratio + "%</td><td align=right>" + tbdata[i].hash_trunc + "</td></tr>");
 					//$("#blocktable").find('tbody').append("<tr><td><a href='./block.html?block=" + tbdata[i].number + "'>" + tbdata[i].number + "</a></td><td class='showDate ' style='display:none !important; '><span rel='tooltip' data-toggle='tooltip' data-placement='bottom' title='' data-original-title='time'>" + tbdata[i].time + "</span></td><td style='' class='showAge '><span rel='tooltip' data-toggle='tooltip' data-placement='bottom' title='' data-original-title='time'>" + tbdata[i].time + "</span></td><td><a href='./txs.html?block=" + tbdata[i].number + "'>" + tbdata[i].number + "</a></td><td><a href='./address.html?address=" + tbdata[i].validatedbyaddress + "' class='hash-tag text-truncate' data-boundary='viewport' data-toggle='tooltip' title='' data-original-title='" + tbdata[i].validatedby + "'>Node: " + tbdata[i].validatedby + "</a></td><td>" + tbdata[i].size + " <span class='small text-secondary'>(" + tbdata[i].ratio + "%)</span><div class='progress mt-1' style='height:2px;'><div class='progress-bar bg-primary' role='progressbar' style='width:34.19%;' aria-valuenow='" + tbdata[i].ratio + "' aria-valuemin='0' aria-valuemax='100'></div></div></td><td>" + tbdata[i].transactions + "</td><td>" + tbdata[i].hash_trunc + "</td></tr>
               }
			
            }
            else {
				console.log('error: the API call to blocks did not work');
				//alert('error: the API call did not work');
            }
			
            if (data2[0].result) {
				//alert('Processing data from the API');
                let tbdata = processTransactionsData(data2[0].data);
                $('#txtable').bootstrapTable({
                    data: tbdata,
                });
				/**
                $('#txtable').bootstrapTable('load', tbdata);
				**/
                $("#txtable").find('tbody').val = "";
                if (tbdata.length > 0) {
                    $("#txtable").find('tbody').empty();
                    for (i = 0; i < tbdata.length - 1; i++) {
                        $("#txtable").find('tbody').append("<tr><td align=right>" + tbdata[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].from + "'>" + tbdata[i].from_trunc + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].to + "'>" + tbdata[i].to_trunc + "</a></td><td align=right>" + tbdata[i].value + "</td><td align=right><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].hash_trunc + "</a></td></tr>");
                    }
                    $("#txtable").find('tbody').append("<tr><td align=right>" + tbdata[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].from + "'>" + tbdata[i].from_trunc + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].to + "'>" + tbdata[i].to_trunc + "</a></td><td align=right>" + tbdata[i].value + "</td><td align=right><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].hash_trunc + "</a></td></tr>");
                }
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