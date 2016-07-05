
var counter = 1;

//define(["sap/designstudio/sdk/component","d3","css!..css/component.css"], function(Component, d3, unusedDummy){
//	Component.subclass("com.sap.sample.scngauge.gauge", function()
//	{
sap.designstudio.sdk.Component.subclass("com.sap.sample.scngauge.gauge",function()
		{
	

		var me = this;
		 
		//Properties
		me._colorCode = 'red';
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
	me._text = "Cubis test";
	me._percent = null;
	me._ID = counter;
	me._size = 50;
	counter = counter + 1 ;
	
	me.init = function() 
	{
//		console.log("Start init Text filler", "log");
		me.redraw();
	    
	};
	
	me.redraw = function() 
	{
		console.log("Enter REDRAW function", "log");
		
		var my2Div = me.$()[0];
		
		// Clear any existing svg's.  We'll redraw from scratch
		d3.select(my2Div).selectAll("*").remove();
		
		// test - find a way to test if datascource is empty...
		if(me.DATASOURCE === "none" || me.DATASOURCE === null)
		{
			console.log("datasource is empty");
		}
		
		if (me._percent === null || me._percent === "") 
		{
			console.log("percent check error = " + me._percent + "!","warn");
			console.log("text check error = " + me._text + "!","warn");
			me._size = "20";
			me._text = "Cubis";
		}
//		else 
//		{
//			console.log("percent check: value", "warn")
//			console.log("me._percentage = " + me._percent);
//			
//			me._tuple = me._percent.tuples[0];
//			me._text = me._meta_data.dimensions[1].members[me._tuple[0]].text;
//			me._size = me._percent.formattedData[0];
//		}
		
		var svgText = d3.select(my2Div)
		  .append("svg:svg")
		  .attr("width", "100%")
		  .attr("height", "100%");
		
		
		// Gradient for masking.
		svgText.append("linearGradient")
        .attr("id","gradientGradient" + me._ID)
        .attr("x1",0)
        .attr("y1","50%")
        .attr("x2", "100%")
        .attr("y2", "50%")
        .selectAll("stop")
        .data([
          {offset: "0%", color: me._progressColorCode, opacity:1},
          {offset: (me._size + "%"), color: me._progressColorCode, opacity:1},
          {offset: (me._size + "%"), color: me._textcolorCode, opacity:1},
          {offset: "100%", color: me._textcolorCode, opacity:1} 
        ])
        .enter().append("stop")
        .attr("offset", function(d) {return d.offset})
        
        .attr("stop-color", function(d) {return d.color})
        .attr("stop-opacity", function(d){return d.opacity});
		
		
		// fill background
        svgText.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("height","100%")
        .attr("width", me._size + "%")
        .attr("fill", me._progressFillColorCode);
        console.log("fill background", "log");
        
        svgText.append("text")
        .style("fill", me._progressColorCode)
        .attr("x", 10)
        .attr("y", 10)
        .text( me._size + "%" )
        .style("font-size" , ".8em");
        
        
		// clipping path
        svgText.append("clipPath")
        .attr("id","clip-clip"+ me._ID)
        .append("text")
        .text(me._text)
        .attr("x", 5)
        .attr("y", 40)
        .style("font-size", "3em");        
        
        // masking frame
        svgText.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("height","100%")
        .attr("width", "100%")
        .attr("fill", "url(#gradientGradient"+ me._ID +")")
        .attr("clip-path","url(#clip-clip"+ me._ID +")");
        
        // Draw rectangle around the box.
        svgText.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("height", "100%")
		.attr("width" , "100%")
		.style("stroke", "black")
		.style("fill", "none");
        
// 		Alternatief van de gradient (Nico)      
//      svgText.append("clipPath")
//      .attr("id","clip-clip")
//      .append("text")
//      .text(me._text)
//      .attr("x", 5)
//      .attr("y", 80)
//      .style("font-size", "90px");
//      
//      svgText
//      .append("rect")
//      .attr("x",0)
//      .attr("y",0)
//      .attr("height", 90)
//      .attr("width", 140)
//      .attr("fill", "black")
//      .attr("clip-path","url(#clip-clip)")
//      ;
//      
//      svgText
//      .append("rect")
//      .attr("x",0)
//      .attr("y",0)
//      .attr("height", 90)
//      .attr("width", 70)
//      .attr("fill", "orange")
//      .attr("clip-path","url(#clip-clip)")
//      ;
//      
//      svgText
//      .append("rect")
//      .attr("x",0)
//      .attr("y",0)
//      .attr("height", 90)
//      .attr("width", 40)
//      .attr("fill", "white")
//      .attr("clip-path","url(#clip-clip)")
//      ;
	
		
	};
	
	
	// After update
	me.afterUpdate = function()
	{
		
//		console.log("afterUpdate method","warn");
		me.redraw();
		
		// syntax "== null" is different from "=== null"
		// "== null" actually checks both for null and undefined
		
	};
	

//	Getters & Setters
	me.text = function(value)
	{
		 //console.log("component.js --- update text valtue with: " + value);
		 if (value === undefined)
		  {
			  return me._text;
		  } 
		  else
		  {
			  me._text = value;
			  //me.redraw();
			  return me;
		  }
	};
	
	// Colorcode
	me.textcolorCode = function(value) 
	{
		//console.log("textcolor method");
	  if (value === undefined)
	  {
		  return me._textcolorCode;
	  } 
	  else
	  {
		  me._textcolorCode = value;
		  //me.redraw();
		  return me;
	  }
	};
	
	// ProgressColorcode
	me.progressColorCode = function(value) 
	{
	  if (value === undefined)
	  {
		  return me._progressColorCode;
	  } 
	  else
	  {
		  me._progressColorCode = value;
		  //me.redraw();
		  return me;
	  }
	};
	
	// ProgressColorcode
	me.progressFillColorCode = function(value) 
	{
	  if (value === undefined)
	  {
		  return me._progressFillColorCode;
	  } 
	  else
	  {
		  me._progressFillColorCode = value;
		  //me.redraw();
		  return me;
	  }
	};
	
	// map percent value to bindable object
	me.percent = function(value) 
	{
		
		//console.log("percent method");
		
	    if (value === undefined) 
	    {
	    	return me._percent;
	    } 
	    else
	    {
	    	me._percent = value;
	    	//me.redraw();
	    	return me;
	    }
	  };
	  
	  me.metadata = function(value) 
	  {			
			//console.log("metadata method");
			
			if (value === undefined) 
			{
				return me._meta_data;
			}
			else
			{
				me._meta_data = value;
		    	//me.redraw();
				return me;
			}
		};
});

