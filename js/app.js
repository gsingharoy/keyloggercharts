App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

var total_data = new Array();

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

	  $(".hdn-data-container").each(function(index){
	  	var date = new Date.parse($(this).attr("timestamp").substring(0,10));
	  	var total_keystrokes = parseInt($(this).attr("total_keystrokes"));
	  	total_data.push([date.getTime(),total_keystrokes]);
	  });
    
		$(function() {


				$('#charts_container_index').highcharts('StockChart', {
					



					title : {
						text : 'Total Keystrokes'
					},
					
					series : [{
						name : 'Total Keystrokes',
						data : total_data,
						tooltip: {
							valueDecimals: 0
						}
					}]
				});
			});







	});
}


