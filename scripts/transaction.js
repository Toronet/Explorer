$(function () {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
	
	var theaddress;	
	theaddress = (params.id ? params.id : params.q);
	if (theaddress) {
		if (theaddress.length <= 42) {
			window.location.assign('./address.html?address=' + theaddress);
		}
		if (theaddress.length > 110) {
			window.location.assign('./tx.html?id=' + theaddress);
		}
		if (isNumber(theaddress)) {
			window.location.assign('./block.html?block=' + theaddress);
		}
	}
	
	
    $('#spanTxHash').text(theaddress);

	
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
    request1["op"] = "gettransaction";
    request1["params"] = [];
    request1.params.push({
        "name": "hash",
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
                $('#timestamplbl').text(dateoutput(data1.data.TX_Time));
                $('#blocklbl').text(data1.data.TX_BlockNumber);
				$('#blocklbl').attr("href", "./block.html?block=" + data1.data.TX_BlockNumber);
				var fromaddress = data1.data.TX_From;
                if (fromaddress) {
					$('#spanFromAdd').text(data1.data.TX_From);
					$('#spanFromAdd').attr("href", "./address.html?address=" + data1.data.TX_From);
				}
				else{
					$('#spanFromAdd').text("");
					$('#spanFromAdd').attr("href", "");
				}
					
				var toaddress = data1.data.TX_To;
                if (toaddress) {
					$('#spanToAdd').text(toaddress);
					$('#spanToAdd').attr("href", "./address.html?address=" + data1.data.TX_To);
				}
				else{
					$('#spanToAdd').text("");
					$('#spanToAdd').attr("href", "");
				}
                $('#spanValue').text(data1.data.TX_To);
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