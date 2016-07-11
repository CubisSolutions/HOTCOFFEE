// counter voor id van objecten.
var counter = 1;


sap.designstudio.sdk.Component.subclass("com.sap.sample.scngauge.textFiller", function() 
{
	var me = this;
	 
	//Properties
	me._percent = null;
	me._ID = counter;
	me._size = 25;
	me._text = "";
	counter = counter + 1 ;
	
	me.init = function() 
	{
//		console.log("Start init Text filler", "log");
		me.redraw();    
	};
	
	me.redraw = function() 
	{
//		console.log("Enter REDRAW function", "log");
//		console.log("Text value upon redraw: " + me._text );
		var my2Div = me.$()[0];
		
		// Clear any existing svg's.  We'll redraw from scratch
		d3.select(my2Div).selectAll("*").remove();
		
		var svgText = d3.select(my2Div)
		  .append("svg:svg")
		  .attr("width", me.getWidth())
		  .attr("height", me.getHeight());
		
		
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
		
		
//		// fill background
//        svgText.append("rect")
//        .attr("x",0)
//        .attr("y",0)
//        .attr("height","100%")
//        .attr("width", me._size + "%")
//        .attr("fill", me._progressFillColorCode);
//        console.log("fill background", "log");
        
        // labeltext
        svgText.append("text")
        .style("fill", me._progressColorCode)
        .attr("x", 10)
        .attr("y", 12)
        .text( me._size + "%" )
        .style("font-size" , "10px");
        
        
		// clipping path
        svgText.append("clipPath")
        .attr("id","clip-clip"+ me._ID)
        .append("text")
        .text(me._text)
        .attr("x", 10)
        .attr("y", (me.getHeight()-10))
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
		 console.log("component.js --- update text value with: " + value);
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
	
	// textsize
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
		
		console.log("percent method, value: "+value);
		
	    if (value === undefined) 
	    {
	    	return me._percent;
	    } 
	    else
	    {
	    	me._percent = value;
	    	
	    	me._tuple = me._percent.tuples[0];
			me._size = me._percent.formattedData[0];
			
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
				me._text = me._meta_data.dimensions[1].members[me._tuple[0]].text;
		    	//me.redraw();
				return me;
			}
		};
		
		//Getters for the height and width of the component
		me.getWidth = function()
		{
		  return me.$().width();
		};
		 
		me.getHeight = function()
		{
		  return me.$().height();
		};
});

sap.designstudio.sdk.Component.subclass("com.sap.sample.scngauge.textBlockFiller", function() 
{
      
      //console.log("initialization of function class");
      
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
				  .attr("width", me.getWidth())
				  .attr("height", me.getHeight());
      
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
                  //console.log(me._percentage.tuples.length+"");
                  var tuple = me._percentage.tuples;
                  
                  // calculate height for a single line. Devide height by number of lines in result set.
                  //   Remove one, for result line, and floor the value to an integer.
                  var tuplenrs = Math.floor(me.getHeight()/ (me._percentage.tuples.length - 1 ));
                  console.log("Tuplenrs = " + tuplenrs);
                  
                  for(i=0 ; i < me._percentage.tuples.length; i++)
                  {
                	  	me._ID = counter;                  	  
                	  	counter = counter + 1 ;
                        me._size = me._percentage.formattedData[i];
                        me._text = me._meta_data.dimensions[1].members[tuple[i][1]].text;
                        if(me._meta_data.dimensions[1].members[tuple[i][1]].type !== "RESULT")
                        {
                             var svgText = d3.select(my2Div)
                             .append("svg:svg")
                             .attr("width", "100%")
                             .attr("height", tuplenrs);
                             
                          // fill background
                             svgText.append("rect")
                             .attr("x",0)
                             .attr("y",0)
                             .attr("height","100%")
                             .attr("width", me._size + "%")
                             .attr("fill", me._progressFillColorCode);
                             console.log("fill background", "log");
                             
                             
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
                             .attr("y", (tuplenrs-10))
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
                             svgText.append("rect")
                     		.attr("x", 0)
                     		.attr("y", 0)
                     		.attr("height", tuplenrs)
                     		.attr("width" , "100%")
                     		.style("stroke", "black")
                     		.style("fill", "none");	
                        }
                  }
            }
      }
      
  	// After update
  	me.afterUpdate = function()
  	{
  		me.redraw();
  	};
      
      me.percentage = function(value) 
      {
            
          if (value === undefined) {
            return me._percentage;
          } else {
            me._percentage = value; 
            return me;
          }
        };
        
      me.metadata = function(value) 
      {            
            if (value === undefined) {
                  return me._meta_data;
            } else {
                  me._meta_data = value;
                  me.redraw();
                  return me;
            }
      };
   
    //Getters for the height and width of the component
  	me.getWidth = function(){
  	  return me.$().width();
  	};
  	 
  	me.getHeight = function(){
  	  return me.$().height();
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
	// textsize
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
});

		