$(window).bind("load",function(){

	var map = L.map('map').setView([42.281389, -83.748333], 11);
	var zip = 0;

	geojsonFeature = d3.json('data/zip.json',function(data){
		L.geoJson(data).addTo(map);

		console.log(data);
	
	L.tileLayer('http://{s}.tile.cloudmade.com/6a7ab36b926b4fc785f8a957814c8685/997/256/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
	    maxZoom: 18,
		}).addTo(map);
	function onEachFeature(feature, layer) {
			layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: popupContent,
            // pointToLayer: pointToLayer
			});
		}
		
	function popupContent(){
		console.log("HELLO");
	};

	function highlightFeature(e) {
		var layer = e.target;
		zip = layer.feature.properties.NAME;
		var div = document.getElementById( 'sideTooltipdiv' );
		div.insertAdjacentHTML('beforeBegin',layer.feature.properties.NAME);
		
	    layer.setStyle({ // highlight the feature
	        weight: 5,
	        color: '#666',
	        dashArray: '',
	        fillOpacity: 1
	    });
		
	    if (!L.Browser.ie && !L.Browser.opera) {
	        layer.bringToFront();
	    }
    	// map.info.update(layer.feature.properties); // Update infobox
    	return zip;
	};
	function resetHighlight(e) {
	
    var layer = e.target;
	
    layer.setStyle({ // highlight the feature
        weight: 1,
        dashArray: '',
		color:"white",
		fillColor:"black",
        fillOpacity: 1,
		// border-color: "white";	
    });
	
    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
	
    // map.info.update(layer.feature.properties); // Update infobox
	};
	x = 5
	y = "red"
	z = "yellow"
	L.geoJson(data, {
	onEachFeature:onEachFeature,
    style: function(feature) {
        switch (feature.properties.NAME) {
            case '48105': return {color: y}
            case '48108': return {color: "white", "weight": x}
			default: return {color:"white",fillColor:"black",weight:1,fillOpacity:1}
        }
    }
	
	}).addTo(map);
	
	
	});
	var jdata;
	//getting our json data
    $.getJSON("data/aaacfData.json", function(data){
        jdata = data;
    });
	
	function generateMap() {
		//update map
	}

	//create a subset of data by FOI
	var foiData = 'all';
	var zipData;
	var yearData = 'all';
	var subData = [];
	var totalAmount = 0;
	var numOrgs;
	var s = [];
	var numGrants;
	var a = [];

	function foi(){
		foiData = $(this).data('foi');
		console.log('button clicked: ',foiData);
		if (foiData != 'all') {
			$('#foi6').removeClass('hidden');
		} else {
			$('#foi6').addClass('hidden');
		}
		// $('.map').remove();
		// generateMap();

		//clear any previous data inside subData and a, which act as our filtered results
		subData = [];
		a = [];
		totalAmount = 0;
		s = [];

		//iterate through our full dataset to filter by FOI
		for (var i = 0; i < jdata.length; i++) {
			if (jdata[i].Field_aggregate === foiData) {
				subData.push(jdata[i]);
				ID = jdata[i].Grantee_ID;

				//create the logic for inclusion in set to not count duplicates
				if (s.indexOf(ID) > -1) {
					//do nothing
				} else {
					s.push(ID);
				}
				var amt = jdata[i].Amount;
				amt = parseInt(amt);
				a.push(amt);			
				}
			};

		// the logic to determine aggregated sums by FOI!
		numGrants = subData.length;
		numOrgs = s.length;
		for (var i = 0; i < a.length; i++) {
			totalAmount = totalAmount + a[i];
		}
		console.log("number of orgs", numOrgs);
		console.log("num of grants", numGrants);
		console.log("total awarded", totalAmount);
	} //end foi function


	$('.foi').on('click', foi);

	
	//the function to filter by zip code
	function zipfilter(){
		console.log(zip);

	}
	zipfilter();


	$('.zip').on('hover', zipfilter);
});