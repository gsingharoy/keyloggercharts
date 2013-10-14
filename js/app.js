


function isDataEmpty(){
	if($("#data_container").length <= 0){
		return true;
	}
	else{
		return false;
	}

}

function getDataFromMongoLab(view){
	$("#img_wait").show();
	$.getJSON( "https://api.mongolab.com/api/1/databases/qslab/collections/words?apiKey=fqhK5jNPNPCnv4aIBADT3l5Y0P2DMWJr&l=2000", function( data ) {
	  $("#img_wait").hide();
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
	  if(view == "index"){
	  	displayIndexCharts();
	  }
	  else if(view == "avgbackspaces"){
	  	displayAverageBackspaceCharts();
	  }
	  else if(view == "avgtimekeystrokes"){
	  	averageTimeTakenForKeystrokes();
	  }
	});
}

function displayIndexCharts(){
	if(isDataEmpty())
		getDataFromMongoLab('index');
	else{
	$("#img_wait").hide();	
	var keystrokes = new Array();
	var backspaces = new Array();
	var alphabetical_characters = new Array();
	var numeric_characters = new Array();
	var word_separators = new Array();
	var special_characters = new Array();
	var uppercase = new Array();

	$(".hdn-data-container").each(function(index){
	  	var str_date = $(this).attr("timestamp").substring(0,19);
	  	var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
		var dateArray = reggie.exec(str_date); 
		var dateObject = new Date(
		    (+dateArray[1]),
		    (+dateArray[2])-1, 
		    (+dateArray[3]),
		    (+dateArray[4]),
		    (+dateArray[5]),
		    (+dateArray[6])
			);
		keystrokes.push([dateObject.getTime(),parseInt($(this).attr("total_keystrokes"))]);
		backspaces.push([dateObject.getTime(),parseInt($(this).attr("backspaces"))]);
		alphabetical_characters.push([dateObject.getTime(),parseInt($(this).attr("alphabetical_characters"))]);
		numeric_characters.push([dateObject.getTime(),parseInt($(this).attr("numeric_characters"))]);
		word_separators.push([dateObject.getTime(),parseInt($(this).attr("word_separators"))]);
		special_characters.push([dateObject.getTime(),parseInt($(this).attr("special_characters"))]);
		uppercase.push([dateObject.getTime(),parseInt($(this).attr("uppercase"))]);
	});
  	//var date = new Date.parse($(this).attr("timestamp").substring(0,10));

  	$(function() {


				$('#charts_container_index').highcharts('StockChart', {
					



					title : {
						text : 'All Keystrokes'
					},
					legend: {
						enabled : true
					},
					
					series : [{
						name : 'Total Keystrokes',
						data : keystrokes,
						tooltip: {
							valueDecimals: 0
						}
					},
					{
						name : 'Backspaces',
						data : backspaces,
						tooltip: {
							valueDecimals: 0
						}
					}
					,
					{
						name : 'Alphabetical Characters',
						data : alphabetical_characters,
						tooltip: {
							valueDecimals: 0
						}
					}
					,
					{
						name : 'Numeric Characters',
						data : numeric_characters,
						tooltip: {
							valueDecimals: 0
						}
					}
					,
					{
						name : 'Word Separators',
						data : word_separators,
						tooltip: {
							valueDecimals: 0
						}
					},
					{
						name : 'Special Characters',
						data : special_characters,
						tooltip: {
							valueDecimals: 0
						}
					},
					{
						name : 'Uppercase Characters',
						data : uppercase,
						tooltip: {
							valueDecimals: 0
						}
					}
					]
				});
			});
  	}




}


function displayAverageBackspaceCharts(){
if(isDataEmpty())
		getDataFromMongoLab('avgbackspaces');
	else{
	$("#img_wait").hide();	
	var backspaces_avg = new Array();

	$(".hdn-data-container").each(function(index){
	  	var str_date = $(this).attr("timestamp").substring(0,19);
	  	var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
		var dateArray = reggie.exec(str_date); 
		var dateObject = new Date(
		    (+dateArray[1]),
		    (+dateArray[2])-1, 
		    (+dateArray[3]),
		    (+dateArray[4]),
		    (+dateArray[5]),
		    (+dateArray[6])
			);
		var avg_backspace = parseFloat($(this).attr("backspaces"))/parseFloat($(this).attr("total_keystrokes"));
		backspaces_avg.push([dateObject.getTime(),avg_backspace]);
	});
  	//var date = new Date.parse($(this).attr("timestamp").substring(0,10));
  	$(function() {


				$('#charts_container_avgbackspaces').highcharts('StockChart', {
					



					title : {
						text : 'Average backspaces per keystroke'
					},
					legend: {
						enabled : true
					},
					series : [{
						name : 'Average Backspaces per keystroke',
						data : backspaces_avg,
						tooltip: {
							valueDecimals: 3
						}
					},
					]
				});
			});
  	}


}

function averageTimeTakenForKeystrokes(){
	if(isDataEmpty())
		getDataFromMongoLab('avgtimekeystrokes');
	else{
	$("#img_wait").hide();	
	var arr_avg_time = new Array();

	$(".hdn-data-container").each(function(index){
	  	var str_date = $(this).attr("timestamp").substring(0,19);
	  	var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
		var dateArray = reggie.exec(str_date); 
		var dateObject = new Date(
		    (+dateArray[1]),
		    (+dateArray[2])-1, 
		    (+dateArray[3]),
		    (+dateArray[4]),
		    (+dateArray[5]),
		    (+dateArray[6])
			);
		if(parseInt($(this).attr("time_taken")) == 0)
			var avg_time = parseFloat($(this).attr("total_keystrokes"));
		else	
			var avg_time = parseFloat($(this).attr("total_keystrokes"))/parseFloat($(this).attr("time_taken"));
		arr_avg_time.push([dateObject.getTime(),avg_time]);
	});
  	//var date = new Date.parse($(this).attr("timestamp").substring(0,10));
  	$(function() {


				$('#charts_container_avgtimekeystrokes').highcharts('StockChart', {
					



					title : {
						text : 'Average time taken for keystrokes'
					},
					legend: {
						enabled : true
					},
					series : [{
						name : 'Keystrokes per second',
						data : arr_avg_time,
						color: 'green',
						tooltip: {
							valueDecimals: 2
						}
					},
					]
				});
			});
  	}


}

App = Ember.Application.create({
  ready: function() {
    console.log('App ready');
  }
});



App.Router.map(function() {
  	this.resource('avgbackspaces');
  	this.resource('avgtimekeystrokes')
});





App.IndexView = Ember.View.extend({
  didInsertElement: function() {
    displayIndexCharts();
    $(".nav-menu").removeClass('active');
    $("#li_index").addClass('active');
  }
});

App.AvgbackspacesView = Ember.View.extend({
  didInsertElement: function() {
  	displayAverageBackspaceCharts();
    $(".nav-menu").removeClass('active');
    $("#li_avgbackspaces").addClass('active');
  }
});

App.AvgtimekeystrokesView = Ember.View.extend({
  didInsertElement: function() {
  	averageTimeTakenForKeystrokes();
    $(".nav-menu").removeClass('active');
    $("#li_avgtimekeystrokes").addClass('active');
  }
});









