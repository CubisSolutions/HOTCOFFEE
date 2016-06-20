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
		}
		else {
			me._size = me._percentage.formattedData[0];
		}
		
		var svgText = d3.select(my2Div)
		.append("svg:svg")
		.attr("width", "100%")
		.attr("height", "100%");
		
		// append text to svg
		svgText.append("text")
		.style("font-size", me._size + "px")
		.style("font-family", "Verdana")
		.attr("x", 10)
		.attr("y", 10)
		.text(me._text);
		
	};
		
	me.afterUpdate = function(){
		
		console.log("afterUpdate method");
		
		// syntax "== null" is different from "=== null"
		// "== null" actually checks both for null and undefined
		if (me._percentage === null || me._percentage === "") {
			me._text = "Cubis";
			me.redraw();
		}
		else {	
			console.log("me._percentage = " + me._percentage);
			
			me._tuple = me._percentage.tuples[0];
			me._text = me._meta_data.dimensions[1].members[me._tuple[0]].text;
			me.redraw();
		}
	}
	
	me.percentage = function(value) {
		
		console.log("percentage method");
		
	    if (value === undefined) {
	    	return me._percentage;
	    } else {
	    	me._percentage = value;
	    	//me.redraw();
	    	return me;
	    }
	  };
	  
	me.metadata = function(value) {
		
		console.log("metadata method");
		
		if (value === undefined) {
			return me._meta_data;
		} else {
			me._meta_data = value;
	    	//me.redraw();
			return me;
		}
	};
});