//sap.designstudio.sdk.Component.subclass("com.sap.sample.scngauge.logoFiller", function() 
//{
//	var me = this;
//	 
//	//Properties
//	me._text = "test";
//	me._textcolorCode = "black";
//	
//	me.init = function() 
//	{
//	    me.redraw();
//	};
//	
//	me.redraw = function() 
//	{
//		var my3Div = me.$()[0];
//		
//		// Clear any existing gauges.  We'll redraw from scratch
//		d3.select(my3Div).selectAll("*").remove();
//		
//		var svgLogo = d3.select(my3Div)
//		  .append("svg:svg")
//		  .attr("width", "100%")
//		  .attr("height", "100%");		
//		
//		/*
//		// append text to svg
//		svgText.append("image")
//		.attr("x", 10)
//		.attr("y", 10)
//		.attr("xlink:href","http://www.cubis.be/images/logo.gif");
//		*/
//		
////		svgLogo.append("clipPath")
////		.attr("id","block-clip")
////		.append("rect")
////		.attr("fill", "black")
////		.attr("x", 0)
////		.attr("y", 0)
////		.attr("height", 400)
////		.attr("width", 400);
//		
//		
//		svgLogo.append("path")
//		.style("stroke-width", 10)
//		.style("stroke", "black")
//		.style("fill", "white")
//		.style("stroke-linejoin", "round")
//		//.attr("clip-path", "url(#block-clip)")
//		.attr("d", "M56 44 L42 18 L0 0 L22 26 L6 34 L28 56")		
//	};
//});


