//this is where the slider functionality is defined. here is some info for how it was created. http://jqueryui.com/slider/#steps

$(function() {
		$( "#slider" ).slider({
		  value:2013,
		  min: 1990,
		  max: 2013,
		  step: 1,
		  slide: function( event, ui ) {
			$( "#year" ).val( ui.value );
			console.log(ui.value);
		  }
		});
		$( "#year" ).val( $( "#slider" ).slider( "value" ) );
	  });
	  
//This is a function to make dollar amounts look nice.	  
function Currency(sSymbol, vValue) {
  aDigits = vValue.toFixed().split(".");
  aDigits[0] = aDigits[0].split("").reverse().join("").replace(/(\d{3})(?=\d)/g,   "$1,").split("").reverse().join("");
  return sSymbol + aDigits.join(".");
}
function printOrgs(layer,jdata){
			listOfOrgs = "<table>"
			for (var i = 0; i < jdata.length; i++) {
				if(jdata[i].Zip === layer.feature.properties.NAME){
					listOfOrgs += "<tr><td>" + jdata[i].Grantee_ID + "</td><td>" + Currency('$',jdata[i].Amount) + "</td>";
					listOfOrgs += "<td>" + jdata[i].Zip + "</td><tr>"
				}
			}
			return listOfOrgs + "</table>";
		}
