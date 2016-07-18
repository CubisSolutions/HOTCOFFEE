// counter voor id van objecten.
var counter = 1;

sap.designstudio.sdk.Component.subclass("be.cubis.designstudio.textfillsingle.textFillSingle", function() 
{
	var me = this;
	var fontSize = 16;
	 
	//Properties
	me._text = "Cubis";
	me._percentage = null;
	me._dtype = "manual";
	me._ID = counter;
	counter = counter + 1 ;
	me._size = 20;
	
	me.init = function() 
	{
//		console.log("Start init Text filler", "log");
		me.redraw();
	    
	};
	
	me.redraw = function() 
	{
		//console.log("Enter REDRAW function", "log");
		
		var my2Div = me.$()[0];
		fontSize = me.getHeight()/3;
		
		// Clear any existing svg's.  We'll redraw from scratch
		d3.select(my2Div).selectAll("*").remove();
		
//		if (me._percentage === null || me._percentage === "")
//		{
//			//console.log("percent check error = " + me._percent + "!","warn");
//			//console.log("text check error = " + me._text + "!","warn");
//			//me._text = "Cubis";
//		}
//		else
//
//		{
//			//console.log("percent check: value", "warn")
//			//console.log("me._percentage = " + me._percentage);
//			
//			me._tuple = me._percentage.tuples[0];
//			me._text = me._meta_data.dimensions[1].members[me._tuple[0]].text;
//			me._size = me._percentage.formattedData[0];
//		};
		
		if(me._dtype === "datasource")
		{
			if (me._percentage === null || me._percentage === "")
			{
				alert("Bind percent value to use this function.");
			}
			else
			{
				me._tuple = me._percentage.tuples[0];
				me._text = me._meta_data.dimensions[1].members[me._tuple[0]].text;
				me._size = me._percentage.formattedData[0];
			}

		}
		else
		{
			if (me._percentage === null || me._percentage === "")
			{
				alert("Bind percent value to update percent value.");
			}
			else
			{
				me._tuple = me._percentage.tuples[0];
				me._size = me._percentage.formattedData[0];
			}
		}
		
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
        .style("font-size", fontSize + "px");        
        
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
		
	};
	
	
	// After update
	me.afterUpdate = function()
	{
		me.redraw();		
	};
	

//	Getters & Setters
	me.text = function(value)
	{
		 if (value === undefined)
		  {
			  return me._text;
		  } 
		  else
		  {
			  me._text = value;
			  me.redraw();
			  return me;
		  }
	};
	
	me.dtype = function(value)
	{
		 if (value === undefined)
		  {
			  return me._dtype;
		  } 
		  else
		  {
			  me._dtype = value;
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
		  return me;
	  }
	};
	
	// map percent value to bindable object
	me.percentage = function(value) 
	{
		
		//console.log("percent method");
		
	    if (value === undefined) 
	    {
	    	return me._percentage;
	    } 
	    else
	    {
	    	me._percentage = value;
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
				return me;
			}
		};
		
		// Getters for the height and width of the component
		me.getWidth = function(){
			return me.$().width();
		};

		me.getHeight = function(){
			return me.$().height();
		};
		
		
});
		