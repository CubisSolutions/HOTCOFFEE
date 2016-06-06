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
		
		// append text to svg
		svgText.append("text")
		.style("font-size", "55px")
		.style("fill", me._textcolorCode)
		.style("font-family", "Verdana")
		.attr("x", 10)
		.attr("y", 10)
		.text(me._text);
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
		svgLogo.append("clipPath")
		.attr("id","block-clip")
		.append("rect")
		.attr("fill", "black")
		.attr("x", 0)
		.attr("y", 300)
		.attr("height", 400)
		.attr("width", 800);
		
		
		svgLogo.append("path")
		.style("stroke-width", 10)
		.style("stroke", "black")
		.style("fill", "white")
		.style("stroke-linejoin", "round")
		.attr("clip-path", "url(#block-clip)")
		.attr("d", "M356.5 402.3C356.5 402.3 381.1 406.2 381.5 430.4 381.5 431.1 437.7 446.6 459.6 445.4 481.5 444.1 509 424.8 516.5 418.5 524 412.3 536.5 402.3 540.2 389.2 544 376 545.8 361 545.8 361L578.3 366C578.3 366 579.6 369.2 577.1 380.4 574.6 391.7 569.6 406.7 562.1 420.4 554.6 434.2 543.3 456.9 530.2 466 515.8 476 494 484.8 482.7 486.6 463.5 489.8 434 487.3 434 487.3 434 487.3 436.5 518.5 434 544.1 431.5 569.7 427.1 602.9 424 616 420.9 629.1 417.1 641.6 417.1 641.6L410.2 657.2 298.4 662.2 302.1 639.1C302.1 639.1 300.9 559.7 299.6 542.2 298.4 524.8 301.5 502.9 301.5 502.9 301.5 502.9 261.5 530.4 227.8 526.6 185.3 521.9 142.2 494.8 142.2 494.8L171.5 462.3C171.5 462.3 201.5 486.6 227.2 486 252.8 485.4 267.1 479.1 279 471.6 290.9 464.1 308.4 452.9 310.9 447.9 313.4 442.9 314.6 434.2 314.6 434.2");
		
		svgLogo.append("path")
		.style("fill", "#72caba")
		.style("stroke", "black")
		.style("stroke-linejoin","round")
		.attr("clip-path", "url(#block-clip)")
		.attr("d", "M45.6 283.9L45.6 225.5C45.6 225.5 37.4 215.3 38.4 211.7 39.4 208.1 38.9 197.9 56.3 195.3 73.7 192.7 90.6 187.6 100.4 193.8 110.1 199.9 110.1 204.5 108 209.6 106 214.7 99.3 219.4 99.3 219.4L95.7 281.3 89.1 386.3 79.4 421.6 57.3 420.6 48.6 402.7 45.6 283.9z");
	};
});
		