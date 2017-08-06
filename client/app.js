var heroku ="https://tranquil-badlands-25971.herokuapp.com/"


function getData() {
	$.getJSON("https://tranquil-badlands-25971.herokuapp.com/menu4", function(data) {	
		$( ".middleColumn" ).html(data);
		$( ".forth" ).css( "background-color","white" );
	})
}


function selection(state){
	$(".navButtons").click(function() {
   		var myClass = $(this).attr("class"); 		
   		var menuNumber = myClass.toString().slice(0,5)
   		$.getJSON(`https://tranquil-badlands-25971.herokuapp.com/${menuNumber}`, function(data) {	
			$( ".middleColumn" ).html(data);
		})
	});
}



function current(state) {

	$( ".menu1" ).click(function( event ) {
  		$( ".first" ).css( "background-color","white" );
  		$( ".second" ).css( "background-color","#BDBDBD" );
  		$( ".third" ).css( "background-color","#BDBDBD" );
  		$( ".forth" ).css( "background-color","#BDBDBD" );
  		$( ".fifth" ).css( "background-color","#BDBDBD" );
	});
		$( ".menu2" ).click(function( event ) {
  		$( ".second" ).css( "background-color","white" );
  		$( ".first" ).css( "background-color","#BDBDBD" );
  		$( ".third" ).css( "background-color","#BDBDBD" );
  		$( ".forth" ).css( "background-color","#BDBDBD" );
  		$( ".fifth" ).css( "background-color","#BDBDBD" );
	});
		$( ".menu3" ).click(function( event ) {
  		$( ".third" ).css( "background-color","white" );
  		$( ".second" ).css( "background-color","#BDBDBD" );
  		$( ".first" ).css( "background-color","#BDBDBD" );
  		$( ".forth" ).css( "background-color","#BDBDBD" );
  		$( ".fifth" ).css( "background-color","#BDBDBD" );
	});
		$( ".menu4" ).click(function( event ) {
  		$( ".forth" ).css( "background-color","white" );
  		$( ".second" ).css( "background-color","#BDBDBD" );
  		$( ".first" ).css( "background-color","#BDBDBD" );
  		$( ".third" ).css( "background-color","#BDBDBD" );
  		$( ".fifth" ).css( "background-color","#BDBDBD" );
	});
		$( ".menu5" ).click(function( event ) {
  		$( ".fifth" ).css( "background-color","white" );
  		$( ".second" ).css( "background-color","#BDBDBD" );
  		$( ".first" ).css( "background-color","#BDBDBD" );
  		$( ".third" ).css( "background-color","#BDBDBD" );
  		$( ".forth" ).css( "background-color","#BDBDBD" );
	});
}











getData()
selection()
current()





