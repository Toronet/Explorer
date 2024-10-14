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


    $('#link_wallet').attr("href", "address.html?address=" + theaddress);
    $('#link_token').attr("href", "address.html?token=" + theaddress);
    $('#link_currency').attr("href", "address.html?currency=" + theaddress);
    $('#link_crypto').attr("href", "address.html?crypto=" + theaddress);
    $('#link_tns').attr("href", "tx.html?address=" + theaddress);
	
    setInterval(function () {
        getData();
		getDatachart();
    }, 2000);
	getDatachart();

    $('#refreshBtn').click(function () {
        setInterval(function () {
            getData();
			getDatachart();
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
    request1["op"] = "getblocks";
    request1["params"] = [];
    request1.params.push({
        "name": "count",
        "value": "20"
    });

    var url2 = "https://testnet.toronet.org/api/query";
    var request2 = {}
    request2["op"] = "gettransactions";
    request2["params"] = [];
    request2.params.push({
        "name": "count",
        "value": "20"
    });
	
    var url3 = "https://testnet.toronet.org/api/token/toro/";
    var request3 = {}
    request3["op"] = "gettotalreserving";
    request3["params"] = [];
	
    var url4 = "https://testnet.toronet.org/api/token/toro/";
    var request4 = {}
    request4["op"] = "gettotalcirculating";
    request4["params"] = [];
	
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
		

    ).then(
        (data1, data2, data3, data4) => {
            console.log(data1, data2, data3, data4);

			//alert('in checkresults');

			//alert(data3[0].totalreserving);
            if (data3[0].result) {
				//alert(data3.totalreserving);
                //$('#reserve_in_usd').text('$' + parseFloat(data3[0].totalreserving).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' (' + parseFloat(data3[0].totalreserving).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' TORO)' );
                $('#reserve_in_usd').text('$' + parseFloat(data3[0].totalreserving).toLocaleString() + ' (' + parseFloat(data3[0].totalreserving).toLocaleString() + ' TOROs)' );
            }
            else {
				console.log('error: the API call to getreserve did not work');
				//alert('error: the API call to getreserve did not work');
            }

            if (data4[0].result) {
				//alert(data4.totalcirculating);
                //$('#circulating_toros').text(parseFloat(data4[0].totalcirculating).toLocaleString({minimumFractionDigits:2},{maximumFractionDigits:2}) + ' TOROs' );
                $('#circulating_toros').text(parseFloat(data4[0].totalcirculating).toLocaleString() + ' TORO' );
            }
            else {
				console.log('error: the API call to getreserve did not work');
				//alert('error: the API call to getreserve did not work');
            }		

            if (data1[0].result) {
				//alert('Processing data from the API');
                let tbdata = processBlockData(data1[0].data);
                //$('#blocktable').bootstrapTable({
                    //data: tbdata,
                //});
                //$('#blocktable').bootstrapTable('load', tbdata);
				
				var thelastblock = tbdata[0].number;
				$('#lastblock').text(thelastblock);
				
                //var report_data = JSON.parse($(data1[0].data).val());
                $("#blocktable").find('tbody').val = "";
                //if (report_data.length > 0) {
                if (tbdata.length > 0) {
                    $("#blocktable").find('tbody').empty();
                    for (i = 0; i < tbdata.length - 1; i++) {
                        $("#blocktable").find('tbody').append("<tr><td align=right><a href='./block.html?block=" + tbdata[i].number + "'>" + tbdata[i].number + "</a></td><td align=right>" + tbdata[i].time + "</td><td align=right>" + tbdata[i].transactions.toLocaleString('en-US') + "</td><td align=right><a href='address.html?address="  + tbdata[i].validatedbyaddress + "'>" + tbdata[i].validatedby + "</a></td></tr>");
                    }
                    $("#blocktable").find('tbody').append("<tr><td align=right><a href='./block.html?block=" + tbdata[i].number + "'>" + tbdata[i].number + "</a></td><td align=right>" + tbdata[i].time + "</td><td align=right>" + tbdata[i].transactions.toLocaleString('en-US') + "</td><td align=right><a href='address.html?address="  + tbdata[i].validatedbyaddress + "'>" + tbdata[i].validatedby + "</a></td></tr>");
                }
			
            }
            else {
				console.log('error: the API call to blocks did not work');
				//alert('error: the API call did not work');
            }
			
            if (data2[0].result) {
				//alert('Processing data from the API');
                let tbdata = processTransactionsData(data2[0].data);
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
                        //$("#txtable").find('tbody').append("<tr><td align=right>" + tbdata[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].from + "'>" + tbdata[i].from_trunc + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].to + "'>" + tbdata[i].to_trunc + "</a></td><td align=right>" + tbdata[i].value + "</td><td align=right><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].hash_trunc + "</a></td></tr>");
                        //$("#txtable").find('tbody').append("<tr><td align=right><font size=2>" + tbdata[i].time + "</font></td><td align=left><a href='./tx.html?id=" + tbdata[i].hash + "'><font size=2>" + tbdata[i].type + "</font></a></td><td align=right><a href='./address.html?address=" + tbdata[i].from + "'><font size=2>" + tbdata[i].from_trunc + "</font></a></td><td align=right><a href='./address.html?address=" + tbdata[i].to + "'><font size=2>" + tbdata[i].to_trunc + "</font></a></td><td align=right><font size=2>" + tbdata[i].value + "</font></td></tr>");
                        $("#txtable").find('tbody').append("<tr><td align=right><font size=2>" + tbdata[i].time + "</font></td><td align=left><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].from + "'>" + tbdata[i].from_trunc + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].to + "'>" + tbdata[i].to_trunc + "</a></td><td align=right>" + tbdata[i].value + "</td></tr>");
                    }
                    //$("#txtable").find('tbody').append("<tr><td align=right>" + tbdata[i].time + "</td><td align=left><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].from + "'>" + tbdata[i].from_trunc + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].to + "'>" + tbdata[i].to_trunc + "</a></td><td align=right>" + tbdata[i].value + "</td><td align=right><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].hash_trunc + "</a></td></tr>");
                    $("#txtable").find('tbody').append("<tr><td align=right style='fontsize:9px;'><font size=2>" + tbdata[i].time + "</font></td><td align=left><a href='./tx.html?id=" + tbdata[i].hash + "'>" + tbdata[i].type + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].from + "'>" + tbdata[i].from_trunc + "</a></td><td align=right><a href='./address.html?address=" + tbdata[i].to + "'>" + tbdata[i].to_trunc + "</a></td><td align=right>" + tbdata[i].value + "</td></tr>");
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

function getDatachart() {
	
	//alert('in getdatachart');

	//var mychartcontainer = document.getElementById("container-1"); 
	//var mychart = mychartcontainer.data-highcharts-chart;
	
	var mychart = $('#container-1').highcharts();
	//var mychart = document.getElementsByClassName("highcharts-series-0"); 
	//alert(mychart);
	//for (var i = 0, atts = mychart.attributes, n = atts.length, arr = []; i < n; i++){
	//	alert(atts[i].nodeName);
	//}
	//alert(mychart.series[0].name);
	
    var url1 = "https://testnet.toronet.org/api/query";
    var request1 = {}
    request1["op"] = "getdailytransactioncounts";
    request1["params"] = [];
    request1.params.push({
        "name": "count",
        "value": "14"
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

			//alert('in chart data');
			
			var xaxis_data = '';
			var yaxis_data = '';
			var series_data = '';
			var thedata = [];
			var thexdata = [];
			var thetooltip = [];
			
            if (data1.result) {
				//alert('Processing chart data from the API');
                let tbdata = processDailyTransactionsData(data1.data);
                if (tbdata.length > 0) {
					tbdata = tbdata.reverse();
                    for (i = 2; i < tbdata.length - 1; i++) {
                       xaxis_data = xaxis_data + tbdata[i].TheDate + ",";
                       yaxis_data = yaxis_data + tbdata[i].DailyTransactions + ",";
					   
					   series_data  = "y : " + tbdata[i].DailyTransactions + ", formattedValue : '" + tbdata[i].DailyTransactions + "', friendlydate : '" + tbdata[i].TheDate + "', price : '$1.00'"
					   thedata.push([formatDate(tbdata[i].TheDate),tbdata[i].DailyTransactions,tbdata[i].DailyTransactions,'friendlydate :' + tbdata[i].TheDate.toString()]);
					   //thedata.push([{'"x",' + tbdata[i].TheDate},{'"y",' + tbdata[i].DailyTransactions},{'"friendlydate",' + tbdata[i].TheDate.toString()}]);
					   thexdata.push(formatDate(tbdata[i].TheDate));
					   thetooltip.push(formatDate(tbdata[i].TheDate) + ' ' + tbdata[i].DailyTransactions);
					   //thedata.push(series_data);
					   
                    }
                    xaxis_data = xaxis_data + tbdata[i].TheDate;
                    yaxis_data = yaxis_data + tbdata[i].DailyTransactions + ",";
					thedata.push([formatDate(tbdata[i].TheDate),tbdata[i].DailyTransactions,tbdata[i].DailyTransactions,'friendlydate :' + tbdata[i].TheDate.toString()]);
					//thedata.push([{'"x",' + tbdata[i].TheDate},{'"y",' + tbdata[i].DailyTransactions},{'"friendlydate",' + tbdata[i].TheDate.toString()}]);
					thexdata.push(formatDate(tbdata[i].TheDate));
					thetooltip.push(formatDate(tbdata[i].TheDate) + ' ' + tbdata[i].DailyTransactions);
					series_data  = "y : " + tbdata[i].DailyTransactions + ", formattedValue : '" + tbdata[i].DailyTransactions + "', friendlydate : '" + tbdata[i].TheDate + "', price : '$1.00'"
				    //thedata.push(series_data);
                }
            }
            else {
				console.log('error: the API call to retrieve daily transactions did not work');
				//alert('error: the API call did not work');
            }
			
			//alert(xaxis_data);
			//alert(yaxis_data);
			mychart.series[0].update({
			  data: thedata,
			  name: thetooltip,
			  points: thetooltip
			}, true);
			
			mychart.xAxis[0].update({
			  categories: thexdata
			}, true);
			
			//mychart.thetooltip[0].update({
			//  formatter: thetooltip
			//}, true);
			
			//mychart.series[0].update({
			  //data: thedata
			//}, true);
	
	
			//alert('finished plotting');
			mychart.redraw();
			
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

function formatDateweek(date) {
	var options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
	var prnDt = new Date().toLocaleTimeString('en-us', options);
    return prnDt;
}

function formatDate(date) {
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var shortmonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

	var monthname = months[month-1];
	
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
	
	
	//var thedate = days[d.getDay()].substr(0,3) + ' ' +  day.toString() + ' ' + monthname.substr(0,3) + ', ' + year.toString();
	var thedate = day.toString() + ' ' + monthname.substr(0,3) + ', ' + year.toString();
	//alert(days[d.getDay()]);

    //return [year, monthname.substr(0,3), day].join('-');
    return thedate;
}


$(function () {
	$('#container-1').highcharts({	
		
		//console.log('in highcharts');
		
		chart: {
			spacingTop: 10,
			spacingBottom: 0,
			spacingLeft: 0,
			spacingRight: 10,
		},

		title: {
			text: '',
			align: 'left',
		},

		xAxis: {
			title: { text: '' },
			lineWidth: 0,
			minorTickLength: 0,
			tickLength: 0,
			labels: {
				step: 7,
			},
			categories: [
				'1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',
			]
		},

		yAxis: {
			labels: {
				enabled: true
			},
			gridLineWidth: 0,
			title: {
				text: null
			}
		},

		legend: {
			enabled: false
		},

		credits: {
			enabled: false
		},

		tooltip: {
			formatter: function () {
				return '<span style="font-size:10px">' + this.point.name + '</span><br><table><tr><td style="padding:0">' +
					'<span style="color:' + this.series.color + '">Transactions: </a></span><b>' + this.point.y.toString() + '</b><br>' +
					
					'</td></tr></table>';
			}
		},

		plotOptions: {
			series: {
				color: '#1e2022',
				enableMouseTracking: true,
				lineWidth: 1,
				shadow: false,
				animation: false,
				cursor: 'pointer',
				states: {
					hover: {
						lineWidth: 1
					}
				},
				marker: {
					radius: 0
				},
				point: {
					events: {
						select: function (e) {
							location.href = 'tx.html?id=' + this.options.dt;
						}
					}
				}
			},
			column: {
				pointPadding: 0.1,
				borderWidth: 0
			}
		},

		series: [{
			name: 'Transactions',
			type: 'spline',
			data: 	[{y : 0, dt : '1627257600', formattedValue : '0', friendlydate : 'Tuesday, August 14, 2021', price : '$1.00'  },
					 {y : 0, dt : '1627344000', formattedValue : '0', friendlydate : 'Wednesday, August 18, 2021', price : '$1.00'  },
					 {y : 0, dt : '1627430400', formattedValue : '0', friendlydate : 'Thursday, August 19, 2021', price : '$1.00'  },
					 {y : 0, dt : '1627516800', formattedValue : '0', friendlydate : 'Friday, August 20, 2021', price : '$1.00'  },
					 {y : 0, dt : '1627603200', formattedValue : '0', friendlydate : 'Saturday, August 21, 2021', price : '$1.00'  },
					 {y : 0, dt : '1627689600', formattedValue : '0', friendlydate : 'Sunday, August 22, 2021', price : '$1.00'  },
					 {y : 0, dt : '1627776000', formattedValue : '0', friendlydate : 'Monday, August 23, 2021', price : '$1.00'  },
					 {y : 0, dt : '1627862400', formattedValue : '0', friendlydate : 'Tuesday, August 24, 2021', price : '$1.00'  },
					 {y : 0, dt : '1627948800', formattedValue : '0', friendlydate : 'Wednesday, August 25, 2021', price : '$1.00'  },
					 {y : 0, dt : '1628035200', formattedValue : '0', friendlydate : 'Thursday, August 26, 2021', price : '$1.00'  },
					 {y : 0, dt : '1628121600', formattedValue : '0', friendlydate : 'Friday, August 27, 2021', price : '$1.00'  },
					 {y : 0, dt : '1628208000', formattedValue : '0', friendlydate : 'Saturday, August 28, 2021', price : '$1.00'  },
					 {y : 0, dt : '1628294400', formattedValue : '0', friendlydate : 'Sunday, August 29, 2021', price : '$1.00'  },
					 {y : 0, dt : '1628380800', formattedValue : '0', friendlydate : 'Monday, August 30, 2021', price : '$1.00'  },
					 {y : 0, dt : '1628467200', formattedValue : '0', friendlydate : 'Tuesday, August 31, 2021', price : '$1.00'  },],
			allowPointSelect: true,
			pointStart: 0
		}]
	});
});
		
		