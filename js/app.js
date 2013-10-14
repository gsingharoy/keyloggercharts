App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});






var items = ["one","bootshake"];
$.getJSON( "https://api.mongolab.com/api/1/databases/qslab/collections/words?apiKey=fqhK5jNPNPCnv4aIBADT3l5Y0P2DMWJr&l=2000", function( data ) {
   	$("#img_wait_index").hide();
  $.each( data, function( key, val ) {
  	var html = "";
   	html += "<li>"
   	$.each( val, function(k,v){
   		if(html != "<li>")
   			html+=", ";
   		html += k + ":" + v;
   	});	
   	html += "</li>" ;
   	$("#ul_index").append(html);
  });

});