sap.designstudio.sdk.Component.subclass("com.sap.sample.scngauge.textBlockFiller", function() 
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
            
            if (me._percentage === null || me._percentage === "") 
            {
                  me._size = "50";
                  me._text = "Cubis";
                  
                  var svgText = d3.select(my2Div)
                  .append("svg:svg")
                  .attr("width", "100%")
                  .attr("height", "100%");
      
                  //append text to svg
                  svgText.append("text")
                  .style("font-size", "24")
                  .style("font-family", "Verdana")
                  .attr("x", 10)
                  .attr("y", 40)
                  .text(me._text);
            }
            else 
            {
                  console.log(me._percentage.tuples.length+"");
                  var tuple = me._percentage.tuples;
                  
                  
                  for(i=0 ; i < me._percentage.tuples.length; i++)
                  {
                	  	me._ID = counter;                  	  
                	  	counter = counter + 1 ;
                        me._size = me._percentage.formattedData[i];
                        me._text = me._meta_data.dimensions[1].members[tuple[i][1]].text;
                        console.log(me._text);
                        console.log(me._size);
                        if(me._meta_data.dimensions[1].members[tuple[i][1]].type !== "RESULT")
                        {
                             var svgText = d3.select(my2Div)
                             .append("svg:svg")
                             .attr("width", "100%")
                             .attr("height", "100%");
                             
                          // Gradient for masking.
                     		svgText.append("linearGradient")
                             .attr("id","gradientGradient" + me._ID)
                             .attr("x1",0)
                             .attr("y1","50%")
                             .attr("x2", "100%")
                             .attr("y2", "50%")
                             .selectAll("stop")
                             .data([
                               {offset: "0%", color: me._progressColorCode, opacity:1},
                               {offset: (me._size + "%"), color: me._progressColorCode, opacity:1},
                               {offset: (me._size + "%"), color: me._textcolorCode, opacity:1},
                               {offset: "100%", color: me._textcolorCode , opacity:1} 
                             ])
                             .enter().append("stop")
                             .attr("offset", function(d) {return d.offset})
                             
                             .attr("stop-color", function(d) {return d.color})
                             .attr("stop-opacity", function(d){return d.opacity});
                     		
                     		// clipping path
                             svgText.append("clipPath")
                             .attr("id","clip-clip"+ me._ID)
                             .append("text")
                             .text(me._text)
                             .attr("x", 5)
                             .attr("y", 40)
                             .style("font-size", "35px");
                             
                             // masking frame
                             svgText.append("rect")
                             .attr("x",0)
                             .attr("y",0)
                             .attr("height","100%")
                             .attr("width", "100%")
                             .attr("fill", "url(#gradientGradient"+ me._ID +")")
                             .attr("clip-path","url(#clip-clip"+ me._ID +")");
                  
//                             //append text to svg
//                             svgText.append("text")
//                             .style("font-size", me._size + "px") // fixed zetten
//                             .style("font-family", "Verdana")
//                             .attr("x", 10)
//                             .attr("y", 10)
//                             .text(me._text);
                        }
                  }
            }
            
            
      }
                  
      me.percentage = function(value) 
      {
            
            console.log("percentage method");
            
          if (value === undefined) {
            return me._percentage;
          } else {
            me._percentage = value; 
            return me;
          }
        };
        
      me.metadata = function(value) 
      {
            console.log("metadata method");
            
            if (value === undefined) {
                  return me._meta_data;
            } else {
                  me._meta_data = value;
                  me.redraw();
                  return me;
            }
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
  	
  	// ProgressColorcode
  	me.progressColorCode = function(value) 
  	{
  	  if (value === undefined)
  	  {
  		  return me._progressColorCode;
  	  } 
  	  else
  	  {
  		  me._progressColorCode = value;
  		  me.redraw();
  		  return me;
  	  }
  	};
});

		