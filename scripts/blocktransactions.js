$(function () {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
	
	var theaddress;	
	theaddress = (params.block ? params.block : params.q);
	if (theaddress) {
		if (theaddress.length == 42) {
			window.location.assign('./address.html?address=' + theaddress);
		}
		if (theaddress.length == 110) {
			window.location.assign('./tx.html?id=' + theaddress);
		}
	}
	
	
    $('#blocklbl').text(theaddress);
    $('#blockheadlbl').text(theaddress);
	if (theaddress)
	{
		if (isNumber(theaddress)) {
			var previousnumber = theaddress.valueOf() - 1;
			var nextnumber = previousnumber + 2;
			$('#link_previousblock').attr("href", "./block.html?block=" + previousnumber);
			$('#link_nextblock').attr("href", "./block.html?block=" + nextnumber);
		}		
	}

    $('#link_wallet').attr("href", "address.html?address=" + theaddress);
    $('#link_token').attr("href", "address.html?token=" + theaddress);
    $('#link_currency').attr("href", "address.html?currency=" + theaddress);
    $('#link_crypto').attr("href", "address.html?crypto=" + theaddress);
    $('#link_tns').attr("href", "tx.html?address=" + theaddress);
	
    setTimeout(function () {
        getData(theaddress);
    }, 2000);

    $('#refreshBtn').click(function () {
        setTimeout(function () {
            getData(theaddress);
        }, 2000);
    });

});
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 

function getData(addr) {
    var url1 = "https://testnet.toronet.org/api/query";
    var request1 = {}
    request1["op"] = "getblock";
    request1["params"] = [];
    request1.params.push({
        "name": "number",
        "value": addr
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
            if (data1.result) {
				//lert(data1.data.BK_Hash);
                $('#timestamplbl').text(dateoutput(data1.data.BK_Time));
				var blocktransactions = [];
				var numtransactions = 0;
				blocktransactions = JSON.parse(data1.data.BK_Transactions);
				//console.log(blocktransactions);
				if (blocktransactions)
				{
					numtransactions = blocktransactions.length;
				}
                $('#transactioncountlbl').text(numtransactions);
                //$('#validatedby').text(data1.data.BK_Sealer);
				//$('#validatedby').attr("href", "./address.html?address=" + data1.data.BK_Sealer);

                //$('#blocksizelbl').text(data1.data.BK_Size);
                //$('#extradatalbl').text(data1.data.BK_ExtraData);
				
				//alert('Processing data from the API');
                //let tbdata = processTransactionsData(data1.data.BK_Transactions);
                //$('#txtable').bootstrapTable({
                    //data: tbdata,
                //});
				/**
                $('#txtable').bootstrapTable('load', tbdata);
				**/
                $("#txtable").find('tbody').val = "";
                if (blocktransactions.length > 0) {
                    $("#txtable").find('tbody').empty();
                    for (i = 0; i < blocktransactions.length - 1; i++) {
                        $("#txtable").find('tbody').append("<tr><td align=left><a href='./tx.html?id=" + blocktransactions[i] + "'>" + blocktransactions[i] + "</a></td></tr>");
                    }
                    $("#txtable").find('tbody').append("<tr><td align=left><a href='./tx.html?id=" + blocktransactions[i] + "'>" + blocktransactions[i] + "</a></td></tr>");
                   //$("#txtable").find('tbody').append("<tr><td align=right>" + tbdata[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].from + "'>" + tbdata[i].from_trunc2 + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].to + "'>" + tbdata[i].to_trunc2 + "</a></td><td align=right>" + tbdata[i].value + "</td><td align=right><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].hash_trunc2 + "</a></td></tr>");
                }
				else
				{
                    $("#txtable").find('tbody').append("<tr><td align=left>This block contained no transactions.</td></tr>");
				}	
				//var thelastblock = tbdata[0].number;
				//$('#lastblock').text(thelastblock);
				//console.log('table has been bound');
		
				
	
            }
            else {
                $('#errtitle').text('Error!');
                $('#errmsg').text(data1.error);
                $("#errorMsgAlert").addClass('show');
            }
        },
        err => {
            console.log(err);
            $('#errtitle').text('Error!');
            $('#errmsg').text('Unexpected error! Please contact us!');
            $("#errorMsgAlert").addClass('show');
        }
    );
}