sap.designstudio.sdk.Component.subclass("com.sap.sample.scngauge.gauge", function() 
{
 
	var me = this;

	//Properties
	me._textcolorCode = 'orange';
	me._text = 'test';
	me._textcolorCodeFill = 'black';
	me._percentage = null;
	
	var percentage = null;
	
	me.init = function() 
	{
	    me.redraw();
	};
	
	me.redraw = function() 
	{
		var my2Div = me.$()[0];
		
		// Clear any existing gauges.  We'll redraw from scratch
		d3.select(my2Div).selectAll("*").remove();
		
		if(percentage === null)
			{
				alert("tis null");
			}
		else{
				alert("tis niet null");
				
				var svgText = d3.select(my2Div)
				.append("svg:svg")
				.attr("width", "100%")
				.attr("height", "100%");
				
				var svgText2 = d3.select(my2Div)
				.append("svg:svg")
				.attr("width", "100%")
				.attr("height", "100%");
				
				// append text to svg
				svgText.append("text")
				.style("font-size", percentage.formattedData[0] + "px")
				.style("fill", me.textcolorCode)
				.style("font-family", "Verdana")
				.attr("x", 10)
				.attr("y", 10)
				.text(me._text);
				
				svgText2.append("text")
				.style("font-size", me._percentage + "px")
				.style("fill", me.textcolorCodeFill)
				.style("font-family", "Verdana")
				.attr("x", 10)
				.attr("y", 10)
				.text(me._text);
				}

	};
	
	me.afterUpdate = function(){
		var tuple = percentage.tuples[i];
		alert(meta_data.dimensions[1].members[tuple[0]].text);
		me._text = meta_data.dimensions[1].members[tuple[0]].text
		alert(me._text);
		me.redraw();
	}
	
	me.percentage = function(value) {
	    if (value === undefined) {
	    return me._percentage;
	    } else {
	    me._percentage = value;
	    percentage = value;
	    return me;
	    }
	  };
	  
	me.metadata = function(value) {
			if (value === undefined) {
				return meta_data;
			} else {
				meta_data = value;
				return this;
			}
		};

});