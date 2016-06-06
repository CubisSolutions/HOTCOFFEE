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
		 
		var vis = d3.select(myDiv)
			  .append("svg:svg")
			  .attr("width", "100%")
			  .attr("height", "100%");
		var pi = Math.PI;
		 
		// Find the larger left/right padding
		var lrPadding = me._paddingLeft + me._paddingRight;
		var tbPadding = me._paddingTop + me._paddingBottom;
		var maxPadding = lrPadding;
		if (maxPadding < tbPadding)
		{
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
		    .attr("width", me.$().width())
		    .attr("height", me.$().height()) // Added height and width so arc is visible
		    .attr("transform", "translate(" + me._offsetLeft + "," + me._offsetDown + ")")
		    .attr("d", arcDef);
		 
		
		/*
		// TEST = draw new masked shape inside the arc.
		vis.append("clipPath")
		.attr("id","block-clip")
		.append("rect")
		.attr("fill", "black")
		.attr("x", 0)
		.attr("y", 0)
		.attr("height", 100)
		.attr("width", 100);
		*/
		
		/*
		// append cubis logo image.
		vis.append("image")
		.attr("x",0)
		.attr("y",0)
		.attr("width",206)
		.attr("height", 60)
		.attr("xlink:href", "Layout/CUBIS")
		*/
		
		
		/*
		//Blue rectangle as a test.
		vis.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("clip-path", "url(#block-clip)")
		.attr("fill", "blue")
		.attr("height", 300)
		.attr("width", 300);
		*/
		
		/*
		vis.append("polyline")
		.attr("points", "05,80 80,90")
		.attr("stroke", "blue")
		.attr("stroke-width", 5)
		.attr("clip-path", "url(#block-clip)");
		*/
		
		/*
		vis.append("text")
		.style("font-size", "55px")
		.style("fill", "black")
		.style("stroke", "blue")
		.style("font-family", "Verdana")
		.attr("x", 10)
		.attr("y", 10)
		.text("dit is een test voor Cubis");
		*/
		
		/*
		var blok = vis.append("rect")
			.attr("x", 0) // offset by 0
			.attr("y", 0) // offset by 0
			.attr("width", me.$().width())
			.attr("height", me.$().height())
			//.attr("mask", "url(#iconmask)")
			.style("fill", me._colorCode);
		*/
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




sap.designstudio.sdk.Component.subclass("com.sap.sample.scngauge.textFiller", function() 
{
	var me = this;
	 
	//Properties
	me._text = "Type your text";
	me._textcolorCode = "black";
	me._score = 25;
	
	me.init = function() 
	{
	    me.redraw();
	};
	
	me.redraw = function() 
	{
		var my2Div = me.$()[0];
		
		// Clear any existing gauges.  We'll redraw from scratch
		d3.select(my2Div).selectAll("*").remove();
		
		var svgText = d3.select(my2Div)
		  .append("svg:svg")
		  .attr("width", "100%")
		  .attr("height", "100%");		
		
		svgText.append("text")
		.style("font-size", "60px")
		.style("fill", "black")
		.style("stroke-width", 4)
		.style("stroke", "black")
		.attr("x", 10)
		.attr("y", 70)
		.text(me._text);
		
		
		// masking block
		svgText.append("clipPath")
		.attr("id","text-clip")
		.append("text")
		.style("font-size", "60px")
		.style("fill", "black")
		.attr("x", 10)
		.attr("y", 70)
		.text(me._text);
			
		
		// append text to svg
		svgText.append("rect")
		.attr("x",0)
		.attr("y",0)
		.attr("height", 80)
		.attr("width", ( me._score + "%") )
		.attr("fill", "orange")
		.attr("clip-path", "url(#text-clip)");		
		
	};
	
	me.text = function(value)
	{
		me._text = value;
		me.redraw();
		return me;
	};
	
	// Colorcode
	me.textcolorCode = function(value) 
	{
	  if (value === undefined)
	  {
		  return me._textcolorCode;
	  } 
	  else
	  {
		  me._textcolorCode = value;
		  me.redraw();
		  return me;
	  }
	};
	me.score = function(value)
	{
		if(value === undefined)
			{
			return me._score;
			}
		else
			{
			me._score = value;
			me.redraw();
			return me;
			}
	}
	
});

sap.designstudio.sdk.Component.subclass("com.sap.sample.scngauge.logoFiller", function() 
{
	var me = this;
	 
	//Properties
	me._text = "test";
	me._textcolorCode = "black";
	
	me.init = function() 
	{
	    me.redraw();
	};
	
	me.redraw = function() 
	{
		var my3Div = me.$()[0];
		
		// Clear any existing gauges.  We'll redraw from scratch
		d3.select(my3Div).selectAll("*").remove();
		
		var svgLogo = d3.select(my3Div)
		  .append("svg:svg")
		  .attr("width", "100%")
		  .attr("height", "100%");		
		
		/*
		// append text to svg
		svgText.append("image")
		.attr("x", 10)
		.attr("y", 10)
		.attr("xlink:href","http://www.cubis.be/images/logo.gif");
		*/
		
//		svgLogo.append("clipPath")
//		.attr("id","block-clip")
//		.append("rect")
//		.attr("fill", "black")
//		.attr("x", 0)
//		.attr("y", 0)
//		.attr("height", 400)
//		.attr("width", 400);
		
		
		svgLogo.append("path")
		.style("stroke-width", 10)
		.style("stroke", "black")
		.style("fill", "white")
		.style("stroke-linejoin", "round")
		//.attr("clip-path", "url(#block-clip)")
		.attr("d", "M56 44 L42 18 L0 0 L22 26 L6 34 L28 56")		
	};
});
		