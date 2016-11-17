// counter for object id's.
var counter = 1;

define(["d3", "sap/designstudio/sdk/component", "css!../css/component.css"], 
		function(d3, Component, css) {
	  Component.subclass("be.cubis.designstudio.textfillsingle.textFillSingle", function() 
{
	// Self
	var me = this;
	
	// Properties
	me._ID = counter;
	counter = counter + 1 ;

	// Init
	me.init = function() 
	{
		me.redraw();
	};

	// Redraw
	me.redraw = function() 
	{
		var my2Div = me.$()[0];
		
		// Clear any existing svg's. We'll redraw from scratch
		d3.select(my2Div).selectAll("*").remove();

//		// First part: All the calculations
//		if(me._dtype === "datasource")
//		{
//			if (me._percentage === null || me._percentage === "")
//			{
//				alert("Bind percent value to use this function.");
//			}
//			else
//			{
//				//me._tuple = me._percentage.tuples[0];
//				//me._text = me._meta_data.dimensions[1].members[me._tuple[0]].text;		
//				// server copy of property 'text' needs to be updated too, 
//				// otherwise, when we switch to manual text in the APS, the 
//				// server will still have the same text as the APS, and then 
//				// the server won't trigger an update towards the canvas
//				//me.firePropertiesChanged(["text"]);
//				//me._size = me._percentage.formattedData[0];
//				me._size = me._percentage;
//			};
//
//		}
//		else
//		{
//			if (me._percentage === null || me._percentage === "")
//			{
//				// Do nothing.
//			}
//			else
//			{
//				//me._tuple = me._percentage.tuples[0];
//				//me._size = me._percentage.formattedData[0];
//				me._size = me._percentage;
//			};
//		};
		
		switch(me._labelpos)
		{
			case("lefttop"):
				labelposx = 10;
				labelposy = 15;
				break;
			case("leftbot"):
				labelposx = 10;
				labelposy = me.getHeight() - 10;
				break;
			case("righttop"):
				labelposx = me.getWidth() - 30;
				labelposy = 15;
				break;
			case("rightbot"):
				labelposx = me.getWidth() - 30;
				labelposy = me.getHeight() - 10;
				break;
			default:
				labelposx = 10;
				labelposy = 15;
		}
		
		
		// Drawing the items on the canvas		
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
          {offset: (me._percentage + "%"), color: me._progressColorCode, opacity:1},
          {offset: (me._percentage + "%"), color: me._textcolorCode, opacity:1},
          {offset: "100%", color: me._textcolorCode, opacity:1} 
        ])
        .enter().append("stop")
        .attr("offset", function(d) {return d.offset})
        
        .attr("stop-color", function(d) {return d.color})
        .attr("stop-opacity", function(d){return d.opacity});
		
		
		// fill background if APS checkbox is on.
		if( me._barfill === "yes" )
    	{
        	svgText.append("rect")
            .attr("x",0)
            .attr("y",0)
            .attr("height","100%")
            .attr("width", me._percentage + "%")
            .attr("fill", me._progressFillColorCode);
            console.log("fill background", "log");
    	}
		else
		{
			console.log("fill background : NO");
		}
        
		if( me._pcvalue === "yes")
        {
			svgText.append("text")
	        .style("fill", me._progressColorCode)
	        .attr("x", labelposx)
	        .attr("y", labelposy)
	        .text( parseInt(me._percentage) + "%" )
	        .style("font-size" , ".8em");
        }
		
        
		// clipping path
        svgText.append("clipPath")
        .attr("id","clip-clip"+ me._ID)
        .append("text")
        //.text(me._text)
        .text(me.percentageText())
        .attr("x", 5)
        .attr("y", parseInt((me.getHeight()/2) + (me._textsize/2)))
        .style("font-size", me._textsize + "px");        
        
        // masking frame
        svgText.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("height","100%")
        .attr("width", "100%")
        .attr("fill", "url(#gradientGradient"+ me._ID +")")
        .attr("clip-path","url(#clip-clip"+ me._ID +")");
        
        // Draw rectangle around the box.
        if(me._borderline === "yes")
        {
        	svgText.append("rect")
    		.attr("x", 0)
    		.attr("y", 0)
    		.attr("height", "100%")
    		.attr("width" , "100%")
    		.style("stroke", "black")
    		.style("fill", "none");
        }	
        
		
	};
	
	
	// After update
	me.afterUpdate = function()
	{
		me.redraw();
	};
	

//	Getters & Setters invisible-objects	
	me.labelpos = function(value)
	{
		if(value === undefined)
		{
			return me._labelpos;
		}
		else
		{
			me._labelpos = value;
			return me;
		}
	};
	
	me.textsize = function(value)
	{
		if(value === undefined)
		{
			return me._textsize;
		}
		else
		{
			me._textsize = value;
			return me;
		}
	};
	
	me.barfill = function(value)
	{
		if(value === undefined)
		{
			return me._barfill;
		}
		else
		{
			me._barfill = value;
			return me;
		}
	};
	
	me.borderline = function(value)
	{
		if(value === undefined)
		{
			return me._borderline;
		}
		else
		{
			me._borderline = value;
			return me;
		}
	};
	
	me.pcvalue = function(value)
	{
		if(value === undefined)
		{
			return me._pcvalue;
		}
		else
		{
			me._pcvalue = value;
			return me;
		}
	};

//	Getters & Setters	
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
	
	// ProgressFillColorcode
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
	
	// Precentage (map percent value to bindable object)
	me.percentage = function(value) 
	{
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
	
	// Percentage Text (bindable object)
	me.percentageText = function(value) 
	{
		if (value === undefined) 
		{
			return me._percentageText;
		} 
		else
		{
			me._percentageText = value;
			return me;
		}
	};
		
//  Getters for the height and width of the component
	me.getWidth = function()
	{
		return me.$().width();
	};

	me.getHeight = function()
	{
		return me.$().height();
	};
			
});
});
		