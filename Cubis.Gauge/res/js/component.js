sap.designstudio.sdk.Component.subclass("com.sap.sample.scngauge.gauge", function() 
{
	
	console.log("initialization of function class");
	
	var me = this;

	//Properties
	me._text = "Cubis";
	me._percentage = null;
	me._meta_data = null;
	me._tuple = null;
	me._size = "50";
	
	//Methods
	me.init = function() 
	{
		console.log("init method");
		me.redraw();
	};
	
	me.redraw = function() 
	{
		console.log("redraw method");
		var my2Div = me.$()[0];
		
		// Clear any existing gauges.  We'll redraw from scratch
		d3.select(my2Div).selectAll("*").remove();
		
		if (me._percentage === null || me._percentage === "") {
			me._size = "50";
			me._text = "Cubis";
			
			var svgText = d3.select(my2Div)
			.append("svg:svg")
			.attr("width", "100%")
			.attr("height", "100%");
	
			//append text to svg
			svgText.append("text")
			.style("font-size", me._size + "px")
			.style("font-family", "Verdana")
			.attr("x", 10)
			.attr("y", 10)
			.text(me._text);
		}
		else {
			console.log(me._percentage.tuples.length+"");
			var tuple = me._percentage.tuples;
			
			for(i=0 ; i < me._percentage.tuples.length; i++){
					
				me._size = me._percentage.formattedData[i];
				me._text = me._meta_data.dimensions[1].members[tuple[i][1]].text;
				console.log(me._text);
				
				if(me._meta_data.dimensions[1].members[tuple[i][1]].type !== "RESULT"){
					var svgText = d3.select(my2Div)
					.append("svg:svg")
					.attr("width", "100%")
					.attr("height", "100%");
			
					//append text to svg
					svgText.append("text")
					.style("font-size", me._size + "px")
					.style("font-family", "Verdana")
					.attr("x", 10)
					.attr("y", 10)
					.text(me._text);
				}
			}
		}
		
		
	}
			
	me.percentage = function(value) {
		
		console.log("percentage method");
		
	    if (value === undefined) {
	    	return me._percentage;
	    } else {
	    	me._percentage = value;	
	    	return me;
	    }
	  };
	  
	me.metadata = function(value) {
		
		console.log("metadata method");
		
		if (value === undefined) {
			return me._meta_data;
		} else {
			me._meta_data = value;
			me.redraw();
			return me;
		}
	};
});