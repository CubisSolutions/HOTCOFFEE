// counter voor id van objecten.
var counter = 1;


sap.designstudio.sdk.Component.subclass("be.cubis.designstudio.textfillsingle.textFillSingle", function() 
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
		
		if (me._percent === null || me._percent === "") 
		{
			console.log("percent check error = " + me._percent + "!","warn");
			console.log("text check error = " + me._text + "!","warn");
			me._size = "20";
			me._text = "Cubis";
		}
		else 
		{
			console.log("percent check: value", "warn")
			console.log("me._percentage = " + me._percent);
			
			me._tuple = me._percent.tuples[0];
			me._text = me._meta_data.dimensions[1].members[me._tuple[0]].text;
			me._size = me._percent.formattedData[0];
		};
		
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

		