sap.designstudio.sdk.Component.subclass("com.sap.sample.scngauge.gauge", function() 
{
 
	var me = this;

	//Properties
	this._text = null;
	this._percentage = null;
		
	this.init = function() 
	{
	    this.redraw();
	};
	
	this.redraw = function() 
	{
		var my2Div = this.$()[0];
		
		// Clear any existing gauges.  We'll redraw from scratch
		d3.select(my2Div).selectAll("*").remove();
		
		if(this._percentage != null)
			{
			var svgText = d3.select(my2Div)
			.append("svg:svg")
			.attr("width", "100%")
			.attr("height", "100%");
			
			// append text to svg
			svgText.append("text")
			.style("font-size", this._percentage.formattedData[0] + "px")
			.style("fill", this.textcolorCode)
			.style("font-family", "Verdana")
			.attr("x", 10)
			.attr("y", 10)
			.text(this._text);
			}
	};
		
	this.afterUpdate = function(){
		var tuple = this._percentage.tuples[0];
		this._text = meta_data.dimensions[1].members[tuple[0]].text
		this.redraw();
	}
	
	this.percentage = function(value) {
	    if (value === undefined) {
	    return this._percentage;
	    } else {
	    this._percentage = value;
	    return me;
	    }
	  };
	  
	this.metadata = function(value) {
			if (value === undefined) {
				return meta_data;
			} else {
				meta_data = value;
				return this;
			}
		};
});