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
                $('#transactioncountlbl').text(numtransactions + ' transactions');
 				$('#transactioncountlbl').attr("href", "./blocktransactions.html?block=" + data1.data.BK_Number);
                //$('#validatedby').text(data1.data.BK_Sealer);

				var validatedbyaddress = data1.data.BK_Sealer; //Later we will translate the sealer to nice names
				var validatedby = data1.data.BK_Sealer;
				if (validatedbyaddress == "0x3bd6ca1dc2b1895ec521693454da419d24dbc488") validatedby = 'ToroCorp';
				if (validatedbyaddress == "0x38771a427d2690b1f56aa036ed78fefaedd38306") validatedby = 'MoneyWorx';
				if (validatedbyaddress == "0x3c909d0b3eb5672f9654ab1554f9bfdaec3cea4e") validatedby = 'Oso Corp';
				if (validatedbyaddress == "0x379ace8d6d8adaa6a822b4ec727efc4dfa50a46f") validatedby = 'Espees Node';
                $('#validatedby').text(validatedbyaddress + ' (' + validatedby + ') in 2 secs');
				$('#validatedby').attr("href", "./address.html?address=" + data1.data.BK_Sealer);

                $('#blocksizelbl').text(data1.data.BK_Size);
                $('#extradatalbl').text(data1.data.BK_ExtraData);
	
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