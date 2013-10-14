App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});
var categories = new Array();
var data = new Array();

if($("#data_container").length <= 0){
	$.getJSON( "https://api.mongolab.com/api/1/databases/qslab/collections/words?apiKey=fqhK5jNPNPCnv4aIBADT3l5Y0P2DMWJr&l=2000", function( data ) {
	  $("#img_wait_index").hide();
	  $("#data").append("<div id='data_container'></div>")
	  $.each( data, function( key, val ) {
	  	var html = "";
	   	html += "<input type='hidden' class='hdn-data-container' "
	   	$.each( val, function(k,v){
	   		html += k + "='" + v+"' ";
	   	});	
	   	html += ">" ;
	   	$("#data_container").append(html);
	  });




    
		$(function() {

			$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function(data) {
				// Create the chart
				$('#charts_container_index').highcharts('StockChart', {
					

					rangeSelector : {
						selected : 1
					},

					title : {
						text : 'AAPL Stock Price'
					},
					
					series : [{
						name : 'AAPL',
						data : data,
						tooltip: {
							valueDecimals: 2
						}
					}]
				});
			});

		});





	});
}


