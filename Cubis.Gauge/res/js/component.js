sap.designstudio.sdk.Component.subclass("com.sap.sample.scngauge.gauge", function() 
{
 
	var me = this;
	 
	//Properties
	me._colorCode = 'green';
	me._innerRad = 0.0;
	me._outerRad = 0.0;
	me._endAngleDeg = 90.0;
	me._startAngleDeg = -120.0;
	me._paddingTop = 0.0;
	me._paddingBottom = 0.0;
	me._paddingLeft = 0.0;
	me._paddingRight = 0.0;
	me._offsetLeft = 0.0;
	me._offsetDown = 0.0;   
	
	me.init = function() 
	{
	    me.redraw();
	};
	
	me.redraw = function() 
	{
		 var myDiv = me.$()[0];
		 
		  // Clear any existing gauges.  We'll redraw from scratch
		  d3.select(myDiv).selectAll("*").remove();
		 
		  var vis = d3.select(myDiv).append("svg:svg").attr("width", "100%").attr("height", "100%");
		  var pi = Math.PI;
		 
		  // Find the larger left/right padding
		  var lrPadding = me._paddingLeft + me._paddingRight;
		  var tbPadding = me._paddingTop + me._paddingBottom;
		  var maxPadding = lrPadding;
		  if (maxPadding < tbPadding){
		  maxPadding = tbPadding
		  }
		 
		  me._outerRad = (me.$().width() - 2*(maxPadding))/2;
		 
		  //The offset will determine where the center of the arc shall be
		  me._offsetLeft = me._outerRad + me._paddingLeft;
		  me._offsetDown = me._outerRad + me._paddingTop;
		 
		  var arcDef = d3.svg.arc()
		  .innerRadius(me._innerRad)
		  .outerRadius(me._outerRad)
		  .startAngle(me._startAngleDeg * (pi/180)) //converting from degs to radians
		  .endAngle(me._endAngleDeg * (pi/180)); //converting from degs to radians
		 
		 
		  var guageArc = vis.append("path")
		     .style("fill", me._colorCode)
		     .attr("width", me.$().width()).attr("height", me.$().height()) // Added height and width so arc is visible
		     .attr("transform", "translate(" + me._offsetLeft + "," + me._offsetDown + ")")
		     .attr("d", arcDef);
	};
	
	
	
	
	//Getters and Setters
	// Colorcode
	me.colorCode = function(value) 
	{
	  if (value === undefined)
	  {
		  return me._colorCode;
	  } 
	  else
	  {
		  me._colorCode = value;
		  me.redraw();
		  return me;
	  }
	};
	
	//Inner radius
	me.innerRad = function(value) 
	{
		
	  if (value === undefined)
	  {
		  return me._innerRad;
	  } 
	  else
	  {	 
		  var isValid = me.validateRadii(value, me._outerRad);
		  if (isValid === false)
		  {
			  alert("Warning!  The gauge arc can't have a small inner radius than outer!  Inner Radius must be equal to or less than " + me._outerRad);
			  alert("Please decrease the inner radius, or increase the size of the control.  Height & width (including subtraction for padding) must me at least twice as large as Internal Radius!");
		  }
		  else
		  {
			  me._innerRad = value;
			  me.redraw();
		  }
		  return this;
	  }
	};
	
	//Validate the Inner and Outer Radii
	me.validateRadii = function(inner, outer) 
	{
		if (inner <= outer) 
		{
			return true;
		}
		else
		{
			return false;
		}
	};
	
	// change angle start & end
	me.endAngleDeg = function(value) 
	{
		if (value === undefined) 
		{
			return me._endAngleDeg;
		}
		else
		{
			me._endAngleDeg = value;
			me.redraw();
			return this;
		}
	};
 
	me.startAngleDeg = function(value) 
	{
		if (value === undefined) 
		{
			return me._startAngleDeg;
		}
		else
		{
			me._startAngleDeg = value;
			me.redraw();
			return this;
		}
	};

	
});